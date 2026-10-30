import test from 'node:test';
import assert from 'node:assert/strict';
import { boardLayout } from '../src/app/photography/board-layout.ts';

const items = Array.from({ length: 200 }, (_, i) => ({
  width: [2400, 1600, 800, 3200][i % 4],
  height: [1600, 2400, 2400, 800][i % 4],
}));

for (const columns of [2, 3]) {
  test(`${columns} columns: mixed aspect ratios stay inside their columns with no overlap`, () => {
    for (const width of [240, 360, 422]) {
      const gap = 40;
      const { positions, ends } = boardLayout(items, columns);
      const bottom = Array(columns).fill(-Infinity);
      for (const [i, position] of positions.entries()) {
        const top = position.ratio * width + position.gaps * gap;
        const height = items[i].height / items[i].width * width;
        assert.ok(top - bottom[position.column] >= gap - 0.001);
        bottom[position.column] = top + height;
      }
      ends.forEach((end, column) => {
        assert.ok(Math.abs(end.ratio * width + end.gaps * gap - bottom[column]) < 0.001);
      });
    }
  });
  test(`${columns} columns: adding photos preserves existing placement`, () => {
    const original = boardLayout(items.slice(0, 7), columns).positions;
    assert.deepEqual(boardLayout(items, columns).positions.slice(0, 7), original);
    assert.deepEqual(boardLayout([], columns), { positions: [], ends: [] });
    assert.equal(boardLayout(items.slice(0, 1), columns).ends.length, 1);
  });
}
