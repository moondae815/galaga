# 갤러그 클론 (Galaga Clone)

바닐라 자바스크립트(ES6+), HTML5 Canvas API, 그리고 Web Audio API를 사용하여 처음부터 직접 만든 클래식 아케이드 갤러그 클론 게임입니다. 이 프로젝트는 테스트 주도 개발(TDD)과 객체 지향 프로그래밍(OOP) 원칙을 강력하게 강조하여 개발되었습니다.

## 🎮 주요 기능

- **무한 스테이지:** 모든 적군을 제거하면 다음 스테이지로 진행합니다. 스테이지가 올라갈수록 적군의 속도, 공격 빈도, 미사일 속도가 증가하여 난이도가 상승합니다.
- **역동적인 적군 AI:** 적군들은 화면 밖에서 부드러운 베지어 곡선(Bezier curve) 궤적을 그리며 날아와 대열을 형성합니다. 대열 형성 후 주기적으로 이탈하여 플레이어를 향해 급강하하며 미사일을 발사합니다.
- **라이프 및 리스폰 시스템:** 3개의 목숨(Life)으로 시작합니다. 피격 시 2초간 무적 상태(깜빡임 효과)가 부여되며, 공격 중이던 적군들을 강제로 대열로 복귀시켜 플레이어가 전열을 가다듬을 기회를 제공합니다.
- **시각적 효과 (VFX):** 화려한 폭발 파편을 구현한 커스텀 파티클 시스템과, 플레이어 피격 또는 보스 파괴 시 화면이 진동하는 카메라 쉐이크(Screen Shake) 효과가 적용되었습니다.
- **레트로 사운드:** 미사일 발사, 폭발, 게임 오버, 시작 등의 효과음은 외부 오디오 파일 없이 Web Audio API를 사용하여 코드만으로 합성해 레트로한 8비트 감성을 살렸습니다.
- **최고 점수 저장:** 플레이어의 최고 점수는 브라우저의 `localStorage`에 자동 저장되어 게임을 다시 실행해도 유지됩니다.
- **프레임 독립성 (Delta Time):** 전체 게임 루프에 `deltaTime`을 적용하여, 모니터 주사율(Refresh Rate)에 상관없이 항상 일정한 속도로 게임이 동작하도록 설계되었습니다.

## 🛠️ 기술 스택

- **언어:** JavaScript (ES6+)
- **그래픽:** HTML5 `<canvas>`
- **오디오:** Web Audio API (`AudioContext`, `OscillatorNode`)
- **테스트:** [Vitest](https://vitest.dev/) (with `jsdom` environment)

## 🚀 실행 방법

이 프로젝트는 ES 모듈(`<script type="module">`)을 사용하므로, 브라우저의 CORS 정책 제한으로 인해 `index.html` 파일을 더블 클릭하여 바로 실행할 수 없습니다. 로컬 웹 서버를 통해 실행해야 합니다.

1. **저장소 클론:**
   ```bash
   git clone <repository-url>
   cd galaga
   ```

2. **프로젝트 서빙 (웹 서버 실행):**
   사용 가능한 아무 로컬 웹 서버나 사용하실 수 있습니다. 예시:
   - **Node.js 사용 시:** 
     ```bash
     npx serve .
     # 또는
     npx http-server
     ```
   - **Python 3 사용 시:**
     ```bash
     python3 -m http.server 8000
     ```

3. **브라우저에서 열기:**
   웹 브라우저를 열고 `http://localhost:8000` (또는 서버가 제공하는 포트)으로 접속합니다.

4. **조작 방법:**
   - **왼쪽/오른쪽 화살표 키 (← / →):** 우주선 이동
   - **스페이스바 (Space):** 게임 시작 / 미사일 발사 / 게임 오버 시 재시작

## 🧪 테스트 실행

이 프로젝트는 핵심 게임 로직에 대해 TDD(테스트 주도 개발) 방식을 적극적으로 활용하였으며, 테스트 스위트로 **Vitest**를 사용합니다.

1. 개발 의존성 패키지 설치:
   ```bash
   npm install
   ```

2. 테스트 실행:
   ```bash
   npm test
   ```
   *작성된 테스트들은 핵심 엔티티(`Entity`, `Player`, `Enemy`, `Bullet`)의 동작과 `Game` 엔진의 상태 관리, 충돌 판정, 점수 로직 등을 검증합니다.*

## 📁 프로젝트 구조

```
├── index.html        # 캔버스를 포함하는 메인 HTML 파일
├── style.css         # 기본 스타일링 및 중앙 정렬
├── package.json      # 의존성 패키지 및 npm 스크립트
├── tests/            # Vitest 단위 테스트 파일
│   ├── Bullet.test.js
│   ├── Enemy.test.js
│   ├── Game.test.js
│   └── Player.test.js
└── src/              # 게임 소스 코드
    ├── main.js       # 엔트리 포인트
    ├── engine/
    │   ├── AudioManager.js  # Web Audio API 사운드 제네레이터
    │   └── Game.js          # 핵심 게임 루프, 충돌 제어, 상태 머신
    └── entities/
        ├── Bullet.js        # 플레이어 미사일
        ├── Enemy.js         # 적군 AI 및 상태 머신
        ├── EnemyBullet.js   # 적군 미사일
        ├── Entity.js        # 모든 게임 객체의 기본(Base) 클래스
        ├── Particle.js      # 폭발 시각 효과
        ├── Player.js        # 플레이어 우주선 로직
        └── Starfield.js     # 스크롤되는 우주 배경 효과
```