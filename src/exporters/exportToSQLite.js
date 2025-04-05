import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { resolve } from "path";

export async function exportToSQLite(dbFilename, data) {
  const db = await open({
    filename: resolve(dbFilename),
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS colors (
      code TEXT PRIMARY KEY,
      collection TEXT,
      name TEXT,
      hex TEXT,
      r INTEGER,
      g INTEGER,
      b INTEGER,
      c INTEGER,
      m INTEGER,
      y INTEGER,
      k INTEGER
    );
  `);

  const insertStmt = `
    INSERT INTO colors
    (code, collection, name, hex, r, g, b, c, m, y, k)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  for (const color of data) {
    const { code, collection, name, hex, rgb, cmyk } = color;

    await db.run(insertStmt, [
      code,
      collection,
      name,
      hex,
      rgb[0],
      rgb[1],
      rgb[2],
      cmyk[0],
      cmyk[1],
      cmyk[2],
      cmyk[3],
    ]);
  }

  await db.close();
  console.log(`Data exported to ${dbFilename}`);
}
