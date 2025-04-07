// app/utils/readability.server.ts
import { JSDOM } from "jsdom";
import { Readability } from "mozilla-readability";

export function parseContentWithMozillaReadability(url: string, html: string): string {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const reader = new Readability(url, doc);
  const parsed = reader.parse();
  return parsed?.textContent || "No content extracted.";
}
