export type PhotoDimensions = { width: number; height: number };
export type BoardPosition = {
  column: number;
  ratio: number;
  gaps: number;
};

// A repeatable arrangement, never random on render. Photos stay in their own
// column, with natural aspect ratios and reserved space before images load.
export function boardLayout(items: PhotoDimensions[], columns: 2 | 3) {
  const spaces = [1, 1.5, 1.25, 1, 1.5, 1];
  const cursors = Array.from({ length: columns }, (_, column) => ({
    ratio: [0, 0.22, 0.06][column],
    gaps: 0,
  }));
  const ends: BoardPosition[] = [];
  const positions = items.map((item, index) => {
    const column = index % columns;
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
