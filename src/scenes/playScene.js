// Play scene.
//
// Responsibilities:
// - Represent the main gameplay scene
// - Draw the play screen placeholder for now
//
// This scene will later contain player movement, enemies, torch logic, and depth tracking.

import { COLORS } from "../config/colors.js";

export class PlayScene {
  constructor(game) {
    // Store reference to the main game object
    this.game = game;
  }

  /**
   * Update the play scene.
   *
   * The play scene does not yet have gameplay logic,
   * but the method exists so the scene structure stays consistent.
   */
  update() {}

  /**
   * Draw the play scene.
   */
  draw(ctx) {
    // Fill the screen with the main background color
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, this.game.width, this.game.height);

    // Draw placeholder text
    ctx.fillStyle = COLORS.textPrimary;
    ctx.textAlign = "center";
    ctx.font = "bold 36px Arial";
    ctx.fillText("Play Scene", this.game.width / 2, this.game.height / 2 - 20);

    ctx.font = "20px Arial";
    ctx.fillStyle = COLORS.textMuted;
    ctx.fillText(
      "Gameplay implementation coming next.",
      this.game.width / 2,
      this.game.height / 2 + 20
    );
  }
}