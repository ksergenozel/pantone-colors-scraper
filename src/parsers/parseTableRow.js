import { rgbStringToRGB } from "../converters/rgbStringToRGB.js";
import { rgbToHex } from "../converters/rgbToHex.js";
import { rgbToCMYK } from "../converters/rgbToCMYK.js";

export function parseTableRow($, el, collection) {
  const code = $(el).find("td:nth-child(1)").text().trim();
  const rgbString = $(el).find("td:nth-child(2)").text().trim();
  let hex = $(el).find("td:nth-child(3)").text().trim();
  const name = $(el).find("td:nth-child(4)").text().trim();

  if (!code) return null;

  const [r, g, b] = rgbStringToRGB(rgbString);
  const rgb = [r, g, b];
  const cmyk = rgbToCMYK(r, g, b);

  if (!hex) hex = rgbToHex(r, g, b);

  return {
    code,
    collection,
    name,
    hex,
    rgb,
    cmyk,
  };
}
