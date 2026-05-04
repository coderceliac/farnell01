// Pixel Forge — Camera System
// The camera defines which part of the world is currently visible on screen.
// Think of it as a viewport that slides over a much larger world.
//
// camera.x / camera.y = the world pixel coordinate of the top-left screen corner.
// Everything rendered on screen is offset by -(camera.x, camera.y).

import { CAMERA_SPEED, GRID_COLS, GRID_ROWS, TILE_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT } from './config.js';
import { keys } from './input.js';

export class Camera {
  constructor() {
    // Start looking at the top-left corner of the world
    this.x = 0; // world pixel X of the screen's left edge
    this.y = 0; // world pixel Y of the screen's top edge
  }

  // ─── update(delta) ──────────────────────────────────────────────────────────
  // Called every fixed timestep. Moves the camera based on which keys are held.
  // delta is in seconds (e.g. 0.01667 for 60fps), but CAMERA_SPEED is in px/frame
  // so we treat this as a per-frame nudge (delta accumulator already locks to 60fps).
  update(delta) {
    // Move up
    if (keys['ArrowUp']    || keys['w'] || keys['W']) this.y -= CAMERA_SPEED;
    // Move down
    if (keys['ArrowDown']  || keys['s'] || keys['S']) this.y += CAMERA_SPEED;
    // Move left
    if (keys['ArrowLeft']  || keys['a'] || keys['A']) this.x -= CAMERA_SPEED;
    // Move right
    if (keys['ArrowRight'] || keys['d'] || keys['D']) this.x += CAMERA_SPEED;
  }

  // ─── clamp() ────────────────────────────────────────────────────────────────
  // Prevents the camera from scrolling outside the world boundary.
  // The camera's maximum X is the world width minus the canvas width (in pixels),
  // so the right edge of the screen never goes past the right edge of the world.
  clamp() {
    const worldPixelWidth  = GRID_COLS * TILE_SIZE; // total world width in px
    const worldPixelHeight = GRID_ROWS * TILE_SIZE; // total world height in px

    // Clamp X: can't scroll left of 0, can't scroll right past world edge
    this.x = Math.max(0, Math.min(this.x, worldPixelWidth  - CANVAS_WIDTH));
    // Clamp Y: can't scroll above 0, can't scroll below world edge
    this.y = Math.max(0, Math.min(this.y, worldPixelHeight - CANVAS_HEIGHT));
  }

  // ─── worldToScreen(worldX, worldY) ─────────────────────────────────────────
  // Converts a world-space pixel coordinate to a screen-space pixel coordinate.
  // This is used whenever you want to draw something at a world position:
  //   const { sx, sy } = camera.worldToScreen(entity.x, entity.y);
  //   ctx.fillRect(sx, sy, width, height);
  //
  // Formula: screenPos = worldPos - cameraPos
  // (subtract how far the camera has scrolled to get the on-screen position)
  worldToScreen(worldX, worldY) {
    return {
      sx: worldX - this.x,
      sy: worldY - this.y,
    };
  }
}
