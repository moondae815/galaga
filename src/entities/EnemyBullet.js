import { Entity } from './Entity.js';

export class EnemyBullet extends Entity {
    constructor(x, y, speedY = 5) {
        const width = 4;
        const height = 10;
        super(x, y, width, height, speedY);
    }

    update(deltaTime, screenHeight = 800) {
        const speedMultiplier = deltaTime / 16.67;
        this.y += this.speed * speedMultiplier;

        // Deactivate if it goes off-screen (bottom)
        if (this.y > screenHeight) {
            this.active = false;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#ff00ff'; // Distinctive purple/pink for enemy bullets
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
