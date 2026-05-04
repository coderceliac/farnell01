// Pixel Forge — Core Game Loop (wired up with Camera + Input)
// init() → start() → loop() → update() + render() → repeat

import { Grid }   from './grid.js';
import { Camera } from './camera.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT, TARGET_FPS, GRID_COLS, GRID_ROWS, TILE_SIZE } from './config.js';

// Fixed timestep: each update "tick" represents this many milliseconds
const FRAME_DURATION = 1000 / TARGET_FPS;

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');

    // Set canvas size from config (instead of hardcoding 800/600 here)
    this.canvas.width  = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;

    // Timing variables for the fixed-timestep loop
    this.lastTime    = 0;   // timestamp of the last frame (ms)
    this.accumulator = 0;   // leftover time to carry into next frame (ms)
    this.running     = false;

    // ── Create subsystems ──────────────────────────────────────────────────
    // Grid: holds all tile data and renders visible tiles
    this.grid = new Grid();

    // Camera: tracks which part of the world the player is viewing
    this.camera = new Camera();
  }

  // ─── start() ───────────────────────────────────────────────────────────────
  // Called once from main.js to kick off the game loop.
  start() {
    this.running  = true;
    this.lastTime = performance.now();
    requestAnimationFrame((ts) => this.loop(ts));
    console.log('[PixelForge] Game started. WASD / Arrow keys to pan. G to toggle grid.');
  }

  // ─── loop(timestamp) ───────────────────────────────────────────────────────
  // The heart of the engine. requestAnimationFrame calls this ~60 times/second.
  // We use a fixed-timestep accumulator so physics/logic always runs at 60fps
  // regardless of how fast the browser actually fires rAF.
  loop(timestamp) {
    if (!this.running) return;

    // How many ms have passed since the last frame?
    const delta = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // Bank that time into the accumulator
    this.accumulator += delta;

    // Drain the accumulator in fixed-size chunks (16.67ms each at 60fps).
    // If a frame takes longer (e.g. 33ms), we run update() twice to catch up.
    while (this.accumulator >= FRAME_DURATION) {
      this.update(FRAME_DURATION / 1000); // pass delta in seconds
      this.accumulator -= FRAME_DURATION;
    }

    // Render once per animation frame (decoupled from update rate)
    this.render();

    // Schedule the next frame
    requestAnimationFrame((ts) => this.loop(ts));
  }

  // ─── update(dt) ────────────────────────────────────────────────────────────
  // Fixed-rate logic tick. dt = seconds per tick (≈0.01667 at 60fps).
  // Move the camera based on held keys, then clamp it inside the world.
  update(dt) {
    // Read input and move the camera
    this.camera.update(dt);

    // Prevent the camera from leaving the world boundary
    this.camera.clamp();
  }

  // ─── render() ──────────────────────────────────────────────────────────────
  // Draw everything. Called once per rAF frame.
  render() {
    // Clear with a dark background (#0d0d0d = near-black, slightly warm)
    this.ctx.fillStyle = '#0d0d0d';
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw the grid (only visible tiles — culling happens inside grid.render)
    this.grid.render(this.ctx, this.camera);

    // Future: render entities, buildings, HUD on top here
  }
}
