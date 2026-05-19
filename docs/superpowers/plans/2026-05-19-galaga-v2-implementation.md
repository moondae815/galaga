# 갤러그 고도화: 2차 확장 구현 계획서

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 갤러그 게임에 스테이지 시스템, 라이프, 시각효과(파티클), 사운드 등을 추가하여 완성도를 극대화합니다.

**Architecture:** 기존 클래스 기반 구조를 유지하면서 스테이지 관리 로직과 이펙트 처리 시스템을 확장합니다.

**Tech Stack:** JavaScript (ES6+), HTML5 Canvas API, Web Audio API

---

### Task 1: 스테이지 시스템 및 타이틀 화면 구현

**Files:**
- Modify: `src/engine/Game.js`

- [ ] **Step 1: Game 클래스 상태 관리 추가**
    - `gameState` (START, PLAY, GAMEOVER) 속성 추가
    - `currentStage` 속성 및 스테이지 표시 UI 추가

- [ ] **Step 2: 타이틀 화면 및 스테이지 전환 로직**
    - 시작 전 'PRESS SPACE' 화면 구현
    - `enemies.length === 0`일 때 다음 스테이지로 넘어가는 `nextStage()` 구현

- [ ] **Step 3: Commit**
    ```bash
    git commit -m "feat: 스테이지 시스템 및 타이틀 화면 추가"
    ```

### Task 2: 라이프 시스템 및 리스폰 로직

**Files:**
- Modify: `src/engine/Game.js`
- Modify: `src/entities/Player.js`

- [ ] **Step 1: 라이프 관리 추가**
    - `this.lives = 3` 설정 및 UI 표시 업데이트

- [ ] **Step 2: 피격 시 리스폰 및 무적 처리**
    - 피격 시 즉시 게임오버 대신 라이프 감소 및 `invincible` 상태 적용
    - 무적 상태일 때 기체 깜빡임 연출

- [ ] **Step 3: Commit**
    ```bash
    git commit -m "feat: 라이프 시스템 및 무적 상태 구현"
    ```

### Task 3: 파티클 시스템 및 화면 흔들림

**Files:**
- Create: `src/entities/Particle.js`
- Modify: `src/engine/Game.js`

- [ ] **Step 1: Particle 클래스 구현**
    - 폭발 시 여러 방향으로 튀는 작은 파편들 구현

- [ ] **Step 2: 폭발 시 파티클 생성 및 화면 흔들림 적용**
    - 적군 파괴 시 파티클 생성 로직 추가
    - `shake` 타이머를 이용한 캔버스 오프셋 조정

- [ ] **Step 3: Commit**
    ```bash
    git commit -m "feat: 파티클 효과 및 화면 흔들림 추가"
    ```

### Task 4: 적군 미사일 발사 및 공격 강화

**Files:**
- Modify: `src/entities/Enemy.js`
- Modify: `src/engine/Game.js`

- [ ] **Step 1: 적군 미사일 발사 로직 추가**
    - `ATTACKING` 상태일 때 플레이어를 향해 미사일 발사

- [ ] **Step 2: 스테이지별 난이도 보정**
    - 스테이지가 올라갈수록 발사 확률과 이동 속도 가중치 적용

- [ ] **Step 3: Commit**
    ```bash
    git commit -m "feat: 적군 미사일 공격 및 난이도 조절"
    ```

### Task 5: Web Audio API 효과음 및 마무리

**Files:**
- Create: `src/engine/AudioManager.js`
- Modify: `src/engine/Game.js`

- [ ] **Step 1: AudioManager 구현**
    - `OscillatorNode`를 사용하여 발사 및 폭발 효과음 생성

- [ ] **Step 2: 게임 이벤트에 사운드 연결**
    - 발사, 폭발, 게임오버 시 적절한 사운드 재생

- [ ] **Step 3: 최종 폴리싱 및 Commit**
    ```bash
    git commit -m "feat: 웹 오디오 효과음 추가 및 최종 폴리싱"
    ```
