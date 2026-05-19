# Task 5: Web Audio API 효과음 및 마무리 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 별도의 오디오 파일 없이 Web Audio API를 사용하여 게임에 생동감을 더하는 효과음을 추가하고 최종 마무리를 합니다.

**Architecture:** Web Audio API를 사용하는 `AudioManager` 클래스를 싱글톤 형태로 관리하거나 `Game` 클래스에서 인스턴스화하여 사용합니다. 브라우저의 오디오 정책을 준수하기 위해 사용자 상호작용 후 `AudioContext`를 활성화합니다.

**Tech Stack:** JavaScript (ES6 Modules), Web Audio API

---

### Task 1: AudioManager 구현

**Files:**
- Create: `src/engine/AudioManager.js`

- [ ] **Step 1: AudioManager 클래스 작성**

```javascript
export class AudioManager {
    constructor() {
        this.ctx = null;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
        } catch (e) {
            console.warn('Web Audio API is not supported in this browser', e);
        }
    }

    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playShootSound() {
        if (!this.ctx || this.ctx.state === 'suspended') return;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(880, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }

    playExplosionSound() {
        if (!this.ctx || this.ctx.state === 'suspended') return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.2);

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);
    }

    playGameOverSound() {
        if (!this.ctx || this.ctx.state === 'suspended') return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 1);

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 1);
    }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/engine/AudioManager.js
git commit -m "feat: AudioManager 클래스 추가 (Web Audio API)"
```

---

### Task 2: Game 클래스에 AudioManager 통합

**Files:**
- Modify: `src/engine/Game.js`

- [ ] **Step 1: AudioManager 임포트 및 초기화**

- [ ] **Step 2: 사운드 재생 코드 삽입**

- [ ] **Step 3: Commit**

```bash
git add src/engine/Game.js
git commit -m "feat: Game 클래스에 AudioManager 통합"
```

---

### Task 3: 최종 폴리싱 및 검증

**Files:**
- Modify: `src/engine/Game.js`
- Modify: `src/entities/Enemy.js` (필요시)

- [ ] **Step 1: 게임 밸런스 조정**

- [ ] **Step 2: 최종 확인 및 Commit**

```bash
git add .
git commit -m "chore: 최종 밸런싱 및 폴리싱"
```
