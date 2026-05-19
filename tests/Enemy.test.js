import { describe, it, expect } from 'vitest';
import { Enemy, ENEMY_TYPES } from '../src/entities/Enemy.js';
import { EnemyBullet } from '../src/entities/EnemyBullet.js';

describe('Enemy', () => {
    it('should initialize with correct properties based on type', () => {
        const enemy = new Enemy(100, 200, 'RED', 1);
        expect(enemy.color).toBe(ENEMY_TYPES.RED.color);
        expect(enemy.score).toBe(ENEMY_TYPES.RED.score);
        expect(enemy.state).toBe('ENTERING');
        expect(enemy.baseX).toBe(100);
        expect(enemy.baseY).toBe(200);
    });

    it('should scale difficulty multiplier correctly based on stage', () => {
        const stage1Enemy = new Enemy(100, 200, 'BLUE', 1);
        const stage2Enemy = new Enemy(100, 200, 'BLUE', 2);
        
        expect(stage2Enemy.speed).toBeGreaterThan(stage1Enemy.speed);
        expect(stage2Enemy.oscillationSpeed).toBeGreaterThan(stage1Enemy.oscillationSpeed);
        expect(stage2Enemy.attackProbability).toBeGreaterThan(stage1Enemy.attackProbability);
        expect(stage2Enemy.shootInterval).toBeLessThan(stage1Enemy.shootInterval);
    });

    it('should oscillate when in IDLE state', () => {
        const enemy = new Enemy(100, 200, 'BLUE', 1);
        enemy.state = 'IDLE';
        enemy.x = enemy.baseX;
        enemy.y = enemy.baseY;
        enemy.oscillationAngle = 0; // Fix angle for deterministic test
        
        enemy.update(16.67, 300, 800);
        // Angle increases -> sin(angle) > 0 -> x > baseX
        expect(enemy.x).toBeGreaterThan(100);
        expect(enemy.y).toBe(200); // y shouldn't change in IDLE
    });

    it('should transition to ATTACKING state with probability', () => {
        const enemy = new Enemy(100, 200, 'BLUE', 1);
        enemy.state = 'IDLE';
        enemy.x = enemy.baseX;
        enemy.y = enemy.baseY;
        enemy.attackProbability = 1.0; // Force attack
        
        enemy.update(16.67, 300, 800);
        expect(enemy.state).toBe('ATTACKING');
        expect(enemy.shootTimer).toBe(enemy.shootInterval * 0.5);
    });

    it('should move down and track player when ATTACKING', () => {
        const enemy = new Enemy(100, 200, 'BLUE', 1);
        enemy.state = 'ATTACKING';
        enemy.x = enemy.baseX;
        enemy.y = enemy.baseY;
        
        const playerX = 300; // Player is to the right
        enemy.update(16.67, playerX, 800);
        
        // Moves down
        expect(enemy.y).toBeGreaterThan(200);
        // Tracks right
        expect(enemy.x).toBeGreaterThan(100);
    });

    it('should shoot while ATTACKING', () => {
        const enemy = new Enemy(100, 200, 'BLUE', 1);
        enemy.state = 'ATTACKING';
        enemy.x = 100;
        enemy.y = 200;
        enemy.shootTimer = 10; // Almost ready to shoot
        
        const firedBullet = enemy.update(16.67, 300, 800);
        expect(firedBullet).toBeInstanceOf(EnemyBullet);
        expect(enemy.shootTimer).toBe(enemy.shootInterval);
    });

    it('should transition to RETURNING if moves off screen bottom', () => {
        const enemy = new Enemy(100, 795, 'BLUE', 1);
        enemy.state = 'ATTACKING';
        enemy.x = 100;
        enemy.y = 795;
        
        enemy.update(16.67 * 5, 300, 800); // move past 800
        expect(enemy.state).toBe('RETURNING');
        expect(enemy.y).toBe(-enemy.height); // jumps to top
    });

    it('should move towards baseX and baseY when RETURNING', () => {
        const enemy = new Enemy(100, 200, 'BLUE', 1);
        enemy.state = 'RETURNING';
        enemy.x = 50;
        enemy.y = 150; // Above target 200
        
        enemy.update(16.67, 300, 800);
        expect(enemy.x).toBeGreaterThan(50); // Moved towards 100
        expect(enemy.y).toBeGreaterThan(150); // Moved towards 200
    });

    it('should transition back to IDLE when RETURNING completes', () => {
        const enemy = new Enemy(100, 200, 'BLUE', 1);
        enemy.state = 'RETURNING';
        enemy.x = 99.5; // very close
        enemy.y = 199.5; // very close
        
        // Might need a few frames depending on speed, but let's just force y past target
        enemy.y = 200;
        enemy.update(16.67, 300, 800);
        
        expect(enemy.state).toBe('IDLE');
        expect(enemy.x).toBe(100);
        expect(enemy.y).toBe(200);
    });
});

describe('Enemy Entering Animation', () => {
    it('should initialize with ENTERING state and progress entering path', () => {
        const enemy = new Enemy(100, 200, 'BLUE', 1);
        expect(enemy.state).toBe('ENTERING');
        expect(enemy.enterProgress).toBe(0);
        
        // Initial position should be off-screen
        expect(enemy.y).toBeLessThan(0);
        
        // After update, progress should increase and position should change towards base
        enemy.update(16.67, 300, 800);
        expect(enemy.enterProgress).toBeGreaterThan(0);
    });

    it('should transition to IDLE state when entering is complete', () => {
        const enemy = new Enemy(100, 200, 'BLUE', 1);
        enemy.state = 'ENTERING';
        enemy.enterProgress = 0.99; // Almost complete
        
        // Update enough to push progress >= 1.0
        enemy.update(16.67 * 5, 300, 800);
        
        expect(enemy.enterProgress).toBeGreaterThanOrEqual(1.0);
        expect(enemy.state).toBe('IDLE');
        expect(enemy.x).toBe(enemy.baseX);
        expect(enemy.y).toBe(enemy.baseY);
    });
});
