// ============================================================
// src/grid.js — The tile grid renderer
// ============================================================
// The Grid class manages a 2D array of tiles and draws
// debug grid lines on the canvas when DEBUG mode is on.

import { TILE_SIZE, GRID_COLS, GRID_ROWS, DEBUG } from './config.js';

export class Grid {
  // ctx       — the 2D canvas rendering context (we draw onto this)
  // cols      — number of tile columns (from config)
  // rows      — number of tile rows (from config)
  // tileSize  — pixel size of each tile (from config)
  constructor(ctx, cols = GRID_COLS, rows = GRID_ROWS, tileSize = TILE_SIZE) {
    this.ctx      = ctx;
    this.cols     = cols;
    this.rows     = rows;
    this.tileSize = tileSize;

    // 2D array of tiles — each cell is null until a building/resource is placed
    // Array.from lets us build a 2D array in one line
    this.tiles = Array.from({ length: rows }, () => new Array(cols).fill(null));
  }

  // render() — called once per frame to draw the grid
  render() {
    // Only draw grid lines when DEBUG is enabled
    if (!DEBUG) return;

    const { ctx, cols, rows, tileSize } = this;

    // Style for the guide lines — dark grey, thin
    ctx.strokeStyle = '#2a2a3e';
    ctx.lineWidth   = 0.5;

    // --- Horizontal lines (one per row boundary) ---
    for (let r = 0; r <= rows; r++) {
      const y = r * tileSize;
      ctx.beginPath();
      ctx.moveTo(0, y);                  // start at left edge
      ctx.lineTo(cols * tileSize, y);    // draw to right edge
      ctx.stroke();
    }

    // --- Vertical lines (one per column boundary) ---
    for (let c = 0; c <= cols; c++) {
      const x = c * tileSize;
      ctx.beginPath();
      ctx.moveTo(x, 0);                  // start at top edge
      ctx.lineTo(x, rows * tileSize);    // draw to bottom edge
      ctx.stroke();
    }
  }
}
