# Enemy Movement Refactoring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor enemy movement to be frame-rate independent using `deltaTime` and ensure smoother return to formation.

**Architecture:** Apply `deltaTime` to all movement calculations in `ATTACKING` and `RETURNING` states. Use a proportional approach (or Lerp) for horizontal movement when returning to formation to avoid abrupt snapping.

**Tech Stack:** JavaScript (ES6 Modules)

---

### Task 1: Apply Delta Time to ATTACKING State

**Files:**
- Modify: `src/entities/Enemy.js`

- [ ] **Step 1: Modify update() method for ATTACKING state**
    Update vertical and horizontal movement to multiply by `deltaTime`. Since `this.speed` is 2, and `deltaTime` is in ms (typically ~16.6ms for 60fps), I should adjust the speed factors accordingly. In `IDLE` state, `oscillationSpeed` is 0.002, so it seems `deltaTime` is indeed in ms.

```javascript
// Current ATTACKING logic:
this.y += this.speed * 1.5;
// ...
this.x += Math.sign(diffX) * 1.5;
```

Updated code:
```javascript
} else if (this.state === 'ATTACKING') {
    // Move down faster - applying deltaTime
    // Adjusting factor: 1.5 / 16.6 approx 0.09. 
    // Wait, if speed is 2 pixels per frame (assuming 60fps), 
    // then speed per ms is 2 / 16.67 = 0.12.
    // Let's keep it simple: this.speed * factor * (deltaTime / 16.67) 
    // or just use a constant speed per ms.
    // Let's assume speed 2 means 2 pixels at 60fps.
    const speedPerMs = this.speed / 16.67;
    this.y += speedPerMs * 1.5 * deltaTime;

    // Slight tracking of player
    if (playerX !== undefined) {
        const centerX = this.x + this.width / 2;
        const diffX = playerX - centerX;
        if (Math.abs(diffX) > 5) {
            this.x += Math.sign(diffX) * speedPerMs * 0.75 * deltaTime;
        }
    }
    // ...
```

- [ ] **Step 2: Commit changes**

```bash
git add src/entities/Enemy.js
git commit -m "refactor: apply deltaTime to enemy ATTACKING state"
```

### Task 2: Apply Delta Time and Smoother Return to RETURNING State

**Files:**
- Modify: `src/entities/Enemy.js`

- [ ] **Step 1: Modify update() method for RETURNING state**
    Use `deltaTime` for vertical movement and implement a smoother horizontal return using a factor of the distance (Lerp-like).

```javascript
// Current RETURNING logic:
this.y += this.speed;
const diffX = this.baseX - this.x;
if (Math.abs(diffX) < 2) {
    this.x = this.baseX;
} else {
    this.x += Math.sign(diffX) * 2;
}
```

Updated code:
```javascript
} else if (this.state === 'RETURNING') {
    const speedPerMs = this.speed / 16.67;
    // Move down to original position
    this.y += speedPerMs * deltaTime;

    // Return to baseX with smoother movement (Lerp-like)
    const diffX = this.baseX - this.x;
    if (Math.abs(diffX) < 1) {
        this.x = this.baseX;
    } else {
        // Move 10% of the distance per frame (at 60fps)
        const lerpFactor = 1 - Math.pow(0.9, deltaTime / 16.67);
        this.x += diffX * lerpFactor;
    }

    // Once reached original formation Y, go back to IDLE
    if (this.y >= this.baseY) {
        this.y = this.baseY;
        this.x = this.baseX;
        this.state = 'IDLE';
    }
}
```

- [ ] **Step 2: Commit changes**

```bash
git add src/entities/Enemy.js
git commit -m "refactor: apply deltaTime and smoother return to enemy RETURNING state"
```

### Task 3: Verification

- [ ] **Step 1: Verify logic consistency**
    Ensure `deltaTime` is consistently used.
- [ ] **Step 2: Run any existing tests**
    (Check for tests first)
