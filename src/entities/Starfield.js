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

    update() {
        for (let star of this.stars) {
            star.y += star.speed;
            if (star.y > this.height) {
                star.y = 0;
                star.x = Math.random() * this.width;
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        for (let star of this.stars) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
