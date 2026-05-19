import { describe, it, expect } from 'vitest';
import { Player } from '../src/entities/Player.js';
import { Bullet } from '../src/entities/Bullet.js';

describe('Player', () => {
    it('should initialize at the bottom center of the canvas', () => {
        const player = new Player(600, 800);
        expect(player.x).toBe((600 - 40) / 2);
        expect(player.y).toBe(800 - 40 - 20);
        expect(player.invincible).toBe(false);
    });

    it('should move left and right based on input keys', () => {
        const player = new Player(600, 800);
        const initialX = player.x;
        
        // Move Left
        player.update(16.67, { 'ArrowLeft': true });
        expect(player.x).toBeLessThan(initialX);
        expect(player.x).toBeCloseTo(initialX - player.speed, 1);

        // Move Right
        const newX = player.x;
        player.update(16.67, { 'ArrowRight': true });
        expect(player.x).toBeGreaterThan(newX);
        expect(player.x).toBeCloseTo(initialX, 1);
    });

    it('should not move past canvas boundaries', () => {
        const player = new Player(600, 800);
        player.x = 2; // close to left edge
        
        // Move Left past edge
        player.update(16.67, { 'ArrowLeft': true });
        expect(player.x).toBe(0);

        player.x = 600 - 40 - 2; // close to right edge
        
        // Move Right past edge
        player.update(16.67, { 'ArrowRight': true });
        expect(player.x).toBe(600 - 40);
    });

    it('should shoot a bullet when space is pressed and cooldown is met', () => {
        const player = new Player(600, 800);
        
        // Initial cooldown might not be met, let's fast forward
        player.shootTimer = 200;
        
        const bullet = player.update(16.67, { 'Space': true });
        expect(bullet).toBeInstanceOf(Bullet);
        expect(player.shootTimer).toBeLessThan(200); // reduced by cooldown
    });

    it('should not shoot if cooldown is not met', () => {
        const player = new Player(600, 800);
        player.shootTimer = 0; // Cooldown not met
        
        const bullet = player.update(16.67, { 'Space': true });
        expect(bullet).toBeNull();
    });

    it('should handle invincibility timer correctly', () => {
        const player = new Player(600, 800);
        player.invincible = true;
        player.invincibleTimer = 100;

        player.update(50, {});
        expect(player.invincibleTimer).toBe(50);
        expect(player.invincible).toBe(true);

        player.update(50, {});
        expect(player.invincibleTimer).toBe(0);
        expect(player.invincible).toBe(false);
    });
});
