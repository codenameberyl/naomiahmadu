import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Static TTFs for ImageResponse (Satori cannot read the next/font files).
// Both fonts are licensed under the SIL Open Font License. Loaded at module
// scope so the generated images can be prerendered at build time.
const dir = join(process.cwd(), "assets/fonts");

const [fraunces, instrumentSans] = await Promise.all([
  readFile(join(dir, "Fraunces-144pt-Regular.ttf")),
  readFile(join(dir, "InstrumentSans-Medium.ttf")),
]);

export const ogFonts = [
  {
    name: "Fraunces",
    data: fraunces,
    style: "normal" as const,
    weight: 400 as const,
  },
  {
    name: "Instrument Sans",
    data: instrumentSans,
    style: "normal" as const,
    weight: 500 as const,
  },
];
