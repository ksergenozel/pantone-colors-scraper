import { writeFileSync } from "fs";

export function exportToCSV(filename, data) {
  const headers = [
    "code",
    "collection",
    "name",
    "hex",
    "r",
    "g",
    "b",
    "c",
    "m",
    "y",
    "k",
  ];

  const rows = data.map((color) => {
    const { code, collection, name, hex } = color;
    const rgb = Array.isArray(color.rgb) ? color.rgb : [null, null, null];
    const cmyk = Array.isArray(color.cmyk)
      ? color.cmyk
      : [null, null, null, null];

    return [
      `"${code}"`,
      `"${collection}"`,
      `"${name}"`,
      `"${hex}"`,
      rgb[0],
      rgb[1],
      rgb[2],
      cmyk[0],
      cmyk[1],
      cmyk[2],
      cmyk[3],
    ].join(",");
  });

  const csvContent = [headers.join(","), ...rows].join("\n");
  writeFileSync(filename, csvContent);
  console.log(`Data exported to ${filename}`);
}
