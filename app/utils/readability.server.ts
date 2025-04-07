// app/utils/readability.server.ts
import { JSDOM } from "jsdom";

// We do a dynamic require to ensure it's only imported in Node
const readabilityImport = require("readability");
const { Readability } = readabilityImport;

export function parseContentWithReadability(url: string, html: string): string {
  const dom = new JSDOM(html, { url });
  const parsed = new Readability(dom.window.document).parse();
  return parsed?.textContent || "No content extracted.";
}
