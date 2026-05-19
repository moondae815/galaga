import { Starfield } from '../entities/Starfield.js';
import { Player } from '../entities/Player.js';
import { Enemy } from '../entities/Enemy.js';

export class Game {
    constructor(canvasId) {
        const canvas = document.getElementById(canvasId);
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        
        this.starfield = new Starfield(this.width, this.height);
        this.player = new Player(this.width, this.height);
        this.bullets = [];
        this.enemies = [];
        this.lastTime = 0;
        this.keys = {};

        this.initInput();
        this.createFormation();
    }

    initInput() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    createFormation() {
        const rows = 5;
        const cols = 8;
        const enemyWidth = 30;
        const enemyHeight = 30;
        const spacingX = 20;
        const spacingY = 20;
        
        const totalWidth = (cols * enemyWidth) + ((cols - 1) * spacingX);
        const startX = (this.width - totalWidth) / 2;
        const startY = 50;

        const rowTypes = ['BOSS', 'RED', 'RED', 'BLUE', 'BLUE'];

        for (let row = 0; row < rows; row++) {
            const type = rowTypes[row];
            for (let col = 0; col < cols; col++) {
                const x = startX + col * (enemyWidth + spacingX);
                const y = startY + row * (enemyHeight + spacingY);
                this.enemies.push(new Enemy(x, y, type));
            }
        }
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

        // Update and filter bullets
        this.bullets = this.bullets.filter(bullet => {
            bullet.update(deltaTime);
            return bullet.active;
        });

        // Update enemies
        this.enemies.forEach(enemy => enemy.update(deltaTime));
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw starfield
        this.starfield.draw(this.ctx);

        // Draw enemies
        this.enemies.forEach(enemy => enemy.draw(this.ctx));

        // Draw bullets
        this.bullets.forEach(bullet => bullet.draw(this.ctx));

        // Draw player
        this.player.draw(this.ctx);
    }
}
