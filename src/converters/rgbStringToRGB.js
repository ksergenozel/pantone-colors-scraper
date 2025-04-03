export function rgbStringToRGB(rgbString) {
  return rgbString
    .replace("rgb(", "")
    .replace(")", "")
    .split(",")
    .map((v) => parseInt(v.trim(), 10));
}
