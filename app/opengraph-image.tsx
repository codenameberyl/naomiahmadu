import { ImageResponse } from "next/og";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { ogFonts } from "@/lib/og-fonts";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const metric = home.metrics[0];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#faf6f0",
        color: "#1f1a17",
        fontFamily: "Instrument Sans",
      }}
    >
      <div style={{ display: "flex", fontFamily: "Fraunces", fontSize: 44 }}>
        {site.wordmark}
        <span style={{ color: "#a63f22" }}>.</span>
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: 56 }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              fontFamily: "Fraunces",
              fontSize: 88,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {site.name}
          </div>
          <div style={{ marginTop: 20, fontSize: 34, color: "#62564d" }}>
            {site.jobTitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 360,
            paddingLeft: 40,
            borderLeft: "2px solid #e2d6c8",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Fraunces",
              fontSize: 120,
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            {metric.value}
            <span style={{ color: "#a63f22", fontSize: 60, marginTop: 8 }}>
              {metric.suffix}
            </span>
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 24,
              lineHeight: 1.35,
              color: "#62564d",
            }}
          >
            {metric.label}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          height: 6,
          background: "#a63f22",
          width: 120,
        }}
      />
    </div>,
    { ...size, fonts: ogFonts },
  );
}
