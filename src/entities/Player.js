import { Entity } from './Entity.js';
import { Bullet } from './Bullet.js';

export class Player extends Entity {
    constructor(canvasWidth, canvasHeight) {
        const width = 40;
        const height = 40;
        const x = (canvasWidth - width) / 2;
        const y = canvasHeight - height - 20;
        const speed = 5; // Pixels per frame at 60fps

        super(x, y, width, height, speed);
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.shootCooldown = 250; // ms
        this.shootTimer = 0;
    }

    update(deltaTime, keys) {
        const speedMultiplier = deltaTime / 16.67;
        const currentSpeed = this.speed * speedMultiplier;

        if (keys['ArrowLeft']) {
            this.x -= currentSpeed;
        }
        if (keys['ArrowRight']) {
            this.x += currentSpeed;
        }

        // Screen boundaries
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x + this.width > this.canvasWidth) {
            this.x = this.canvasWidth - this.width;
        }

        // Shooting logic
        this.shootTimer += deltaTime;
        if (keys['Space'] && this.shootTimer >= this.shootCooldown) {
            this.shootTimer = 0;
            return this.shoot();
        }
        return null;
    }
shoot() {
    const bulletX = this.x + this.width / 2 - 2; // Center the bullet (width 4)
    const bulletY = this.y;
    return new Bullet(bulletX, bulletY);
}

draw(ctx) {
    ctx.fillStyle = '#00ff00';

    // Simple ship shape (triangle)
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, this.y);
    ctx.lineTo(this.x, this.y + this.height);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.closePath();
    ctx.fill();
}
}

