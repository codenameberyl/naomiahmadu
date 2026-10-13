import { ImageResponse } from "next/og";
import { Monogram } from "@/components/monogram";
import { ogFonts } from "@/lib/og-fonts";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(<Monogram fontSize={124} radius={0} />, {
    ...size,
    fonts: ogFonts,
  });
}
