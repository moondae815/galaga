import { Starfield } from '../entities/Starfield.js';

export class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        this.starfield = new Starfield(this.width, this.height);
        this.lastTime = 0;
    }

    start() {
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop(timestamp) {
        // Delta time could be used here for smoother frame rate independent movement
        this.update();
        this.draw();
        
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    update() {
        this.starfield.update();
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw starfield
        this.starfield.draw(this.ctx);
    }
}
