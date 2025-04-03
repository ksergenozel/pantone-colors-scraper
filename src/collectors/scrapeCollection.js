import { scrapePage } from "./scrapePage.js";
import { baseUrl } from "../config/constants.js";

export async function scrapeCollection({ name, slug }) {
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
