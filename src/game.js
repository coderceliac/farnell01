// ============================================================
// src/game.js — Core game loop for Pixel Forge
// ============================================================
// The Game class owns the canvas, runs the fixed-timestep loop,
// and coordinates update() → render() every frame.

import { TILE_SIZE, GRID_COLS, GRID_ROWS, TARGET_FPS } from './config.js';
import { Grid } from './grid.js';

// How many milliseconds should elapse per fixed-timestep tick
// e.g. 1000ms / 60fps = ~16.67ms per tick
const FRAME_DURATION = 1000 / TARGET_FPS;

export class Game {
  constructor() {
    // Grab the canvas element from index.html
    this.canvas = document.getElementById('gameCanvas');

    // getContext('2d') gives us the 2D drawing API
    this.ctx = this.canvas.getContext('2d');

    // Set canvas pixel dimensions based on config
    // (GRID_COLS tiles × TILE_SIZE pixels each)
    this.canvas.width  = GRID_COLS * TILE_SIZE;   // 50 × 16 = 800px
    this.canvas.height = GRID_ROWS * TILE_SIZE;   // 37 × 16 = 592px

    // Instantiate the grid — pass our drawing context + config values
    this.grid = new Grid(this.ctx, GRID_COLS, GRID_ROWS, TILE_SIZE);

    // Timing variables for the fixed-timestep loop
    this.lastTime    = 0;     // timestamp of the previous frame
    this.accumulator = 0;     // leftover time we haven't simulated yet
    this.running     = false; // flag to pause/stop the loop
  }

  // init() — called once before the loop starts
  // (nothing to set up yet beyond the constructor, but the hook is here
  //  so future systems — input, sound, asset loading — can slot in)
  init() {
    console.log(
      `[PixelForge] Canvas ready: ${this.canvas.width}×${this.canvas.height}px | ` +
      `Grid: ${GRID_COLS}×${GRID_ROWS} tiles @ ${TILE_SIZE}px each`
    );
  }

  // start() — kicks off the game loop
  start() {
    this.init();
    this.running  = true;
    this.lastTime = performance.now(); // high-res timestamp in milliseconds
    requestAnimationFrame((ts) => this.loop(ts));
  }

  // loop() — called by the browser before every repaint (~60 times/sec)
  // timestamp — DOMHighResTimeStamp provided by requestAnimationFrame
  loop(timestamp) {
    if (!this.running) return; // safety valve to pause the game

    // How many ms have passed since the last frame?
    const delta = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // Accumulate elapsed time
    this.accumulator += delta;

    // Fixed-timestep: consume accumulated time in FRAME_DURATION chunks
    // This keeps physics/logic deterministic even if the frame rate varies
    while (this.accumulator >= FRAME_DURATION) {
      // Pass delta in SECONDS (not ms) — easier for physics math later
      this.update(FRAME_DURATION / 1000);
      this.accumulator -= FRAME_DURATION;
    }

    // Draw the current state
    this.render();

    // Schedule the next frame
    requestAnimationFrame((ts) => this.loop(ts));
  }

  // update(delta) — advance game logic by `delta` seconds
  // delta is always exactly 1/60 thanks to the fixed timestep above
  update(delta) {
    // Stub — game systems (machines, belts, resources) hook in here in future issues
    // Uncomment the line below to verify the loop is ticking in the browser console:
    // console.log('[update] delta (s):', delta.toFixed(4));
  }

  // render() — draw everything for the current frame
  render() {
    // Clear the canvas with the dark background colour
    this.ctx.fillStyle = '#1a1a1a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw the tile grid (shows guide lines when DEBUG = true in config.js)
    this.grid.render();
  }
}
