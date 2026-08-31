/**
 * One flat monoline set on a 24x24 grid: straight lines and right angles only,
 * no curves, no brand logos. Each mark is a single path so it can be recoloured
 * with `currentColor`, resized with `--deck-ico-size` and re-weighted with
 * `--deck-ico-weight` without touching this file.
 */
export const PATHS = {
  arrow: 'M3 12h18M14 5l7 7-7 7',
  arrowLeft: 'M21 12H3M10 5l-7 7 7 7',
  code: 'M8 6l-5 6 5 6M16 6l5 6-5 6',
  box: 'M3 7h18v14H3zM3 7l3-4h12l3 4M12 7v14',
  out: 'M11 4H4v16h16v-7M14 3h7v7M21 3l-9 9',
  mail: 'M3 5h18v14H3zM3 5l9 8 9-8',
  doc: 'M5 3h9l5 5v13H5zM14 3v5h5M8 13h8M8 17h6',
  tag: 'M3 3h9l9 9-9 9-9-9zM7 7h2v2H7z',
  filter: 'M3 5h18M6 12h12M10 19h4',
  close: 'M5 5l14 14M19 5L5 19',
  terminal: 'M3 4h18v16H3zM7 9l3 3-3 3M13 15h4',
  layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17l9 5 9-5',
  clock: 'M3 3h18v18H3zM12 7v5l4 2',
} as const

export type DeckIconName = keyof typeof PATHS
