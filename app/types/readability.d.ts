// app/types/readability.d.ts
declare module "readability" {
  import { Document } from "jsdom";
  export class Readability {
    constructor(doc: Document);
    parse(): {
      uri: string;
      title: string;
      byline: string | null;
      length: number;
      excerpt: string;
      siteName: string;
      textContent: string;
    } | null;
  }
}
