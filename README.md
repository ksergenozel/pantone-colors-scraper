# PANTONE Colors Scraper

A web scraper that collects PANTONE color data from [numerosamente.it](https://www.numerosamente.it).

> **Disclaimer:**
> This project is intended for non-commercial use only and is not associated with PANTONE.

## Features

This scraper collects PANTONE color data from multiple collections with pagination support, deduplicates the results, and exports to JSON, CSV, and SQLite.

## Data Structure

Each object in the dataset corresponds to a unique PANTONE color record, structured with the following fields:

- **`code`**: PANTONE color code
- **`name`**: PANTONE color name _(optional)_
- **`collection`**: PANTONE collection name
  - `Fashion & Interior Designers`
  - `Graphic Designers`
  - `Industrial Designers`
- **`hex`**: Hex color code
- **`rgb`**: RGB color code
- **`cmyk`**: CMYK color code

> CMYK values are approximated from RGB and do not reference ICC profiles.

```json
{
  "code": "17-1230 TCX",
  "name": "Mocha Mousse",
  "collection": "Fashion & Interior Designers",
  "hex": "#A47864",
  "rgb": [164, 120, 100],
  "cmyk": [0, 27, 39, 36]
}
```

## Tech Stack

- [Node.js](https://nodejs.org/)
- [Cheerio](https://cheerio.js.org/)
- [SQLite](https://www.sqlite.org/)

## Requirements

- [Node.js](https://nodejs.org/)

## Installation

Clone the repository:

```bash
git clone https://github.com/ksergenozel/pantone-colors-scraper.git
```

Navigate to the project folder:

```bash
cd pantone-colors-scraper
```

Install dependencies:

```bash
npm install
```

## Usage

```bash
npm start
```

> This script creates `data.json`, `data.csv` and `pantone.db` files in the root directory.

## License

This project is licensed under the [MIT License](LICENSE).
