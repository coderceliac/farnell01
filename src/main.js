// ============================================================
// src/main.js — Entry point for Pixel Forge
// ============================================================
// This is the first file the browser loads (via index.html).
// It creates the Game instance and fires the loop.

import { Game } from './game.js';

// Create a new Game — the constructor sets up the canvas + grid
const game = new Game();

// start() calls init() then kicks off the requestAnimationFrame loop
game.start();
