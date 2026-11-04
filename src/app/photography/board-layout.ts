export type PhotoDimensions = { width: number; height: number };
export type BoardPosition = {
  column: number;
  ratio: number;
  gaps: number;
};

// Place each new photo in the shortest column. Intrinsic aspect ratios reserve
// its space before loading, and stable ordering avoids a layout reshuffle.
export function boardLayout(items: PhotoDimensions[], columns: 2 | 3) {
  const spaces = [1, 1.5, 1.25, 1, 1.5, 1];
  // Approximate gap / column width at the responsive breakpoints. This is used
  // only to choose a column; CSS calculates the exact position at every width.
  const gapRatio = columns === 2 ? 0.09 : 0.11;
  const cursors = Array.from({ length: columns }, (_, column) => ({
    ratio: [0, 0.08, 0.16][column],
    gaps: 0,
  }));
  const ends: BoardPosition[] = [];
  const positions = items.map((item, index) => {
    const column = index < columns
      ? index
      : cursors.reduce((shortest, cursor, candidate) =>
          cursor.ratio + cursor.gaps * gapRatio <
          cursors[shortest].ratio + cursors[shortest].gaps * gapRatio
            ? candidate
            : shortest, 0);
    const cursor = cursors[column];
    const position = {
      column,
      ...cursor,
    };
    const end = { ...position, ratio: cursor.ratio + item.height / item.width };
    ends[column] = end;
    cursor.ratio = end.ratio;
    cursor.gaps += spaces[index % spaces.length];
    return position;
  });
  return { positions, ends };
}
