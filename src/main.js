// Entry point for the game.
//
// Responsibilities:
// - Find the canvas element in the HTML
// - Set the canvas size
// - Create the main Game instance
// - Start the animation loop

import { Game } from "./game.js";

// Get the canvas from the index.html page
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Set the internal drawing resolution of the canvas.
// These values define the coordinate system used by the game.
canvas.width = 900;
canvas.height = 500;

// Create the main game controller
const game = new Game(canvas);

/**
 * Main animation loop.
 *
 * This runs once per animation frame.
 * For now it simply updates the current scene and redraws the screen.
 */
function animate() {
  game.update();
  game.draw(ctx);

  requestAnimationFrame(animate);
}

// Start the loop
animate();