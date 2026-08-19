#!/usr/bin/env python3
"""Convert CFF (PostScript) OTFs to TrueType-outline fonts.

Chromium's PDF writer degrades a CFF face to Type 3 glyph procedures, which
prepress tools cannot subset and some presses reject outright. TrueType-outline
fonts embed as real CID fonts. The conversion is cu2qu at 1/1000 em, the same
path used to build variable TTFs from PostScript sources — visually
indistinguishable, and it keeps hinting-free outlines that scale cleanly.

Licensed fonts stay outside version control; this only ever writes into
build/fonts, which is gitignored.
"""
import sys
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.pens.cu2quPen import Cu2QuPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib.tables._g_l_y_f import Glyph


def convert(src: Path, dst: Path, max_err: float = 1.0) -> None:
    font = TTFont(str(src))
    if "glyf" in font:                      # already TrueType
        font.save(str(dst))
        return

    glyph_set = font.getGlyphSet()
    upem = font["head"].unitsPerEm
    tolerance = max_err / 1000 * upem

    glyf, hmtx = {}, font["hmtx"].metrics
    for name in font.getGlyphOrder():
        pen = TTGlyphPen(None)
        try:
            glyph_set[name].draw(Cu2QuPen(pen, tolerance, reverse_direction=True))
            glyf[name] = pen.glyph()
        except Exception:
            glyf[name] = Glyph()

    del font["CFF "]
    font.setGlyphOrder(list(glyf))
    font["glyf"] = newTable = __import__(
        "fontTools.ttLib.tables._g_l_y_f", fromlist=["table__g_l_y_f"]
    ).table__g_l_y_f()
    newTable.glyphOrder = list(glyf)
    newTable.glyphs = glyf

    loca = __import__("fontTools.ttLib.tables._l_o_c_a", fromlist=["table__l_o_c_a"]).table__l_o_c_a()
    font["loca"] = loca

    font["maxp"].numGlyphs = len(glyf)
    font.sfntVersion = "\x00\x01\x00\x00"
    font["head"].indexToLocFormat = 0
    for tag in ("post",):
        if tag in font:
            font[tag].formatType = 3.0
    font["hmtx"].metrics = hmtx
    font.save(str(dst))


if __name__ == "__main__":
    src_dir, dst_dir = Path(sys.argv[1]), Path(sys.argv[2])
    dst_dir.mkdir(parents=True, exist_ok=True)
    n = 0
    for otf in sorted(src_dir.rglob("*.otf")):
        out = dst_dir / (otf.stem + ".ttf")
        convert(otf, out)
        n += 1
        print(f"  {otf.name} → {out.name}")
    print(f"converted {n}")
