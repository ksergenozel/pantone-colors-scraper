export function rgbToCMYK(r, g, b) {
  const rf = r / 255;
  const gf = g / 255;
  const bf = b / 255;

  let c = 1 - rf;
  let m = 1 - gf;
  let y = 1 - bf;

  const k = Math.min(c, m, y);

  if (k > 0.997) return [0, 0, 0, 100];

  if (k > 0.003) {
    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);
  }

  return [
    Math.round(c * 100),
    Math.round(m * 100),
    Math.round(y * 100),
    Math.round(k * 100),
  ];
}
