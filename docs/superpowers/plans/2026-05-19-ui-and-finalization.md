# Galaga Task 8: UI(Score, State) and Finalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the game by adding high score persistence, improving UI layout, and fine-tuning gameplay balance.

**Architecture:** Use `localStorage` for data persistence. Enhance `Game.draw()` to render a structured UI (Score, High Score, Lives) directly on the canvas. Adjust `Enemy.js` and `Game.js` constants for better gameplay feel.

**Tech Stack:** Vanilla JavaScript, HTML5 Canvas, CSS3.

---

### Task 1: High Score Persistence and Initialization

**Files:**
- Modify: `src/engine/Game.js`

- [ ] **Step 1: Implement high score loading in constructor**

```javascript
// In constructor
this.highScore = parseInt(localStorage.getItem('galaga_high_score')) || 0;
```

- [ ] **Step 2: Add logic to update high score**

```javascript
// In checkCollisions or update
if (this.score > this.highScore) {
    this.highScore = this.score;
    localStorage.setItem('galaga_high_score', this.highScore.toString());
}
```

- [ ] **Step 3: Update high score on Game Over**

```javascript
// Ensure it's saved when game ends
if (this.isGameOver && this.score > this.highScore) {
    this.highScore = this.score;
    localStorage.setItem('galaga_high_score', this.highScore.toString());
}
```

- [ ] **Step 4: Commit**

```bash
git add src/engine/Game.js
git commit -m "feat: add high score persistence using localStorage"
```

### Task 2: UI Layout and Drawing Improvement

**Files:**
- Modify: `src/engine/Game.js`
- Modify: `style.css`

- [ ] **Step 1: Improve Canvas styling in CSS**

```css
#gameCanvas {
    background-color: #000;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    border: 2px solid #333; /* Added border */
    display: block;
}
```

- [ ] **Step 2: Update `Game.draw()` for structured UI**
- Left Top: `SCORE`
- Center Top: `HIGH SCORE`
- Right Bottom: `LIFE` (Draw a small ship icon)

```javascript
draw() {
    // ... clear and draw entities ...

    // UI Styles
    this.ctx.fillStyle = 'white';
    this.ctx.font = '18px "Courier New", Courier, monospace';
    this.ctx.textAlign = 'left';

    // 1. SCORE (Left Top)
    this.ctx.fillStyle = '#ff0000'; // Red for labels
    this.ctx.fillText('1UP', 20, 25);
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(this.score.toString().padStart(6, '0'), 20, 45);

    // 2. HIGH SCORE (Center Top)
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = '#ff0000';
    this.ctx.fillText('HIGH SCORE', this.width / 2, 25);
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(this.highScore.toString().padStart(6, '0'), this.width / 2, 45);

    // 3. LIFE (Right Bottom)
    // Since lives = 1, just draw one small ship
    const lifeX = this.width - 50;
    const lifeY = this.height - 40;
    const lifeSize = 20;
    
    this.ctx.fillStyle = '#00ff00';
    this.ctx.beginPath();
    this.ctx.moveTo(lifeX + lifeSize / 2, lifeY);
    this.ctx.lineTo(lifeX, lifeY + lifeSize);
    this.ctx.lineTo(lifeX + lifeSize, lifeY + lifeSize);
    this.ctx.closePath();
    this.ctx.fill();
    
    this.ctx.fillStyle = 'white';
    this.ctx.font = '14px Arial';
    this.ctx.textAlign = 'right';
    this.ctx.fillText('LIFE', this.width - 20, this.height - 15);
}
```

- [ ] **Step 3: Update Game Over Screen UI**

```javascript
if (this.isGameOver) {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.fillStyle = '#ff0000';
    this.ctx.font = 'bold 50px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('GAME OVER', this.width / 2, this.height / 2 - 20);
    
    this.ctx.fillStyle = 'white';
    this.ctx.font = '25px Arial';
    this.ctx.fillText(`FINAL SCORE: ${this.score}`, this.width / 2, this.height / 2 + 40);
    
    if (this.score >= this.highScore && this.score > 0) {
        this.ctx.fillStyle = '#ffff00';
        this.ctx.fillText('NEW HIGH SCORE!', this.width / 2, this.height / 2 + 80);
    }

    this.ctx.fillStyle = '#aaa';
    this.ctx.font = '18px Arial';
    this.ctx.fillText('Press F5 to Restart', this.width / 2, this.height / 2 + 130);
}
```

- [ ] **Step 4: Commit**

```bash
git add src/engine/Game.js style.css
git commit -m "feat: improve UI layout and Game Over screen"
```

### Task 3: Gameplay Balance Fine-tuning

**Files:**
- Modify: `src/entities/Enemy.js`
- Modify: `src/engine/Game.js`

- [ ] **Step 1: Increase enemy attack frequency in `src/entities/Enemy.js`**

```javascript
// Increase probability from 0.0002 to 0.0005 for more action
if (Math.random() < 0.0005) {
    this.state = 'ATTACKING';
}
```

- [ ] **Step 2: Adjust enemy attack speed**

```javascript
// In update(), increase attack descent speed
this.y += speedPerMs * 2.0 * deltaTime; // from 1.5 to 2.0
```

- [ ] **Step 3: Review player shoot cooldown in `src/entities/Player.js`**
- Adjust if needed (currently 250ms seems fine, but can be slightly reduced to 200ms for snappier feel).

- [ ] **Step 4: Commit**

```bash
git add src/entities/Enemy.js src/engine/Game.js
git commit -m "tuning: adjust enemy attack frequency and speed for better balance"
```
