# Ember Particle System

This document explains the simple particle system used to render the floating ember effect in the title screen of **Oath of the Deep**.

The system simulates small glowing ash particles drifting upward in the cave atmosphere.

## Overview

The ember system is a lightweight particle simulation.

Each ember is represented by a small object containing its:

- position
- size
- velocity
- opacity

Example structure:

```js
{
  x: Number,
  y: Number,
  radius: Number,
  speedY: Number,
  driftX: Number,
  alpha: Number
}
```

Multiple ember objects are stored in an array and updated every frame.

## Particle Initialization

When the menu scene is created, a fixed number of embers are generated.

```js
this.maxEmbers = 30;

for (let i = 0; i < this.maxEmbers; i++) {
  this.embers.push(this.createEmber());
}
```

Each particle is initialized with randomized properties to avoid uniform motion.

## Randomized Particle Properties

Randomization creates natural variation.

Horizontal Position
x = random() * screenWidth

This distributes particles across the width of the screen.

Vertical Start Position
y = screenHeight + random() * 100

Particles begin slightly below the screen so they drift into view.

## Vertical Movement

Each frame the particle moves upward:
```js
y = y - speedY
```
Where:
```js
speedY = random(0.3 → 0.9)
```
This creates different rising speeds.

## Opacity

Each ember has a semi-random transparency value:
```js
alpha = random(0.2 → 0.7)
```
This makes some particles appear brighter than others.

During rendering:
```js
ctx.globalAlpha = ember.alpha
```

## Rendering

Each particle is drawn as a small circle:
```js
ctx.beginPath()
ctx.arc(x, y, radius, 0, Math.PI * 2)
ctx.fill()
```

Where:
```js
radius = random(1 → 3)
```

The color is taken from the UI palette:
```js
COLORS.accentFire
```

## Particle Recycling

When a particle leaves the screen, it is recycled instead of deleted.
```js
if (y < -10)
    // reset particle
```
The particle is repositioned below the screen with new random properties.

This approach avoids:

- unnecessary object creation
- garbage collection spikes

## Why This Approach

This particle system is intentionally simple.

Advantages:

- extremely lightweight
- easy to tune
- no physics engine required
- works well for background atmosphere
- For a menu screen effect, a full physics-based particle system would be unnecessary.