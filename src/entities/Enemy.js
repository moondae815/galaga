import { Entity } from './Entity.js';

export const ENEMY_TYPES = {
    RED: { color: '#ff0000', score: 100 },
    BLUE: { color: '#0000ff', score: 50 },
    BOSS: { color: '#ff00ff', score: 400 }
};

export class Enemy extends Entity {
    constructor(x, y, type = 'BLUE', stage = 1) {
        const width = 30;
        const height = 30;
        
        // Scale speed based on stage (e.g., +10% per stage after 1)
        const difficultyMultiplier = 1 + (stage - 1) * 0.1;
        const speed = 2 * difficultyMultiplier;
        
        super(x, y, width, height, speed);
        
        this.type = type;
        this.stage = stage;
        this.color = ENEMY_TYPES[type]?.color || '#ffffff';
        this.score = ENEMY_TYPES[type]?.score || 0;
        this.state = 'IDLE';
        
        // Oscillation properties - scaled by difficulty
        this.baseX = x;
        this.baseY = y;
        this.oscillationAngle = Math.random() * Math.PI * 2;
        this.oscillationSpeed = 0.002 * difficultyMultiplier;
        this.oscillationRange = 10 * Math.min(2, difficultyMultiplier);
        
        // Attack probability - increases with stage
        this.attackProbability = 0.0005 + (stage - 1) * 0.0002;
    }

    update(deltaTime, playerX, screenHeight) {
        if (this.state === 'IDLE') {
            this.oscillationAngle += this.oscillationSpeed * deltaTime;
            this.x = this.baseX + Math.sin(this.oscillationAngle) * this.oscillationRange;

            if (Math.random() < this.attackProbability) {
                this.state = 'ATTACKING';
            }
        } else if (this.state === 'ATTACKING') {
            // Move down faster - applying deltaTime
            const speedPerMs = this.speed / 16.67;
            this.y += speedPerMs * 2.0 * deltaTime;

            // Slight tracking of player
            if (playerX !== undefined) {
                const centerX = this.x + this.width / 2;
                const diffX = playerX - centerX;
                if (Math.abs(diffX) > 5) {
                    this.x += Math.sign(diffX) * speedPerMs * 0.75 * deltaTime;
                }
            }

            // If off screen, start returning from top
            if (this.y > (screenHeight || 800)) {
                this.y = -this.height;
                this.state = 'RETURNING';
            }
        } else if (this.state === 'RETURNING') {
            const speedPerMs = this.speed / 16.67;
            // Move down to original position
            this.y += speedPerMs * deltaTime;

            // Return to baseX with smoother movement (Lerp-like)
            const diffX = this.baseX - this.x;
            if (Math.abs(diffX) < 1) {
                this.x = this.baseX;
            } else {
                // Move a portion of the distance per frame (at 60fps)
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
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        
        // Draw a simple box shape for now
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Small details to make it look like an enemy
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x + 5, this.y + 5, 5, 5);
        ctx.fillRect(this.x + this.width - 10, this.y + 5, 5, 5);
    }
}
