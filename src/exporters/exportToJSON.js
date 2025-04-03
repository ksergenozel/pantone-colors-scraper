import { writeFileSync } from "fs";

export function exportToJSON(filename, data) {
  writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(`Data has been saved to ${filename}`);
}
