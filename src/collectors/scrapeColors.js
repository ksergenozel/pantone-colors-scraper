import { scrapeCollection } from "./scrapeCollection.js";
import { collections } from "../config/constants.js";

export async function scrapeColors() {
  const allColors = [];

  for (const collection of collections) {
    const colors = await scrapeCollection(collection);
    allColors.push(...colors);
  }

  const uniqueColors = [...new Set(allColors.map(JSON.stringify))].map(
    JSON.parse,
  );

  return uniqueColors;
}
