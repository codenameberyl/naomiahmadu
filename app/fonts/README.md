# Fraunces (display serif)

Licensed under the SIL Open Font License 1.1 (Undercase Type).

The full Google Fonts variable font is ~146 KB for both styles. The site
only needs a few fixed cuts, so these files are made from the variable
sources (`google/fonts/ofl/fraunces/Fraunces[SOFT,WONK,opsz,wght].ttf` and
`Fraunces-Italic[...]`) with fontTools, then subset to Latin:

| File                                | Source | Axes pinned                     | Used for                     |
| ----------------------------------- | ------ | ------------------------------- | ---------------------------- |
| `Fraunces-144-wght300-400.woff2`    | Roman  | opsz=144, wght=300:400 variable | Headlines, metrics, wordmark |
| `Fraunces-Italic-144-wght300.woff2` | Italic | opsz=144, wght=300              | "translated", pull quote     |
| `Fraunces-24-wght400.woff2`         | Roman  | opsz=24, wght=400               | Smaller serif text           |
| `Fraunces-Italic-24-wght400.woff2`  | Italic | opsz=24, wght=400               | Small italic labels          |

All are pinned to SOFT=0, WONK=1 (the Google Fonts defaults).

```bash
fonttools varLib.instancer Fraunces.ttf opsz=144 wght=300:400 SOFT=0 WONK=1 -o inst.ttf
pyftsubset inst.ttf --flavor=woff2 --layout-features='*' \
  --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD" \
  --output-file=Fraunces-144-wght300-400.woff2
```

To use another weight, size or character, re-run with different axis
values or more `--unicodes`, and update `app/layout.tsx`.
