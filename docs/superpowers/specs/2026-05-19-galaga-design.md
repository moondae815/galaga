# 갤러그 게임 구현 설계서 (Classic Galaga Clone)

## 1. 개요
본 프로젝트는 클래식 아케이드 게임 '갤러그(Galaga)'의 핵심 메커니즘을 웹 환경에 맞게 Vanilla JavaScript와 Canvas API를 사용하여 재현하는 것을 목표로 합니다.

## 2. 기술 스택
- **Language:** JavaScript (ES6+)
- **Graphics:** HTML5 Canvas API
- **Architecture:** Class-based Object Oriented Programming (OOP)
- **Assets:** Open Source Game Assets (Images, Sounds)

## 3. 핵심 클래스 구조

### 3.1. Game (Engine)
- **역할:** 게임의 생명주기 관리 및 전체 시스템 조율
- **주요 기능:**
    - `init()`: 캔버스 설정, 이미지/사운드 에셋 프리로드
    - `start()`: 게임 루프(`requestAnimationFrame`) 시작
    - `update()`: 모든 엔티티의 상태 업데이트 및 충돌 감지 로직 실행
    - `draw()`: 화면 클리어 및 모든 엔티티 렌더링 호출
    - `handleInput()`: 키보드 이벤트 리스너 관리

### 3.2. Entity (Base Class)
- **역할:** 모든 게임 객체의 최상위 부모 클래스
- **속성:** `x`, `y`, `width`, `height`, `image`, `speed`
- **메서드:** `update()`, `draw()`, `getBounds()`

### 3.3. Player (extends Entity)
- **역할:** 플레이어 기체 제어
- **주요 기능:**
    - 좌우 이동 제한 (캔버스 경계 내부)
    - 미사일 발사 (연사 속도 제한 포함)
    - 피격 시 폭발 애니메이션 및 라이프 감소

### 3.4. Enemy (extends Entity)
- **역할:** 적군 기체 및 비행 패턴 관리
- **상태 관리:**
    - `ENTERING`: 대열로 진입하는 비행 패턴
    - `IDLE`: 대열 내에서 좌우로 미세하게 움직임
    - `ATTACKING`: 대열을 이탈하여 플레이어를 향해 급강하 공격
- **주요 기능:** 적군 미사일 발사 로직

### 3.5. Bullet (extends Entity)
- **역할:** 플레이어 및 적군의 발사체
- **속성:** `owner` (누가 쏘았는지 구분), `damage`

### 3.6. Starfield (Background)
- **역할:** 우주 배경 효과
- **주요 기능:** 다양한 크기와 속도의 별들이 위에서 아래로 흐르는 시각 효과

## 4. 핵심 메커니즘

### 4.1. 충돌 감지 (Collision Detection)
- **방식:** AABB (Axis-Aligned Bounding Box) 충돌 판정
- **대상:**
    - 플레이어 미사일 ↔ 적군 기체
    - 적군 미사일 ↔ 플레이어 기체
    - 적군 기체 ↔ 플레이어 기체 (충돌 시 둘 다 파괴)

### 4.2. 적군 생성 및 대열 (Formation)
- 적군은 특정 웨이브마다 정해진 대열 위치를 가집니다.
- 진입 시 곡선을 그리며 자신의 대열 위치로 이동합니다.

### 4.3. 점수 및 레벨 시스템
- 적군 종류 및 상태(대열 내 vs 공격 중)에 따른 차등 점수 부여
- 모든 적군 제거 시 다음 스테이지로 전환 (난이도 증가)

## 5. 사용자 인터페이스 (UI)
- **HUD:** 상단에 현재 점수(Score)와 하이 스코어 표시
- **Life:** 하단에 남은 기체 수 표시
- **Screen:** 시작 화면(Start), 게임 화면(Play), 게임 오버 화면(Game Over)

## 6. 에셋 관리 계획
- 외부 이미지/사운드 파일의 로딩 완료를 확인하는 `AssetLoader` 구현
- 로딩 중에는 'Loading...' 메시지 표시
