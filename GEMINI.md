# Galaga Clone Project

## Project Overview
This project is a classic Galaga clone built entirely with Vanilla JavaScript (ES6+) and the HTML5 Canvas API. It aims to recreate the retro arcade experience with modern code architecture.

**Key Features:**
- **Game Engine:** Custom-built game loop using `requestAnimationFrame` with frame-rate independent movement (`deltaTime`).
- **Architecture:** Class-based Object-Oriented Programming (OOP) structure. A central `Game` engine manages various `Entity` subclasses (`Player`, `Enemy`, `Bullet`, `Starfield`, `Particle`).
- **Game Loop & Stages:** Includes a full game lifecycle (Start Screen, Play, Game Over), infinite stage progression with increasing difficulty, and a life/respawn system with temporary invincibility.
- **VFX & Polish:** Features a custom particle system for explosions, screen shake effects for impacts, and Bezier curve-based entering animations for enemy formations.
- **Audio:** Synthesized retro 8-bit sound effects generated on-the-fly using the Web Audio API (`AudioManager`).
- **Data Persistence:** LocalStorage integration for saving and loading the High Score.

## Building and Running

This is a vanilla web project and does not require a complex build step to run the game itself. 

**To play the game:**
Serve the root directory using any local static web server to resolve ES module CORS restrictions.
*   **Using Node.js:** `npx serve .` or `npx http-server`
*   **Using Python:** `python3 -m http.server 8000`
Then, open `http://localhost:8000` (or the respective port) in your web browser.

**To run tests:**
The project uses [Vitest](https://vitest.dev/) with `jsdom` for testing.
1. Install dependencies: `npm install`
2. Run tests: `npm test`

## Development Conventions

*   **Architecture:** Adhere strictly to the existing class-based OOP structure. All visible game objects should extend from the base `Entity` class and implement `update(deltaTime)` and `draw(ctx)` methods.
*   **Frame Independence:** Always use `deltaTime` (passed into `update` methods) for any movement, animation, or timing logic to ensure the game runs consistently across different monitor refresh rates.
*   **Test-Driven Development (TDD):** This project strongly enforces TDD practices (Red-Green-Refactor). New features or bug fixes must be accompanied by failing tests first, followed by the minimal implementation required to pass the tests. Test files are located in the `tests/` directory.
*   **No External Assets:** As a design constraint, avoid using external image or audio files. Rely on the Canvas API for drawing (shapes, pixels) and the Web Audio API for generating sounds.
*   **State Management:** The `Game` class acts as the central state machine (`gameState`: 'START', 'PLAY', 'GAMEOVER'). Ensure clean transitions and proper cleanup of inactive entities (`active = false`).
