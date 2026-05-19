import { Entity } from './Entity.js';

export class Bullet extends Entity {
    constructor(x, y) {
        const width = 4;
        const height = 10;
        const speed = 7; // Pixels per frame at 60fps
        super(x, y, width, height, speed);
    }

    update(deltaTime) {
        const speedMultiplier = deltaTime / 16.67;
        this.y -= this.speed * speedMultiplier;

        // Deactivate if it goes off-screen
        if (this.y + this.height < 0) {
            this.active = false;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
