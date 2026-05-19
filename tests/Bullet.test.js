import { describe, it, expect } from 'vitest';
import { Bullet } from '../src/entities/Bullet.js';
import { EnemyBullet } from '../src/entities/EnemyBullet.js';

describe('Bullet', () => {
    it('should initialize with correct properties', () => {
        const bullet = new Bullet(100, 200);
        expect(bullet.x).toBe(100);
        expect(bullet.y).toBe(200);
        expect(bullet.active).toBe(true);
    });

    it('should move upwards based on deltaTime', () => {
        const bullet = new Bullet(100, 200);
        const initialY = bullet.y;
        bullet.update(16.67); // 1 frame at 60fps
        expect(bullet.y).toBeLessThan(initialY);
        expect(bullet.y).toBe(initialY - bullet.speed);
    });

    it('should deactivate when moving off the top of the screen', () => {
        const bullet = new Bullet(100, 5);
        bullet.update(16.67); // Moves up by 7, so y becomes -2
        // Since height is 10, y + height = 8 (still > 0)
        expect(bullet.active).toBe(true);
        
        bullet.update(16.67 * 2); // Move up by 14, y becomes -16
        // y + height = -6 (< 0) -> should deactivate
        expect(bullet.active).toBe(false);
    });
});

describe('EnemyBullet', () => {
    it('should move downwards based on deltaTime', () => {
        const bullet = new EnemyBullet(100, 200, 5);
        const initialY = bullet.y;
        bullet.update(16.67, 800);
        expect(bullet.y).toBeGreaterThan(initialY);
        expect(bullet.y).toBe(initialY + bullet.speed);
    });

    it('should deactivate when moving off the bottom of the screen', () => {
        const screenHeight = 800;
        const bullet = new EnemyBullet(100, 795, 5);
        bullet.update(16.67, screenHeight); // moves down by 5, y becomes 800
        expect(bullet.active).toBe(true); // not strictly > 800 yet, or equals 800

        bullet.update(16.67, screenHeight); // moves down by 5, y becomes 805
        expect(bullet.active).toBe(false); // y > 800
    });
});
