// app/types/mozilla-readability.d.ts
declare module "mozilla-readability" {
  import { Document } from "jsdom";

  interface ParseResult {
    uri: string;
    title: string;
    byline: string | null;
    length: number;
    excerpt: string;
    siteName: string;
    textContent: string;
  }

  export class Readability {
    constructor(uri: string, doc: Document);
    parse(): ParseResult | null;
  }
}
