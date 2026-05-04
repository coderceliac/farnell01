// ============================================================
// src/config.js — Global constants for Pixel Forge
// Tweak these values to change how the game looks and feels.
// ============================================================

// TILE_SIZE: how many pixels wide/tall each grid cell is
export const TILE_SIZE = 16;

// GRID_COLS / GRID_ROWS: total number of tiles across each axis
// 50 cols × 16px = 800px wide canvas
// 37 rows × 16px = 592px tall canvas
export const GRID_COLS = 50;
export const GRID_ROWS = 37;

// TARGET_FPS: the frame rate the game loop aims to hit
export const TARGET_FPS = 60;

// DEBUG: when true, the grid draws visible guide lines over the canvas
// Set to false to hide the grid in production
export const DEBUG = true;
