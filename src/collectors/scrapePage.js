import { load } from "cheerio";
import { parseTableRow } from "../parsers/parseTableRow.js";

export async function scrapePage(url, collection) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = load(html);
  const colors = [];

  $("table tr").each((_, el) => {
    const color = parseTableRow($, el, collection);
    if (color) colors.push(color);
  });

  const nextPageRelative = $("ul.pagination li.next a").attr("href");
  const nextPageUrl = nextPageRelative
    ? new URL(nextPageRelative, url).href
    : null;

  return { colors, nextPageUrl };
}
