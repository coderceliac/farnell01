// Pixel Forge — Pixel Grid (tile map foundation)
export class Grid {
  constructor(canvasWidth, canvasHeight, tileSize) {
    this.tileSize = tileSize;
    this.cols = Math.floor(canvasWidth / tileSize);
    this.rows = Math.floor(canvasHeight / tileSize);
    this.tiles = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(null)
    );
    console.log(`[Grid] Initialized ${this.cols}x${this.rows} grid @ ${tileSize}px tiles`);
  }

  update(dt) {
    // Tile simulation tick — to be expanded in #7
  }

  render(ctx) {
    // Draw grid lines (debug view)
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 0.5;
    for (let r = 0; r <= this.rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * this.tileSize);
      ctx.lineTo(this.cols * this.tileSize, r * this.tileSize);
      ctx.stroke();
    }
    for (let c = 0; c <= this.cols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * this.tileSize, 0);
      ctx.lineTo(c * this.tileSize, this.rows * this.tileSize);
      ctx.stroke();
    }
  }
}
