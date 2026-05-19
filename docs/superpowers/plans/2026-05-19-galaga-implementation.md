# 갤러그 게임 구현 계획서

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Vanilla JavaScript와 Canvas API를 사용하여 클래식 아케이드 게임인 갤러그를 구현합니다.

**Architecture:** 클래스 기반의 객체 지향 설계를 따르며, Game 엔진을 중심으로 Player, Enemy, Bullet 등의 Entity가 협력하는 구조입니다. 상태 머신을 사용하여 적군의 복잡한 비행 패턴을 관리합니다.

**Tech Stack:** JavaScript (ES6+), HTML5 Canvas API, Vanilla CSS

---

### Task 1: 프로젝트 기초 구조 설정

**Files:**
- Create: `index.html`
- Create: `style.css`
- Create: `src/main.js`

- [ ] **Step 1: HTML 및 CSS 기본 구조 작성**
    - 캔버스(600x800)와 기본 레이아웃 설정

- [ ] **Step 2: main.js에서 캔버스 초기화 확인**
    - 캔버스가 정상적으로 로드되고 배경색(검정)이 칠해지는지 확인

- [ ] **Step 3: Commit**
    ```bash
    git add index.html style.css src/main.js
    git commit -m "chore: 프로젝트 초기 구조 설정"
    ```

### Task 2: Game 엔진 및 Starfield 배경 구현

**Files:**
- Create: `src/engine/Game.js`
- Create: `src/entities/Starfield.js`
- Modify: `src/main.js`

- [ ] **Step 1: Game 클래스 골격 작성**
    - `init`, `start`, `update`, `draw` 메서드 구현 및 `requestAnimationFrame` 루프 설정

- [ ] **Step 2: Starfield 클래스 구현**
    - 무작위 위치에서 아래로 흐르는 별들의 배경 효과 구현

- [ ] **Step 3: 동작 확인**
    - 검은 배경에 별들이 흐르는 애니메이션이 정상 작동하는지 확인

- [ ] **Step 4: Commit**
    ```bash
    git add src/engine/Game.js src/entities/Starfield.js src/main.js
    git commit -m "feat: 게임 엔진 기초 및 별 배경 구현"
    ```

### Task 3: Base Entity 및 Player 구현

**Files:**
- Create: `src/entities/Entity.js`
- Create: `src/entities/Player.js`
- Modify: `src/engine/Game.js`

- [ ] **Step 1: Entity 추상 클래스 작성**
    - 위치, 크기, 속성 관리 및 기본 `draw` 로직

- [ ] **Step 2: Player 클래스 구현**
    - 키보드 입력(좌우)에 따른 이동 및 경계 제한 처리

- [ ] **Step 3: 동작 확인**
    - 화면 하단에서 플레이어 기체(임시 도형)가 좌우 화살표 키로 움직이는지 확인

- [ ] **Step 4: Commit**
    ```bash
    git add src/entities/Entity.js src/entities/Player.js src/engine/Game.js
    git commit -m "feat: 플레이어 기체 및 이동 로직 구현"
    ```

### Task 4: Bullet 및 발사 로직 구현

**Files:**
- Create: `src/entities/Bullet.js`
- Modify: `src/entities/Player.js`
- Modify: `src/engine/Game.js`

- [ ] **Step 1: Bullet 클래스 구현**
    - 위로 날아가는 투사체 로직

- [ ] **Step 2: 플레이어 발사 기능 추가**
    - 스페이스바 입력 시 미사일 생성 및 쿨타임(Cooldown) 처리

- [ ] **Step 3: 동작 확인**
    - 플레이어가 스페이스바를 누를 때 미사일이 위로 발사되는지 확인

- [ ] **Step 4: Commit**
    ```bash
    git add src/entities/Bullet.js src/entities/Player.js src/engine/Game.js
    git commit -m "feat: 플레이어 미사일 발사 기능 구현"
    ```

### Task 5: Enemy 및 대열(Formation) 기초 구현

**Files:**
- Create: `src/entities/Enemy.js`
- Modify: `src/engine/Game.js`

- [ ] **Step 1: Enemy 클래스 구현**
    - 기본 타입 및 상태(IDLE) 관리

- [ ] **Step 2: 대열 생성 로직 추가**
    - 상단에 여러 마리의 적군을 격자 형태로 배치

- [ ] **Step 3: 동작 확인**
    - 화면 상단에 적군 무리가 정상적으로 생성되는지 확인

- [ ] **Step 4: Commit**
    ```bash
    git add src/entities/Enemy.js src/engine/Game.js
    git commit -m "feat: 적군 엔티티 및 기본 대열 생성"
    ```

### Task 6: 충돌 감지 및 파괴 로직

**Files:**
- Modify: `src/engine/Game.js`
- Modify: `src/entities/Enemy.js`

- [ ] **Step 1: AABB 충돌 알고리즘 구현**
    - `Game.update` 루프에서 미사일과 적군의 충돌 판정

- [ ] **Step 2: 파괴 애니메이션(임시) 및 제거 로직**
    - 충돌 시 적군과 미사일이 화면에서 제거되도록 처리

- [ ] **Step 3: 동작 확인**
    - 미사일로 적군을 맞추었을 때 적군이 사라지는지 확인

- [ ] **Step 4: Commit**
    ```bash
    git add src/engine/Game.js src/entities/Enemy.js
    git commit -m "feat: 충돌 감지 및 적군 제거 로직 구현"
    ```

### Task 7: 적군 공격 패턴 및 게임 오버

**Files:**
- Modify: `src/entities/Enemy.js`
- Modify: `src/engine/Game.js`

- [ ] **Step 1: 급강하(Diving) 패턴 구현**
    - 일정 확률로 적군이 플레이어를 향해 곡선/직선으로 돌진

- [ ] **Step 2: 게임 오버 상태 구현**
    - 적군과 플레이어 충돌 시 게임 종료 처리

- [ ] **Step 3: 동작 확인**
    - 적군이 공격을 해오고, 충돌 시 게임이 멈추는지 확인

- [ ] **Step 4: Commit**
    ```bash
    git add src/entities/Enemy.js src/engine/Game.js
    git commit -m "feat: 적군 공격 패턴 및 게임 오버 처리"
    ```

### Task 8: UI(점수, 상태) 및 마무리

**Files:**
- Modify: `src/engine/Game.js`
- Modify: `style.css`

- [ ] **Step 1: 점수 시스템 구현**
    - 적군 파괴 시 점수 가산 및 HUD 표시

- [ ] **Step 2: 최종 점검 및 코드 정리**
    - 전체적인 게임 밸런스 조정 및 리팩토링

- [ ] **Step 3: Commit**
    ```bash
    git add src/engine/Game.js style.css
    git commit -m "feat: 점수 시스템 추가 및 최종 마무리"
    ```
