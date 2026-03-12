// Menu scene.
//
// Responsibilities:
// - Draw the title screen
// - Show the game's opening story text
// - Show the Play button
// - Handle clicking the Play button
//
// This is the first scene shown when the game loads.

import { Button } from "../ui/button.js";
import { COLORS } from "../config/colors.js";

export class MenuScene {
  constructor(game) {
    // Store reference to the main game object
    this.game = game;

    // Create the Play button
    // Currently clicking it just logs to the console.
    // TODO: Switch to PlayScene once the PlayScene is implemented.
    this.playButton = new Button({
      x: this.game.width / 2 - 110,
      y: 340,
      width: 220,
      height: 60,
      text: "Play",
      onClick: () => {
        console.log("Play clicked");
      },
    });
  }

  /**
   * Update the menu scene.
   *
   * The menu currently has no animated elements yet,
   * but the method exists so the scene structure stays consistent.
   */
  update() {}

  /**
   * Draw the menu scene.
   */
  draw(ctx) {
    // Fill the whole screen with the main background color
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, this.game.width, this.game.height);

    // Draw the center panel behind the title and story text
    ctx.fillStyle = COLORS.panel;
    ctx.fillRect(140, 40, this.game.width - 280, 250);

    // Draw the panel border
    ctx.strokeStyle = COLORS.border;
    ctx.lineWidth = 2;
    ctx.strokeRect(140, 40, this.game.width - 280, 250);

    // Draw the game title
    ctx.fillStyle = COLORS.accentTorch;
    ctx.textAlign = "center";
    ctx.font = "bold 42px Arial";
    ctx.fillText("Oath of the Deep", this.game.width / 2, 95);

    // Draw the main story text
    ctx.fillStyle = COLORS.textPrimary;
    ctx.font = "20px Arial";
    ctx.fillText(
      "A rookie knight swore to clear a cursed cave of all evil perils",
      this.game.width / 2,
      165
    );
    ctx.fillText(
      "or never return to the kingdom.",
      this.game.width / 2,
      195
    );

    // Draw the supporting line in a more muted color
    ctx.fillStyle = COLORS.textMuted;
    ctx.fillText(
      "His torch is his only protection in the endless dark.",
      this.game.width / 2,
      240
    );

    // Draw the Play button
    this.playButton.draw(ctx);
  }

  /**
   * Handle mouse clicks on the menu.
   *
   * Converts browser mouse coordinates into canvas coordinates,
   * then checks whether the Play button was clicked.
   */
  handleClick(event) {
    const rect = this.game.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (this.playButton.containsPoint(mouseX, mouseY)) {
      this.playButton.onClick();
    }
  }
}