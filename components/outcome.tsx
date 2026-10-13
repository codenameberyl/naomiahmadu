/**
 * Splits a leading figure ("+146%", "3", "−15%") from the rest of an
 * outcome chip so the number can be set large. The text is unchanged.
 */
export function splitOutcome(chip: string): { figure?: string; text: string } {
  const match = chip.match(/^([+−-]?\d[\d.,]*%?)\s+(.*)$/u);
  if (!match) return { text: chip };
  return { figure: match[1], text: match[2] };
}

export function OutcomeChips({ chips }: { chips: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <li
          key={chip}
          className="rounded-full border border-line-strong/50 px-3 py-1.5 text-[0.82rem] leading-tight font-semibold text-text"
        >
          {chip}
        </li>
      ))}
    </ul>
  );
}
