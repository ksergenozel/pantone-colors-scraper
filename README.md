# PANTONE Colors Scraper

A web scraper that collects PANTONE color data from [numerosamente.it](https://www.numerosamente.it).

> **Disclaimer:**
> This project is intended for non-commercial use only and is not associated with PANTONE.

## Features

This scraper collects PANTONE color data from multiple collections with pagination support, deduplicates the results, and outputs structured JSON data.

## Data Structure

Each object in the dataset corresponds to a unique PANTONE color record, structured with the following fields:

- **`code`**: The PANTONE color code.
- **`name`**: The PANTONE color name.
- **`collection`**: The PANTONE collection name.
  - `Fashion & Interior Designers`
  - `Graphic Designers`
  - `Industrial Designers`
- **`hex`**: The HEX color code.
- **`rgb`**: The RGB color code.
- **`cmyk`**: The CMYK color code.

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

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/)
- [Node.js](https://nodejs.org/)
- [Cheerio](https://cheerio.js.org/)

## Requirements

- [Node.js](https://nodejs.org/) (v18+)

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

> This script will create a `data.json` file in the root directory.

## License

This project is licensed under the [MIT License](LICENSE).
