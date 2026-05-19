export class Starfield {
    constructor(width, height, count = 100) {
        this.width = width;
        this.height = height;
        this.stars = [];
        
        for (let i = 0; i < count; i++) {
            this.stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 1,
                speed: Math.random() * 2 + 0.5
            });
        }
    }

    update(deltaTime) {
        // Adjust speed based on deltaTime (assuming 60fps as base, or just use pixels per ms)
        // Let's use pixels per frame at 60fps as base: speed * (deltaTime / 16.67)
        const speedMultiplier = deltaTime / 16.67;
        
        for (let star of this.stars) {
            star.y += star.speed * speedMultiplier;
            if (star.y > this.height) {
                star.y = 0;
                star.x = Math.random() * this.width;
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        for (let star of this.stars) {
            ctx.fillRect(star.x, star.y, star.size, star.size);
        }
    }
}
