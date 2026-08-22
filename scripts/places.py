#!/usr/bin/env python3
"""Where was the library taken? — a broad, offline search of the photo archive.

    ./.venv/bin/python scripts/places.py            scan and write the index
    ./.venv/bin/python scripts/places.py --report   read the index and summarise

Adam asked whether there is a way to sweep the archive for the visually
interesting places — Italy, Spain, Portugal, anywhere else worth a frame —
rather than opening folders one at a time. There is, and it needs no new
tooling: **117 of every 120 files sampled carry GPS in EXIF**, and all of them
carry a capture date.

EVERYTHING HERE IS OFFLINE. Coordinates are personal data and none of them leave
this machine: places are resolved against a small table of bounding boxes and
city centroids written into this file, not against a geocoding service. The book
already refuses to print personal data it does not mean to; the same rule
applies to looking for pictures.

TWO SIGNALS, AND THE SECOND IS THE USEFUL ONE.

  · `photo library 2` holds every original — about 24,000 images.
  · `photo library edits` holds the ~6,276 that Adam actually EDITED: cropped,
    graded, straightened. That is his own curation, made years before this book
    existed and without any thought of it.

A frame that is both *somewhere visually interesting* and *one he already chose
to work on* is a far better candidate than either signal alone. The index
records both so the shortlist can be cut either way.
"""
import json
import os
import re
import sys
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path

from PIL import Image

try:
    import pillow_heif
    pillow_heif.register_heif_opener()
except Exception:
    pass

HOME = Path.home()
ORIGINALS = HOME / 'Desktop' / 'photo library 2'
EDITS = HOME / 'Desktop' / 'photo library edits'
OUT = Path(__file__).resolve().parent.parent / '.cache' / 'places.json'

IMG_EXT = {'.heic', '.jpg', '.jpeg', '.png', '.rw2', '.tif', '.tiff'}

# Rough country boxes, checked IN ORDER so neighbours resolve correctly —
# Portugal before Spain, Switzerland/Austria before their bigger neighbours.
BOXES = [
    ('Portugal',    36.8, 42.2,  -9.6,  -6.2),
    ('Spain',       35.9, 43.9,  -9.4,   3.4),
    ('Andorra',     42.4, 42.7,   1.4,   1.8),
    ('Switzerland', 45.8, 47.9,   5.9,  10.6),
    ('Austria',     46.3, 49.1,   9.5,  17.2),
    ('Italy',       36.5, 47.2,   6.5,  18.6),
    ('Greece',      34.8, 41.8,  19.3,  28.3),
    ('Croatia',     42.3, 46.6,  13.4,  19.5),
    ('Netherlands', 50.7, 53.6,   3.3,   7.3),
    ('Belgium',     49.4, 51.6,   2.5,   6.4),
    ('Germany',     47.2, 55.1,   5.8,  15.1),
    ('France',      41.3, 51.2,  -5.3,   9.6),
    ('Ireland',     51.4, 55.4, -10.7,  -5.9),
    ('UK',          49.8, 60.9,  -8.7,   1.9),
    ('Morocco',     27.6, 36.0, -13.3,  -1.0),
    ('Colombia',     -4.3, 13.4, -79.1, -66.8),
    ('Ecuador',      -5.1,  1.5, -81.1, -75.2),
    ('Peru',        -18.4, -0.0, -81.4, -68.6),
    ('Panama',        7.0, 9.7,  -83.1, -77.1),
    ('Costa Rica',    8.0, 11.3, -86.0, -82.5),
    ('Dominican Rep', 17.5, 20.0, -72.1, -68.3),
    ('Hawaii',       18.9, 22.3,-160.3,-154.7),
    ('UAE',          22.6, 26.1,  51.5,  56.4),
    ('Mexico',      14.5, 32.8,-118.5, -86.7),
    # USA BEFORE CANADA. The first version had Canada at 41.6-70N and it
    # swallowed Seattle, Chicago, Boston and New York — 12,642 frames filed as
    # Canada, almost all of them American. The border is not a latitude, so it
    # is approximated per-longitude in `north_of_border` below.
    ('USA',         24.4, 71.5,-179.0, -66.9),
    ('Canada',      41.6, 84.0,-141.0, -52.0),
]

# Rough US/Canada boundary by longitude: 49° across the west, the Great Lakes
# dip in the middle, and Maine's bulge in the east. Good enough to separate a
# Seattle trip from a Vancouver one; not a survey.
def north_of_border(lat, lon):
    if lon <= -95.0:
        return lat > 49.05
    if lon <= -83.0:
        return lat > 48.3
    if lon <= -74.0:
        return lat > 45.2
    return lat > 47.4

# Centroids for naming clusters. Distances are compared in plain degrees, which
# is fine at this scale and keeps the whole thing dependency-free.
CITIES = [
    ('Lisbon', 38.72, -9.14), ('Sintra', 38.80, -9.39), ('Porto', 41.15, -8.61),
    ('Fátima', 39.63, -8.67), ('Alcobaça', 39.55, -8.98), ('Nazaré', 39.60, -9.07),
    ('Óbidos', 39.36, -9.16), ('Évora', 38.57, -7.91), ('Lagos', 37.10, -8.67),
    ('Seville', 37.39, -5.99), ('Córdoba', 37.89, -4.78), ('Granada', 37.18, -3.60),
    ('Madrid', 40.42, -3.70), ('Barcelona', 41.39, 2.17), ('Montserrat', 41.59, 1.84),
    ('Toledo', 39.86, -4.02), ('Valencia', 39.47, -0.38), ('Ronda', 36.74, -5.16),
    ('Bilbao', 43.26, -2.93), ('San Sebastián', 43.32, -1.98), ('Málaga', 36.72, -4.42),
    ('Rome', 41.90, 12.50), ('Florence', 43.77, 11.26), ('Venice', 45.44, 12.32),
    ('Milan', 45.46, 9.19), ('Naples', 40.85, 14.27), ('Pompeii', 40.75, 14.49),
    ('Amalfi', 40.63, 14.60), ('Siena', 43.32, 11.33), ('Pisa', 43.72, 10.40),
    ('Cinque Terre', 44.13, 9.71), ('Verona', 45.44, 10.99), ('Como', 45.81, 9.08),
    ('Turin', 45.07, 7.69), ('Bologna', 44.49, 11.34), ('Palermo', 38.12, 13.36),
    ('Paris', 48.86, 2.35), ('Nice', 43.70, 7.27), ('Lyon', 45.76, 4.84),
    ('Amsterdam', 52.37, 4.90), ('Bruges', 51.21, 3.22), ('Brussels', 50.85, 4.35),
    ('Berlin', 52.52, 13.40), ('Munich', 48.14, 11.58), ('Vienna', 48.21, 16.37),
    ('Prague', 50.08, 14.44), ('Zurich', 47.38, 8.54), ('Interlaken', 46.69, 7.86),
    ('Athens', 37.98, 23.73), ('Santorini', 36.39, 25.46), ('Dubrovnik', 42.65, 18.09),
    ('London', 51.51, -0.13), ('Edinburgh', 55.95, -3.19), ('Dublin', 53.35, -6.26),
    ('Marrakesh', 31.63, -8.01), ('Tangier', 35.78, -5.81),
    ('Bogotá', 4.71, -74.07), ('Medellín', 6.24, -75.58), ('Cartagena', 10.39, -75.51),
    ('Bucaramanga', 7.12, -73.13), ('Villa de Leyva', 5.63, -73.52), ('Barichara', 6.63, -73.22),
    ('San Gil', 6.55, -73.13), ('Santa Marta', 11.24, -74.20), ('Guatapé', 6.23, -75.16),
    ('Salento', 4.64, -75.57), ('San Andrés', 12.58, -81.70), ('Cali', 3.45, -76.53),
    ('Dubai', 25.20, 55.27), ('Abu Dhabi', 24.45, 54.38), ('Honolulu', 21.31, -157.86),
    ('Seattle', 47.61, -122.33), ('Portland OR', 45.52, -122.68), ('Olympic NP', 47.80, -123.60),
    ('Mount Rainier', 46.85, -121.76), ('North Cascades', 48.70, -121.20), ('Vancouver', 49.28, -123.12),
    ('San Francisco', 37.77, -122.42), ('Big Sur', 36.27, -121.81), ('Yosemite', 37.75, -119.59),
    ('Los Angeles', 34.05, -118.24), ('San Diego', 32.72, -117.16), ('Las Vegas', 36.17, -115.14),
    ('Grand Canyon', 36.06, -112.14), ('Zion', 37.30, -113.03), ('Bryce', 37.59, -112.19),
    ('Arches', 38.73, -109.59), ('Moab', 38.57, -109.55), ('Monument Valley', 36.98, -110.10),
    ('Sedona', 34.87, -111.76), ('Santa Fe', 35.69, -105.94), ('Denver', 39.74, -104.99),
    ('Rocky Mtn NP', 40.34, -105.68), ('Yellowstone', 44.60, -110.50), ('Grand Teton', 43.79, -110.68),
    ('Glacier NP', 48.70, -113.72), ('Banff', 51.18, -115.57), ('Jasper', 52.87, -118.08),
    ('Chicago', 41.88, -87.63), ('New York', 40.71, -74.01), ('Boston', 42.36, -71.06),
    ('Washington DC', 38.91, -77.04), ('New Orleans', 29.95, -90.07), ('Austin', 30.27, -97.74),
    ('Nashville', 36.16, -86.78), ('Charleston', 32.78, -79.93), ('Savannah', 32.08, -81.09),
    ('Miami', 25.76, -80.19), ('Toronto', 43.65, -79.38), ('Montreal', 45.50, -73.57),
    ('Minneapolis', 44.98, -93.27), ('Duluth', 46.79, -92.10),
]


def dms(v):
    try:
        d, m, s = v
        return float(d) + float(m) / 60 + float(s) / 3600
    except Exception:
        return None


def gps_of(exif):
    g = exif.get_ifd(0x8825)
    if not g:
        return None
    lat, lon = dms(g.get(2)), dms(g.get(4))
    if lat is None or lon is None:
        return None
    if str(g.get(1, 'N')).upper().startswith('S'):
        lat = -lat
    if str(g.get(3, 'E')).upper().startswith('W'):
        lon = -lon
    if abs(lat) < 0.01 and abs(lon) < 0.01:
        return None
    return round(lat, 5), round(lon, 5)


def country(lat, lon):
    for name, y0, y1, x0, x1 in BOXES:
        if y0 <= lat <= y1 and x0 <= lon <= x1:
            if name == 'USA' and north_of_border(lat, lon):
                continue          # let the Canada box take it
            return name
    return None


def nearest_city(lat, lon, limit=0.45):
    best, bestd = None, 1e9
    for name, cy, cx in CITIES:
        d = ((lat - cy) ** 2 + ((lon - cx) * 0.75) ** 2) ** 0.5
        if d < bestd:
            best, bestd = name, d
    return best if bestd <= limit else None


def scan():
    edited = {p.stem.split(' ')[0].lower() for p in EDITS.iterdir()} if EDITS.exists() else set()
    rows = []
    files = [p for p in ORIGINALS.iterdir() if p.suffix.lower() in IMG_EXT]
    total = len(files)
    for i, p in enumerate(files, 1):
        if i % 2000 == 0:
            print(f"  {i}/{total}", flush=True)
        try:
            ex = Image.open(p).getexif()
        except Exception:
            continue
        g = gps_of(ex)
        dt = ex.get(306) or (ex.get_ifd(0x8769) or {}).get(36867)
        day = None
        if dt:
            m = re.match(r'(\d{4})[:-](\d{2})[:-](\d{2})', str(dt))
            if m:
                day = f"{m.group(1)}-{m.group(2)}-{m.group(3)}"
        if not g:
            rows.append({'f': p.name, 'day': day, 'edited': p.stem.lower() in edited})
            continue
        lat, lon = g
        rows.append({'f': p.name, 'day': day, 'lat': lat, 'lon': lon,
                     'country': country(lat, lon), 'city': nearest_city(lat, lon),
                     'edited': p.stem.lower() in edited})
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(rows))
    print(f"\nindexed {len(rows)} images -> {OUT}")
    return rows


def report(rows):
    withgps = [r for r in rows if r.get('lat')]
    print(f"\n{len(rows)} images · {len(withgps)} with GPS · "
          f"{sum(1 for r in rows if r['edited'])} that Adam edited\n")

    # Re-resolve from the stored coordinates, so widening BOXES or CITIES costs
    # a report and not a three-minute rescan. The first run put 1,611 frames in
    # 'unplaced' that turned out to be Colombia.
    for r in withgps:
        r['country'] = country(r['lat'], r['lon'])
        r['city'] = nearest_city(r['lat'], r['lon'])
    by = Counter(r.get('country') or 'unplaced' for r in withgps)
    ed = Counter(r.get('country') or 'unplaced' for r in withgps if r['edited'])
    print(f"{'country':<14}{'frames':>8}{'edited':>8}")
    for c, n in by.most_common():
        print(f"  {c:<12}{n:>8}{ed.get(c,0):>8}")

    print("\nTRIPS — a run of days in one country, with the cities inside it")
    trips = defaultdict(list)
    for r in withgps:
        if r.get('day') and r.get('country'):
            trips[(r['country'], r['day'][:7])].append(r)
    out = []
    for (c, month), rs in trips.items():
        if len(rs) < 15:
            continue
        cities = Counter(x['city'] for x in rs if x.get('city'))
        out.append((len(rs), sum(1 for x in rs if x['edited']), c, month, cities.most_common(5)))
    for n, e, c, month, cities in sorted(out, reverse=True):
        names = ', '.join(f"{k} ({v})" for k, v in cities) or '—'
        print(f"  {month}  {c:<12} {n:>5} frames, {e:>4} edited   {names}")


if __name__ == '__main__':
    if '--report' in sys.argv and OUT.exists():
        report(json.loads(OUT.read_text()))
    else:
        report(scan())
