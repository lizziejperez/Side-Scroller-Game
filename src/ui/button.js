// Reusable button component for canvas-based UI.
//
// Responsibilities:
// - Store button size, position, label, and click behavior
// - Check whether a mouse click is inside the button
// - Draw the button to the canvas
//
// This will be reusable later for:
// - menu buttons
// - tutorial screen buttons
// - game over buttons

import { COLORS } from "../config/colors.js";

export class Button {
  constructor({ x, y, width, height, text, onClick }) {
    // Position and size
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    // Visible label text
    this.text = text;

    // Function to run when the button is clicked
    this.onClick = onClick;
  }

  /**
   * Return true if a point is inside the button's rectangle.
   *
   * Used for mouse click detection.
   */
  containsPoint(px, py) {
    return (
      px >= this.x &&
      px <= this.x + this.width &&
      py >= this.y &&
      py <= this.y + this.height
    );
  }

  /**
   * Draw the button.
   */
  draw(ctx) {
    // Draw the button background
    ctx.fillStyle = COLORS.button;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Draw the button border
    ctx.strokeStyle = COLORS.border;
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    // Draw the button text
    ctx.fillStyle = COLORS.textPrimary;
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);

    // Reset text baseline so other canvas text is not affected unexpectedly
    ctx.textBaseline = "alphabetic";
  }
}