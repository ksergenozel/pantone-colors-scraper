import { load } from "cheerio";
import { writeFileSync } from "fs";

const baseUrl = "https://www.numerosamente.it/pantone-list";

const collections = [
  {
    slug: "fashion-and-interior-designers",
    name: "Fashion & Interior Designers",
  },
  { slug: "graphic-designers", name: "Graphic Designers" },
  { slug: "industrial-designers", name: "Industrial Designers" },
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

async function scrapeCollection({ slug, name }) {
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
    const rgb = $(el).find("td:nth-child(2)").text().trim();
    const hex = $(el).find("td:nth-child(3)").text().trim();
    const name = $(el).find("td:nth-child(4)").text().trim();

    if (code && rgb && hex) colors.push({ code, name, collection, rgb, hex });
  });

  const nextPageRelative = $("ul.pagination li.next a").attr("href");
  const nextPageUrl = nextPageRelative
    ? new URL(nextPageRelative, url).href
    : null;

  return { colors, nextPageUrl };
}

function removeDuplicates(data) {
  const seen = new Set();
  const unique = [];
  let duplicates = 0;

  for (const item of data) {
    const key = JSON.stringify(item);
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(item);
    } else {
      duplicates++;
    }
  }

  console.log(`Duplicates found: ${duplicates}`);
  return unique;
}
