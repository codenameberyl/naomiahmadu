/** "N." monogram derived from the wordmark, for generated icons. */
export function Monogram({
  fontSize,
  radius,
}: {
  fontSize: number;
  radius: number;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1f1a17",
        color: "#faf6f0",
        borderRadius: radius,
        fontFamily: "Fraunces",
        fontSize,
        lineHeight: 1,
        paddingBottom: fontSize * 0.08,
      }}
    >
      N<span style={{ color: "#ee8c63" }}>.</span>
    </div>
  );
}
