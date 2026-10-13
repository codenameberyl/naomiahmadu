import { ImageResponse } from "next/og";
import { Monogram } from "@/components/monogram";
import { ogFonts } from "@/lib/og-fonts";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(<Monogram fontSize={46} radius={14} />, {
    ...size,
    fonts: ogFonts,
  });
}
