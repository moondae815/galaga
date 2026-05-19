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
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('galaga_high_score')) || 0;
        this.isGameOver = false;
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
        if (this.isGameOver) return;

        this.starfield.update(deltaTime);
        
        if (this.player.active) {
            const newBullet = this.player.update(deltaTime, this.keys);
            if (newBullet) {
                this.bullets.push(newBullet);
            }
        }

        // 1. Update all entities
        this.bullets.forEach(bullet => bullet.update(deltaTime));
        const playerX = this.player.active ? this.player.x + this.player.width / 2 : undefined;
        this.enemies.forEach(enemy => enemy.update(deltaTime, playerX, this.height));

        // 2. Collision Check
        this.checkCollisions();

        // 3. Filter inactive entities
        this.bullets = this.bullets.filter(bullet => bullet.active);
        this.enemies = this.enemies.filter(enemy => enemy.active);
    }

    checkCollisions() {
        if (!this.player.active) return;

        const playerBounds = this.player.getBounds();

        for (const enemy of this.enemies) {
            if (!enemy.active) continue;

            const enemyBounds = enemy.getBounds();

            // Bullet vs Enemy
            for (const bullet of this.bullets) {
                if (!bullet.active) continue;
                const bulletBounds = bullet.getBounds();

                if (bulletBounds.x < enemyBounds.x + enemyBounds.width &&
                    bulletBounds.x + bulletBounds.width > enemyBounds.x &&
                    bulletBounds.y < enemyBounds.y + enemyBounds.height &&
                    bulletBounds.y + bulletBounds.height > enemyBounds.y) {
                    
                    bullet.active = false;
                    enemy.active = false;
                    this.score += enemy.score;

                    // Update high score
                    if (this.score > this.highScore) {
                        this.highScore = this.score;
                        localStorage.setItem('galaga_high_score', this.highScore.toString());
                    }
                }
            }

            // Player vs Enemy
            if (enemy.active &&
                playerBounds.x < enemyBounds.x + enemyBounds.width &&
                playerBounds.x + playerBounds.width > enemyBounds.x &&
                playerBounds.y < enemyBounds.y + enemyBounds.height &&
                playerBounds.y + playerBounds.height > enemyBounds.y) {
                
                this.player.active = false;
                this.isGameOver = true;
                break;
            }
        }
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw starfield
        this.starfield.draw(this.ctx);

        // Draw enemies
        this.enemies.forEach(enemy => {
            if (enemy.active) enemy.draw(this.ctx);
        });

        // Draw bullets
        this.bullets.forEach(bullet => {
            if (bullet.active) bullet.draw(this.ctx);
        });

        // Draw player
        if (this.player.active) {
            this.player.draw(this.ctx);
        }

        // --- UI ---
        this.ctx.font = '18px "Courier New", Courier, monospace';
        
        // 1. SCORE (Left Top)
        this.ctx.textAlign = 'left';
        this.ctx.fillStyle = '#ff0000'; // Red for labels
        this.ctx.fillText('1UP', 20, 25);
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(this.score.toString().padStart(6, '0'), 20, 45);

        // 2. HIGH SCORE (Center Top)
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillText('HIGH SCORE', this.width / 2, 25);
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(this.highScore.toString().padStart(6, '0'), this.width / 2, 45);

        // 3. LIFE (Right Bottom)
        // Since lives = 1, just draw one small ship
        const lifeX = this.width - 60;
        const lifeY = this.height - 45;
        const lifeSize = 20;
        
        this.ctx.fillStyle = '#00ff00';
        this.ctx.beginPath();
        this.ctx.moveTo(lifeX + lifeSize / 2, lifeY);
        this.ctx.lineTo(lifeX, lifeY + lifeSize);
        this.ctx.lineTo(lifeX + lifeSize, lifeY + lifeSize);
        this.ctx.closePath();
        this.ctx.fill();
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'right';
        this.ctx.fillText('LIFE', this.width - 20, this.height - 15);

        // Draw Game Over
        if (this.isGameOver) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            this.ctx.fillRect(0, 0, this.width, this.height);

            this.ctx.fillStyle = '#ff0000';
            this.ctx.font = 'bold 50px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('GAME OVER', this.width / 2, this.height / 2 - 20);
            
            this.ctx.fillStyle = 'white';
            this.ctx.font = '25px Arial';
            this.ctx.fillText(`FINAL SCORE: ${this.score}`, this.width / 2, this.height / 2 + 40);
            
            if (this.score >= this.highScore && this.score > 0) {
                this.ctx.fillStyle = '#ffff00';
                this.ctx.fillText('NEW HIGH SCORE!', this.width / 2, this.height / 2 + 80);
            }

            this.ctx.fillStyle = '#aaa';
            this.ctx.font = '18px Arial';
            this.ctx.fillText('Press F5 to Restart', this.width / 2, this.height / 2 + 130);
        }
    }
}
