# Collision Detection and Enemy Destruction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement collision detection between player missiles and enemies, removing destroyed enemies and updating the score.

**Architecture:** Use AABB (Axis-Aligned Bounding Box) collision detection in the `Game` class. Update `Enemy` to support an `active` state.

**Tech Stack:** JavaScript (ES6 Modules), Canvas API.

---

### Task 1: Update Enemy Entity

**Files:**
- Modify: `src/entities/Enemy.js`

- [ ] **Step 1: Add `active` property to `Enemy` constructor**
    - Add `this.active = true;` to the constructor.

- [ ] **Step 2: Commit changes**
    ```bash
    git add src/entities/Enemy.js
    git commit -m "feat: add active state to Enemy"
    ```

### Task 2: Implement Collision Detection in Game class

**Files:**
- Modify: `src/engine/Game.js`

- [ ] **Step 1: Initialize score in constructor**
    - Add `this.score = 0;` in `Game.constructor`.

- [ ] **Step 2: Implement `checkCollisions()` method**
    - Add `checkCollisions()` method to `Game` class.
    - Use AABB logic to check `this.bullets` against `this.enemies`.
    - If collision detected: `bullet.active = false`, `enemy.active = false`, `this.score += enemy.score`.

- [ ] **Step 3: Call `checkCollisions()` in `update()`**
    - Call `this.checkCollisions()` in the `update()` method.

- [ ] **Step 4: Filter out inactive enemies in `update()`**
    - Update the enemy update logic to filter out inactive enemies.

- [ ] **Step 5: Draw score in `draw()`**
    - Add code to draw the score at the top of the canvas.

- [ ] **Step 6: Commit changes**
    ```bash
    git add src/engine/Game.js
    git commit -m "feat: implement collision detection and score tracking"
    ```
