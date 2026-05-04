// Pixel Forge — Core Game Loop (init → update → render)
import { Grid } from './grid.js';

const TARGET_FPS = 60;
const FRAME_DURATION = 1000 / TARGET_FPS;

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvas.width = 800;
    this.canvas.height = 600;

    this.lastTime = 0;
    this.accumulator = 0;
    this.running = false;

    this.grid = new Grid(this.canvas.width, this.canvas.height, 16);
  }

  start() {
    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame((ts) => this.loop(ts));
    console.log('[PixelForge] Game loop started at 60fps target.');
  }

  loop(timestamp) {
    if (!this.running) return;

    const delta = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.accumulator += delta;

    while (this.accumulator >= FRAME_DURATION) {
      this.update(FRAME_DURATION / 1000);
      this.accumulator -= FRAME_DURATION;
    }

    this.render();
    requestAnimationFrame((ts) => this.loop(ts));
  }

  update(dt) {
    this.grid.update(dt);
  }

  render() {
    this.ctx.fillStyle = '#0d0d0d';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.grid.render(this.ctx);
  }
}
