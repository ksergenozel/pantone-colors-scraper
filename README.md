# PANTONE&reg; Colors Scraper

A web scraper that collects PANTONE&reg; color data from [numerosamente.it](https://www.numerosamente.it).

> **Disclaimer:**
> This project is intended for non-commercial use only and is not associated with PANTONE&reg;.

## Features

This scraper collects PANTONE&reg; color data from multiple collections with pagination support, deduplicates the results, and outputs structured JSON and CSV data.

## Data Structure

Each object in the dataset corresponds to a unique PANTONE&reg; color record, structured with the following fields:

- **`code`**: PANTONE&reg; color code
- **`name`**: PANTONE&reg; color name _(optional)_
- **`collection`**: PANTONE&reg; collection name
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

> This script will create `data.json` and `data.csv` file in the root directory.

## Roadmap

- [x] Scrape PANTONE® color data
- [x] Export to JSON
- [x] Add CMYK support
- [x] Export to CSV
- [ ] Export to SQLite

## License

This project is licensed under the [MIT License](LICENSE).
