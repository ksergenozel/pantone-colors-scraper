export function rgbToHex(r, g, b) {
  const toHex = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return ("#" + toHex(r) + toHex(g) + toHex(b)).toUpperCase();
}
