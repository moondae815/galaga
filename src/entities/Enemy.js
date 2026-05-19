import { Entity } from './Entity.js';

export const ENEMY_TYPES = {
    RED: { color: '#ff0000', score: 100 },
    BLUE: { color: '#0000ff', score: 50 },
    BOSS: { color: '#ff00ff', score: 400 }
};

export class Enemy extends Entity {
    constructor(x, y, type = 'BLUE') {
        const width = 30;
        const height = 30;
        const speed = 2;
        super(x, y, width, height, speed);
        
        this.type = type;
        this.color = ENEMY_TYPES[type]?.color || '#ffffff';
        this.score = ENEMY_TYPES[type]?.score || 0;
        this.state = 'IDLE';
        
        // Oscillation properties
        this.baseX = x;
        this.oscillationAngle = Math.random() * Math.PI * 2;
        this.oscillationSpeed = 0.002;
        this.oscillationRange = 10;
    }

    update(deltaTime) {
        if (this.state === 'IDLE') {
            this.oscillationAngle += this.oscillationSpeed * deltaTime;
            this.x = this.baseX + Math.sin(this.oscillationAngle) * this.oscillationRange;
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
