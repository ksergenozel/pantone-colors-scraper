import { load } from "cheerio";
import { writeFileSync } from "fs";

const baseUrl = "https://www.numerosamente.it/pantone-list";

const collections = [
  {
    name: "Fashion & Interior Designers",
    slug: "fashion-and-interior-designers",
  },
  { name: "Graphic Designers", slug: "graphic-designers" },
  { name: "Industrial Designers", slug: "industrial-designers" },
];

async function main() {
  console.log("Starting the scraping process...");
  try {
    const results = [];

    for (const collection of collections) {
      const colors = await scrapeCollection(collection);
      results.push(...colors);
    }

    console.log(`Total scraped: ${results.length}`);

    const uniqueResults = removeDuplicates(results);
    console.log(`Unique results: ${uniqueResults.length}`);

    writeFileSync("data.json", JSON.stringify(uniqueResults, null, 2));
    console.log("Data has been saved to data.json");
  } catch (err) {
    console.error("An error occurred:", err);
  }
}

main();

async function scrapeCollection({ name, slug }) {
  let currentPageUrl = `${baseUrl}/${slug}`;
  const allColors = [];

  while (currentPageUrl) {
    console.log(`Scraping [${name}]: ${currentPageUrl}`);
    const { colors, nextPageUrl } = await scrapePage(currentPageUrl, name);
    allColors.push(...colors);
    currentPageUrl = nextPageUrl;
  }

  return allColors;
}

async function scrapePage(url, collection) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = load(html);
  const colors = [];

  $("table tr").each((_, el) => {
    const code = $(el).find("td:nth-child(1)").text().trim();
    const rgbString = $(el).find("td:nth-child(2)").text().trim();
    const hex = $(el).find("td:nth-child(3)").text().trim();
    const name = $(el).find("td:nth-child(4)").text().trim();

    if (code && rgbString && hex) {
      const [r, g, b] = parseRGB(rgbString);
      const rgb = [r, g, b];
      const cmyk = rgbToCMYK(r, g, b);

      colors.push({
        code,
        collection,
        name,
        hex,
        rgb,
        cmyk,
      });
    }
  });

  const nextPageRelative = $("ul.pagination li.next a").attr("href");
  const nextPageUrl = nextPageRelative
    ? new URL(nextPageRelative, url).href
    : null;

  return { colors, nextPageUrl };
}

function removeDuplicates(data) {
  const temp = new Set();
  const unique = [];
  let duplicates = 0;

  for (const item of data) {
    const key = JSON.stringify(item);
    if (!temp.has(key)) {
      temp.add(key);
      unique.push(item);
    } else {
      duplicates++;
    }
  }

  console.log(`Duplicates found: ${duplicates}`);
  return unique;
}

function parseRGB(rgbString) {
  return rgbString
    .replace("rgb(", "")
    .replace(")", "")
    .split(",")
    .map((v) => parseInt(v.trim(), 10));
}

function rgbToCMYK(r, g, b) {
  const rf = r / 255;
  const gf = g / 255;
  const bf = b / 255;

  let c = 1 - rf;
  let m = 1 - gf;
  let y = 1 - bf;

  const k = Math.min(c, m, y);

  if (k > 0.997) {
    return [0, 0, 0, 100];
  }

  if (k > 0.003) {
    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);
  }

  const C = Math.round(c * 100);
  const M = Math.round(m * 100);
  const Y = Math.round(y * 100);
  const K = Math.round(k * 100);

  return [C, M, Y, K];
}
