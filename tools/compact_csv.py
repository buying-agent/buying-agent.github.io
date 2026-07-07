import csv
from pathlib import Path

files = [
    Path('products.csv'),
    Path('data/products_bag.csv'),
    Path('data/products_shoes.csv'),
    Path('data/products_etc.csv'),
]

for path in files:
    with path.open('r', encoding='utf-8-sig', newline='') as f:
        rows = list(csv.DictReader(f))

    if not rows:
        continue

    fieldnames = list(rows[0].keys())

    for row in rows:
        for key in ['name', 'shortDesc', 'desc', 'originalTitle', 'originalDesc']:
            if key not in row:
                continue
            value = (row.get(key) or '').replace('\n', ' ').replace('\r', ' ').strip()
            if not value:
                continue
            width = 18 if key in {'name', 'originalTitle'} else 20
            if len(value) > width:
                row[key] = value[: width - 3].rstrip() + '...'

    with path.open('w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f'updated {path}')
