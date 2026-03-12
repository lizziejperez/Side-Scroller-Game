# Oath of the Deep

A modular endless side-scroller built with HTML5 Canvas

## Current Status

🚧 Early development

Implemented so far:
- Modular project structure
- Scene system architecture

Next steps:
- Title/menu scene
- Scene switching foundation
- Play scene implementation
- Player movement and controls
- Tutorial scene

## Running the Project

This project uses JavaScript ES modules (`import` / `export`), which means it must be run through a **local development server**.

Opening `index.html` directly in the browser (`file://`) will not work because modern browsers block module imports for security reasons.

### Quick Start (VS Code)

1. Install the **Live Server** extension
2. Open the project folder in VS Code
3. Right-click `index.html`
4. Select **"Open with Live Server"**

### Alternative Local Servers

You can also run the project using a simple local server:

Python:
```
python -m http.server
```

Node:
```
npx serve
```
Then open: [http://localhost:8000](http://localhost:8000)

## Project Goal

Create a modular, scalable endless side-scroller in HTML5 Canvas that demonstrates:
- Entity-based architecture
- Resource management systems
- Procedural spawning
- State-driven gameplay
- Dynamic lighting via Canvas masking

This project is designed as both a playable game and a demonstration of frontend engineering systems.

## Game Concept

A rookie knight descends into a cursed cave after swearing to clear it of all evil perils — or never return to the kingdom.

The cave is endless.

The deeper he goes:

- Enemies grow more numerous
- Darkness intensifies
- His torch burns faster

If his flame dies, so does his oath.

## Core Mechanic – Torch System

The knight carries a torch that:

- Slowly burns down over time
- Shrinks the visible light radius as it weakens
- Can be restored by defeating enemies or collecting oil

When the torch reaches zero:

- Darkness overtakes the cave
- A short grace period begins
- Game over

This system creates constant tension and drives difficulty scaling.

## Technical Architecture

Planned modular structure:

- `Game` – Orchestrator & main loop
- `Player` – Movement + state machine
- `Enemy` classes – Individual behaviors
- `EnemyManager` – Spawn logic
- `TorchSystem` – Resource + light radius
- `DepthTracker` – Endless progression scaling
- `UI` – HUD & game state display
- `InputHandler` – Keyboard input abstraction

The project is intentionally structured to avoid monolithic tutorial-style code.

## Endless Design Strategy

The cave has no fixed end.

Endless progression is achieved by:

- Recycling cave tiles
- Procedural enemy spawning
- Increasing torch burn rate by depth
- Increasing enemy spawn density over time

Score is based on depth survived.

## Development Stages

### Stage 0 – Ideation

- Explored multiple themes (vampire, reaper, chicken runner, forest runner)
- Evaluated asset availability
- Compared mechanic complexity

### Stage 1 – Refinement

- Selected knight cave theme
- Chose Torch Light System as core mechanic
- Defined MVP scope

### Stage 2 - Initial Implementation (Ongoing)

Establish the foundational architecture and game flow.

- Initialize modular project structure
- Implement scene system
- Create menu scene
- Create play scene
- Add movement and input controls
- Create tutorial scene

### Stage 3 – MVP Implementation (Upcoming)

Implement the core gameplay loop and mechanics.

- Auto-run movement
- Jump mechanic
- Slash attack
- Torch drain + oil pickups
- Skeleton + bat enemies
- Depth tracking
- Restart + high score

### Stage 4 – Polish (Future)

- Flickering torch animation
- Cave atmosphere layers
- Additional enemy types
- Difficulty phase progression
- Sound design

## Learning Notes

This project started as a learning exercise using tutorials to understand HTML5 Canvas game loops and sprite animation.

It has since been refactored and expanded into an original game concept (“Oath of the Deep”) with a modular architecture and new core mechanics (torch/light system).

## Prototype (Learning Version)

The original tutorial-based prototype is preserved in `/prototype` for reference.

The main game (“Oath of the Deep”) is being built in `/src`.