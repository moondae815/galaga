# Stage System and Title Screen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a game state management system (START, PLAY, GAMEOVER) and a stage progression system.

**Architecture:** Use a `gameState` string to control the game flow and a `currentStage` counter to manage difficulty and enemy respawning. Update `update()` and `draw()` methods to handle these states.

**Tech Stack:** Vanilla JavaScript (ES6 Modules), HTML5 Canvas.

---

### Task 1: Add Game States and Stage Properties

**Files:**
- Modify: `src/engine/Game.js`

- [ ] **Step 1: Update constructor with initial state**
Add `this.gameState = 'START'` and `this.currentStage = 1` to the constructor. Remove `this.isGameOver`.

```javascript
        this.score = 0;
        this.highScore = this.loadHighScore();
        this.gameState = 'START'; // Changed from isGameOver
        this.currentStage = 1;
        this.lastTime = 0;
```

- [ ] **Step 2: Update update() to use gameState**
Replace `if (this.isGameOver) return;` with `if (this.gameState !== 'PLAY') return;`.

- [ ] **Step 3: Update collision check to set gameState**
Change `this.isGameOver = true;` to `this.gameState = 'GAMEOVER';`.

- [ ] **Step 4: Update draw() to use gameState**
Replace `if (this.isGameOver)` check with `if (this.gameState === 'GAMEOVER')`.

- [ ] **Step 5: Commit changes**
```bash
git add src/engine/Game.js
git commit -m "refactor: replace isGameOver with gameState"
```

### Task 2: Implement Title Screen

**Files:**
- Modify: `src/engine/Game.js`

- [ ] **Step 1: Modify draw() for START state**
Add logic to draw the title screen when `this.gameState === 'START'`.

```javascript
        // Draw Game Over or Title Screen
        if (this.gameState === 'START') {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
            this.ctx.fillRect(0, 0, this.width, this.height);

            this.ctx.fillStyle = '#ffff00';
            this.ctx.font = 'bold 50px "Courier New", Courier, monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('GALAGA CLONE', this.width / 2, this.height / 2 - 20);
            
            this.ctx.fillStyle = 'white';
            this.ctx.font = '24px "Courier New", Courier, monospace';
            this.ctx.fillText('PRESS SPACE TO START', this.width / 2, this.height / 2 + 40);
        } else if (this.gameState === 'GAMEOVER') {
            // Existing Game Over logic...
        }
```

- [ ] **Step 2: Modify initInput() for Space key**
Transition to 'PLAY' state when 'Space' is pressed in 'START' state.

```javascript
    initInput() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            if (e.code === 'Space' && this.gameState === 'START') {
                this.gameState = 'PLAY';
            }
        });
        // ...
    }
```

- [ ] **Step 3: Commit changes**
```bash
git add src/engine/Game.js
git commit -m "feat: add title screen and start game transition"
```

### Task 3: Implement Stage Progression

**Files:**
- Modify: `src/engine/Game.js`

- [ ] **Step 1: Add nextStage() method**
Increment `currentStage` and recreate enemy formation.

```javascript
    nextStage() {
        this.currentStage++;
        this.enemies = [];
        this.bullets = [];
        this.createFormation();
    }
```

- [ ] **Step 2: Update update() for stage transition**
Check if all enemies are defeated and trigger `nextStage()`.

```javascript
        // 3. Filter inactive entities
        this.bullets = this.bullets.filter(bullet => bullet.active);
        this.enemies = this.enemies.filter(enemy => enemy.active);

        // Stage transition check
        if (this.gameState === 'PLAY' && this.enemies.length === 0) {
            this.nextStage();
        }
```

- [ ] **Step 3: Add Stage UI**
Display current stage in the top right corner.

```javascript
        // 4. STAGE (Right Top)
        this.ctx.textAlign = 'right';
        this.ctx.fillStyle = '#00ffff';
        this.ctx.fillText('STAGE', this.width - uiPadding, 10);
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(this.currentStage.toString(), this.width - uiPadding, 30);
```

- [ ] **Step 4: Commit changes**
```bash
git add src/engine/Game.js
git commit -m "feat: add stage progression system"
```
