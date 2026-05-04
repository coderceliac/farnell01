// Pixel Forge — Input System
// Tracks which keyboard keys are currently held down.
//
// Usage in any module:
//   import { keys } from './input.js';
//   if (keys['ArrowUp']) { ... }
//
// Keys are set to true on keydown and deleted on keyup,
// so a missing key is the same as "not pressed".

export const keys = {};

// Listen for any key being pressed — store it in the keys object
window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});

// Listen for any key being released — remove it so it reads as "not held"
window.addEventListener('keyup', (e) => {
  delete keys[e.key];
});

// ─── G Key: Toggle Debug Grid ────────────────────────────────────────────────
// We import DEBUG state here so the G key can flip it at runtime.
// We use a plain object so the reference stays live across modules.
export const debugState = { active: true };

window.addEventListener('keydown', (e) => {
  // Toggle grid lines when G is pressed (case-insensitive)
  if (e.key === 'g' || e.key === 'G') {
    debugState.active = !debugState.active;
    console.log(`[Input] Debug grid: ${debugState.active ? 'ON' : 'OFF'}`);
  }
});
