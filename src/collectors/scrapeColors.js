import { scrapeCollection } from "./scrapeCollection.js";
import { collections } from "../config/constants.js";

export async function scrapeColors() {
  const allColors = [];

  for (const collection of collections) {
    const colors = await scrapeCollection(collection);
    allColors.push(...colors);
  }

  const uniqueMap = new Map();
  for (const color of allColors) {
    if (!uniqueMap.has(color.code)) {
      uniqueMap.set(color.code, color);
    }
  }

  const uniqueColors = Array.from(uniqueMap.values());

  console.log(
    `Scraped ${allColors.length} colors, found ${uniqueColors.length} unique colors.`,
  );

  return uniqueColors;
}
