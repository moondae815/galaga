# Galaga Clone

A classic arcade Galaga clone built from scratch using Vanilla JavaScript (ES6+), the HTML5 Canvas API, and the Web Audio API. This project was developed with a strong emphasis on Test-Driven Development (TDD) and Object-Oriented Programming (OOP) principles.

## 🎮 Features

- **Infinite Stages:** Clear all enemies to advance to the next stage. The difficulty (enemy speed, attack frequency, and bullet speed) scales up as you progress.
- **Dynamic Enemy AI:** Enemies enter the screen following smooth Bezier curve trajectories to form a grid. They will periodically break formation to dive-bomb and shoot at the player.
- **Life & Respawn System:** Start with 3 lives. Getting hit grants a temporary 2-second invincibility (flickering effect) and forces attacking enemies back into formation, giving you a chance to recover.
- **Juicy Visuals (VFX):** Features a custom particle system for colorful explosion effects and screen shake upon player hits or destroying boss enemies.
- **Retro Audio:** Sound effects (shooting, explosions, game over, start) are synthesized entirely in code using the Web Audio API—no external audio files required.
- **High Score Persistence:** Your highest score is automatically saved to the browser's `localStorage` and persists across sessions.
- **Frame-Rate Independent:** The entire game loop uses `deltaTime` to ensure consistent movement speeds regardless of the monitor's refresh rate.

## 🛠️ Technology Stack

- **Language:** JavaScript (ES6+)
- **Graphics:** HTML5 `<canvas>`
- **Audio:** Web Audio API (`AudioContext`, `OscillatorNode`)
- **Testing:** [Vitest](https://vitest.dev/) with `jsdom`

## 🚀 How to Play

Because the project uses ES Modules (`<script type="module">`), you cannot simply double-click the `index.html` file due to browser CORS restrictions. You must serve it through a local web server.

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd galaga
   ```

2. **Serve the project:**
   You can use any local web server. For example:
   - **Using Node.js:** 
     ```bash
     npx serve .
     # or
     npx http-server
     ```
   - **Using Python 3:**
     ```bash
     python3 -m http.server 8000
     ```

3. **Open in Browser:**
   Navigate to `http://localhost:8000` (or the port provided by your server).

4. **Controls:**
   - **Left/Right Arrow Keys:** Move the ship.
   - **Spacebar:** Start game / Shoot / Restart on Game Over.

## 🧪 Testing

This project uses **Vitest** for its test suite, heavily utilizing TDD practices for core game logic.

1. Install development dependencies:
   ```bash
   npm install
   ```

2. Run the test suite:
   ```bash
   npm test
   ```
   *Tests cover core entities (`Entity`, `Player`, `Enemy`, `Bullet`) and the `Game` engine's state management, collision, and scoring logic.*

## 📁 Project Structure

```
├── index.html        # Main HTML file containing the canvas
├── style.css         # Basic styling and centering
├── package.json      # Dependencies and npm scripts
├── tests/            # Vitest unit test files
│   ├── Bullet.test.js
│   ├── Enemy.test.js
│   ├── Game.test.js
│   └── Player.test.js
└── src/              # Game source code
    ├── main.js       # Entry point
    ├── engine/
    │   ├── AudioManager.js  # Web Audio API sound generator
    │   └── Game.js          # Core game loop, collisions, state machine
    └── entities/
        ├── Bullet.js        # Player projectile
        ├── Enemy.js         # Enemy AI and state machine
        ├── EnemyBullet.js   # Enemy projectile
        ├── Entity.js        # Base class for all game objects
        ├── Particle.js      # Explosion visual effects
        ├── Player.js        # Player ship logic
        └── Starfield.js     # Scrolling background effect
```
