// app/utils/readability.server.ts
import { Readability } from "@mozilla/readability"
import { JSDOM } from "jsdom"

export function parseContentWithReadability(url: string, html: string) {
  const doc = new JSDOM(html, { url })
  const reader = new Readability(doc.window.document)
  const result = reader.parse()
  if (!result) return ""
  return result.textContent
}
