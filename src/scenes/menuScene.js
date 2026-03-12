// Menu scene.
//
// Responsibilities:
// - Draw the title screen
// - Show the game's opening story text
// - Show the Play button
// - Render atmospheric ember particles
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

    // Ember particle system
    // Small floating particles simulate ash drifting upward in the cave environment.
    this.embers = [];
    this.maxEmbers = 30;

    for (let i = 0; i < this.maxEmbers; i++) {
      this.embers.push(this.createEmber());
    }
  }

  /**
   * Create a single ember particle.
   */
  createEmber() {
    return {
      x: Math.random() * this.game.width,
      y: this.game.height + Math.random() * 100,
      radius: Math.random() * 2 + 1,
      speedY: Math.random() * 0.6 + 0.3,
      driftX: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2,
    };
  }

  /**
   * Update the menu scene.
   *
   * Updates ember particle positions to create a gentle floating effect.
   */
  update() {
    for (const ember of this.embers) {
      ember.y -= ember.speedY;
      ember.x += ember.driftX;

      // Reset ember if it leaves the top of the screen
      if (ember.y < -10) {
        Object.assign(ember, this.createEmber(), {
          y: this.game.height + Math.random() * 40,
        });
      }

      // Wrap horizontally so embers don't disappear abruptly
      if (ember.x < -10) ember.x = this.game.width + 10;
      if (ember.x > this.game.width + 10) ember.x = -10;
    }
  }

  /**
   * Draw the menu scene.
   */
  draw(ctx) {
    // Fill the whole screen with the main background color
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, this.game.width, this.game.height);

    // Draw ember particles behind UI elements
    this.drawEmbers(ctx);

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
   * Draw ember particles.
   */
  drawEmbers(ctx) {
    for (const ember of this.embers) {
      ctx.save();

      ctx.globalAlpha = ember.alpha;

      ctx.beginPath();
      ctx.fillStyle = COLORS.accentFire;
      ctx.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
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