import { scrapeColors } from "./collectors/scrapeColors.js";
import { exportToJSON } from "./exporters/exportToJSON.js";
import { exportToCSV } from "./exporters/exportToCSV.js";

async function main() {
  try {
    console.log("Starting the scraping process...");
    const colors = await scrapeColors();
    exportToJSON("data.json", colors);
    exportToCSV("data.csv", colors);
  } catch (err) {
    console.error("An error occurred:", err);
  }
}

main();
