// app/utils/readability.server.ts
import { JSDOM } from "jsdom";
import readabilityDefault from "readability";

// Destructure from the default ESM import
const { Readability } = readabilityDefault;

export function parseContentWithReadability(url: string, html: string): string {
  const dom = new JSDOM(html, { url });
  const parsed = new Readability(dom.window.document).parse();
  return parsed?.textContent || "No content extracted.";
}
