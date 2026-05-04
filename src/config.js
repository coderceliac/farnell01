// Pixel Forge — Global Constants
// Tweak these values to adjust the feel and size of the game world.
// All other modules import from here — never hardcode magic numbers elsewhere.

// Size of each tile in pixels (the atomic unit of the world grid)
export const TILE_SIZE = 16;

// World dimensions in tiles — 64x64 = a large scrollable factory floor
export const GRID_COLS = 64;
export const GRID_ROWS = 64;

// Canvas (viewport) size in pixels — what the player sees at once
export const CANVAS_WIDTH  = 800;
export const CANVAS_HEIGHT = 600;

// How fast the camera moves per frame (in pixels)
export const CAMERA_SPEED = 4;

// Target frames per second for the fixed-timestep game loop
export const TARGET_FPS = 60;

// When true, draws grid lines over the world so you can see tile boundaries
// Toggle at runtime by pressing G
export const DEBUG = true;
