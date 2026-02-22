# Oath of the Deep

A modular endless side-scroller built with HTML5 Canvas

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

### Stage 2 – MVP Implementation (Upcoming)

- Auto-run movement
- Jump mechanic
- Slash attack
- Torch drain + oil pickups
- Skeleton + bat enemies
- Depth tracking
- Restart + high score

### Stage 3 – Polish (Future)

- Flickering torch animation
- Cave atmosphere layers
- Additional enemy types
- Difficulty phase progression
- Sound design