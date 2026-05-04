// Pixel Forge — World Grid (tile map renderer with culling)
//
// The grid is 64×64 tiles. Instead of drawing all 4096 tiles every frame,
// we only draw the tiles that are currently visible on screen.
// This is called "frustum culling" — a key performance technique.

import { TILE_SIZE, GRID_COLS, GRID_ROWS, CANVAS_WIDTH, CANVAS_HEIGHT } from './config.js';
import { debugState } from './input.js';

export class Grid {
  constructor() {
    // Create a 2D array of tiles, all null (empty) to start.
    // In future issues, tiles will hold data like { type: 'conveyor', dir: 'east' }.
    this.tiles = Array.from({ length: GRID_ROWS }, () =>
      Array(GRID_COLS).fill(null)
    );
    console.log(`[Grid] Initialized ${GRID_COLS}×${GRID_ROWS} world grid @ ${TILE_SIZE}px tiles`);
    console.log(`[Grid] World size: ${GRID_COLS * TILE_SIZE}×${GRID_ROWS * TILE_SIZE}px | Press G to toggle grid lines`);
  }

  // ─── render(ctx, camera) ────────────────────────────────────────────────────
  // Draws visible grid lines using the camera position to determine what's on screen.
  // Only processes tiles in the visible window — not all 64×64.
  render(ctx, camera) {
    // Only draw grid lines when debug mode is active (toggle with G key)
    if (!debugState.active) return;

    // ── Culling: figure out which tiles are visible ──────────────────────────
    // The camera's x/y is the world-pixel position of the top-left screen corner.
    // Dividing by TILE_SIZE converts pixels → tile indices.
    const startCol = Math.floor(camera.x / TILE_SIZE);
    const startRow = Math.floor(camera.y / TILE_SIZE);

    // Add one extra tile on each edge to avoid a half-tile gap at screen borders
    const endCol = Math.min(startCol + Math.ceil(CANVAS_WIDTH  / TILE_SIZE) + 1, GRID_COLS);
    const endRow = Math.min(startRow + Math.ceil(CANVAS_HEIGHT / TILE_SIZE) + 1, GRID_ROWS);

    // ── Draw grid lines ──────────────────────────────────────────────────────
    ctx.strokeStyle = '#2a2a3e'; // subtle dark blue-grey — visible but not distracting
    ctx.lineWidth   = 0.5;

    // Vertical lines (one per column in the visible range)
    for (let c = startCol; c <= endCol; c++) {
      // Convert the world pixel X of this column to a screen pixel X
      const screenX = c * TILE_SIZE - camera.x;

      ctx.beginPath();
      ctx.moveTo(screenX, 0);             // top of screen
      ctx.lineTo(screenX, CANVAS_HEIGHT); // bottom of screen
      ctx.stroke();
    }

    // Horizontal lines (one per row in the visible range)
    for (let r = startRow; r <= endRow; r++) {
      // Convert the world pixel Y of this row to a screen pixel Y
      const screenY = r * TILE_SIZE - camera.y;

      ctx.beginPath();
      ctx.moveTo(0,            screenY); // left of screen
      ctx.lineTo(CANVAS_WIDTH, screenY); // right of screen
      ctx.stroke();
    }
  }
}
