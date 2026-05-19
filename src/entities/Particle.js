export class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.active = true;

        // Random direction and speed
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 0.15 + 0.05; // speed per ms
        this.vx = Math.cos(angle) * velocity;
        this.vy = Math.sin(angle) * velocity;

        this.size = Math.random() * 3 + 2;
        this.alpha = 1.0;
        this.decay = Math.random() * 0.002 + 0.001; // alpha decay per ms
    }

    update(deltaTime) {
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;

        this.alpha -= this.decay * deltaTime;
        if (this.alpha <= 0) {
            this.alpha = 0;
            this.active = false;
        }

        // Slightly shrink
        this.size *= (1 - 0.001 * deltaTime);
    }

    draw(ctx) {
        if (!this.active) return;

        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.restore();
    }
}
