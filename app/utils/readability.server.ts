import { JSDOM } from "jsdom";
import readabilityDefault from "readability";

const { Readability } = readabilityDefault;

export function parseContentWithReadability(url: string, html: string): string {
  const dom = new JSDOM(html, { url });

  // Added so polyfill HTMLFrameElement so readability doesn't crash
  if (typeof dom.window.HTMLFrameElement === "undefined") {
    (dom.window as any).HTMLFrameElement = class {};
  }

  const parsed = new Readability(dom.window.document).parse();
  return parsed?.textContent || "No content extracted.";
}
