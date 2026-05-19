import { Starfield } from '../entities/Starfield.js';
import { Player } from '../entities/Player.js';

export class Game {
    constructor(canvasId) {
        const canvas = document.getElementById(canvasId);
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        
        this.starfield = new Starfield(this.width, this.height);
        this.player = new Player(this.width, this.height);
        this.bullets = [];
        this.lastTime = 0;
        this.keys = {};

        this.initInput();
    }

    initInput() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    start() {
        this.lastTime = performance.now();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.draw();
        
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    update(deltaTime) {
        this.starfield.update(deltaTime);
        
        const newBullet = this.player.update(deltaTime, this.keys);
        if (newBullet) {
            this.bullets.push(newBullet);
        }

        // Update bullets
        this.bullets.forEach(bullet => bullet.update(deltaTime));

        // Remove inactive bullets
        this.bullets = this.bullets.filter(bullet => bullet.active);
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw starfield
        this.starfield.draw(this.ctx);

        // Draw bullets
        this.bullets.forEach(bullet => bullet.draw(this.ctx));

        // Draw player
        this.player.draw(this.ctx);
    }
}
