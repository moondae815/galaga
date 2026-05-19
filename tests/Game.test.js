/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Game } from '../src/engine/Game.js';
import { Player } from '../src/entities/Player.js';

// Setup Mock DOM and AudioContext
beforeEach(() => {
    // Mock LocalStorage
    let store = {};
    vi.spyOn(window.localStorage, 'getItem').mockImplementation((key) => store[key] || null);
    vi.spyOn(window.localStorage, 'setItem').mockImplementation((key, val) => { store[key] = val.toString(); });

    // Mock AudioContext
    window.AudioContext = vi.fn().mockImplementation(() => ({
        state: 'running',
        currentTime: 0,
        createOscillator: vi.fn().mockReturnValue({
            frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn() },
            connect: vi.fn(),
            start: vi.fn(),
            stop: vi.fn(),
        }),
        createGain: vi.fn().mockReturnValue({
            gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn() },
            connect: vi.fn(),
        }),
        resume: vi.fn()
    }));

    // Mock Canvas
    const mockCtx = {
        fillRect: vi.fn(),
        fillText: vi.fn(),
        save: vi.fn(),
        restore: vi.fn(),
        translate: vi.fn(),
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        closePath: vi.fn(),
        fill: vi.fn(),
        arc: vi.fn(),
    };

    const mockCanvas = document.createElement('canvas');
    mockCanvas.width = 600;
    mockCanvas.height = 800;
    mockCanvas.getContext = vi.fn().mockReturnValue(mockCtx);
    
    vi.spyOn(document, 'getElementById').mockReturnValue(mockCanvas);

    // Mock requestAnimationFrame and performance.now
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => setTimeout(cb, 16));
    vi.spyOn(performance, 'now').mockReturnValue(1000);
});

afterEach(() => {
    vi.restoreAllMocks();
});

describe('Game', () => {
    it('should initialize with correct default states', () => {
        const game = new Game('canvasId');
        
        expect(game.score).toBe(0);
        expect(game.lives).toBe(3);
        expect(game.currentStage).toBe(1);
        expect(game.gameState).toBe('START');
        expect(game.enemies.length).toBe(40); // 5 rows * 8 cols
        expect(game.player).toBeInstanceOf(Player);
    });

    it('should reset game correctly', () => {
        const game = new Game('canvasId');
        game.score = 500;
        game.lives = 1;
        game.currentStage = 3;
        game.gameState = 'GAMEOVER';
        
        game.resetGame();
        
        expect(game.score).toBe(0);
        expect(game.lives).toBe(3);
        expect(game.currentStage).toBe(1);
        expect(game.gameState).toBe('PLAY');
        expect(game.enemies.length).toBe(40);
    });

    it('should transition to next stage', () => {
        const game = new Game('canvasId');
        const initialEnemies = game.enemies.length;
        
        game.nextStage();
        
        expect(game.currentStage).toBe(2);
        expect(game.enemies.length).toBe(initialEnemies);
        // Ensure stage is passed to enemies
        expect(game.enemies[0].stage).toBe(2);
    });

    it('should handle player hit correctly', () => {
        const game = new Game('canvasId');
        game.lives = 3;
        
        game.handlePlayerHit();
        
        expect(game.lives).toBe(2);
        expect(game.player.invincible).toBe(true);
        expect(game.player.invincibleTimer).toBe(2000);
        expect(game.gameState).toBe('START'); // It hasn't changed to GAMEOVER
    });

    it('should game over when lives reach 0', () => {
        const game = new Game('canvasId');
        game.lives = 1;
        
        game.handlePlayerHit();
        
        expect(game.lives).toBe(0);
        expect(game.player.active).toBe(false);
        expect(game.gameState).toBe('GAMEOVER');
    });

    it('should save high score when current score exceeds it', () => {
        const game = new Game('canvasId');
        game.highScore = 100;
        game.score = 200;
        
        // Mock a collision manually to trigger score update
        const mockEnemy = { active: true, getBounds: () => ({ x: 0, y: 0, width: 10, height: 10 }), score: 50 };
        const mockBullet = { active: true, getBounds: () => ({ x: 5, y: 5, width: 2, height: 2 }) };
        
        game.enemies = [mockEnemy];
        game.bullets = [mockBullet];
        game.player.active = true;
        game.player.invincible = false;
        
        game.checkCollisions();
        
        expect(game.score).toBe(250); // 200 + 50
        expect(game.highScore).toBe(250);
        expect(localStorage.getItem('galaga_high_score')).toBe('250');
    });
});
