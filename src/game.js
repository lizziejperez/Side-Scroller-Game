// Main game controller.
//
// Responsibilities:
// - Store shared game data such as canvas size
// - Keep track of the current active scene
// - Forward browser events (such as clicks) to the current scene
// - Call the current scene's update and draw methods

import { MenuScene } from "./scenes/menuScene.js";

export class Game {
  constructor(canvas) {
    // Store canvas reference so scenes can use it for mouse position calculations
    this.canvas = canvas;

    // Store game dimensions based on the canvas size
    this.width = canvas.width;
    this.height = canvas.height;

    // Set the first scene of the game
    this.currentScene = new MenuScene(this);

    // Forward click events to the current scene if that scene supports click handling
    this.canvas.addEventListener("click", (event) => {
      this.currentScene.handleClick?.(event);
    });
  }

  /**
   * Change the active scene.
   *
   * This will be used later when switching from:
   * - menu -> play
   * - play -> tutorial
   * - play -> game over
   */
  changeScene(scene) {
    this.currentScene = scene;
  }

  /**
   * Update the current scene.
   *
   * The optional chaining allows scenes to skip an update method if they do not need one yet.
   */
  update() {
    this.currentScene.update?.();
  }

  /**
   * Draw the current scene.
   *
   * The canvas is cleared first so each frame is redrawn cleanly.
   */
  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
    this.currentScene.draw(ctx);
  }
}