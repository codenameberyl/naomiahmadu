type PhoneFrameProps = {
  children: React.ReactNode;
  /** Screen aspect ratio, e.g. "480 / 854". The screen is never cropped. */
  aspectRatio: string;
  className?: string;
};

/**
 * A modern smartphone mockup drawn in CSS: titanium-style frame, black
 * bezel, Dynamic Island, side buttons and a soft screen glare. Purely
 * decorative; the screen content keeps its own accessibility.
 */
export function PhoneFrame({
  children,
  aspectRatio,
  className = "",
}: PhoneFrameProps) {
  return (
    <div className={`relative px-[3px] ${className}`}>
      {/* Side buttons: action + volume on the left, power on the right. */}
      <span
        aria-hidden="true"
        className="absolute top-[16%] left-0 h-[5%] w-[4px] rounded-l-sm bg-[#2b2623]"
      />
      <span
        aria-hidden="true"
        className="absolute top-[24%] left-0 h-[9%] w-[4px] rounded-l-sm bg-[#2b2623]"
      />
      <span
        aria-hidden="true"
        className="absolute top-[35%] left-0 h-[9%] w-[4px] rounded-l-sm bg-[#2b2623]"
      />
      <span
        aria-hidden="true"
        className="absolute top-[28%] right-0 h-[13%] w-[4px] rounded-r-sm bg-[#2b2623]"
      />

      {/* Frame */}
      <div className="relative rounded-[3rem] bg-[linear-gradient(150deg,#4a433e_0%,#1d1917_28%,#141110_62%,#3a3430_100%)] p-[5px] shadow-[0_1px_0_1px_rgba(255,255,255,0.06),0_30px_60px_-20px_rgba(31,26,23,0.45),0_12px_24px_-12px_rgba(31,26,23,0.35)]">
        {/* Bezel */}
        <div className="rounded-[2.75rem] bg-black p-[9px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]">
          {/* Screen */}
          <div
            className="relative isolate overflow-hidden rounded-[2.2rem] bg-black"
            style={{ aspectRatio }}
          >
            {children}
            {/* Dynamic Island */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-[11px] left-1/2 z-10 h-[24px] w-[30%] -translate-x-1/2 rounded-full bg-black"
            />
            {/* Glare */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(115deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.03)_22%,transparent_38%)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
