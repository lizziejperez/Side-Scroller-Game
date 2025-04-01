// load event - waits for all assets to be fully loaded before it executes code
window.addEventListener('load', function() {
    // enter all game code here
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 360;
    let enemies = [];
    let score = 0;
    let gameOver = false;

    class InputHandler {
        constructor() {
            this.keys = [];

            // check for when key is pressed down
            window.addEventListener('keydown', event => {
                // if key that is pressed is valid and is NOT present in keys pressed list
                if ((event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') && this.keys.indexOf(event.key) === -1) {
                    // add key pressed to keys pressed list
                    this.keys.push(event.key);
                }
                console.log(event.key, this.keys);
            });

            // check for when key is lifted up
            window.addEventListener('keyup', event => {
                if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                    this.keys.splice(this.keys.indexOf(event.key), 1);
                }
                console.log(event.key, this.keys);
            });
        }
    }

    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 32;
            this.height = 32;
            this.x = 0;
            this.y = this.gameHeight - this.height; // start player at bottom of screen            
            this.image = document.getElementById('playerImage'); // set player image
            this.frameX = 0;
            this.frameY = 0; // start with idle animation
            this.maxFrameX = 1;
            this.fps = 6;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;
            this.speed = 0;
            this.vy = 0; // velocity y
            this.gravity = 1; // or weight
        }
        draw(context) {
            // background rectangle
            // context.fillStyle = 'white';
            // context.fillRect(this.x, this.y, this.width, this.height);

            context.drawImage(this.image, (this.frameX * this.width), (this.frameY * this.height), this.width, this.height, this.x, this.y, this.width, this.height);

            // collision hit box
            context.strokeStyle = 'white';
            context.strokeRect(this.x + 6, this.y, this.width - 12, this.height);

            // collision hit circle
            // context.beginPath();
            // context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI*2);
            // context.stroke();
        }
        update(input, deltaTime) {
            // collision detection (hit boxes)
            enemies.forEach(enemy => {
                if (this.x + 6 < enemy.x + enemy.width &&
                    this.x + 6 + this.width - 12 > enemy.x &&
                    this.y < enemy.y + enemy.height &&
                    this.y + this.height > enemy.y + 15) {
                        gameOver = true;
                }
            });

            // collision detection (hit circles)
            // enemies.forEach(enemy => {
            //     const dx = enemy.x - this.x;
            //     const dy = enemy.y - this.y;
            //     const distance = Math.sqrt(dx*dx+dy*dy);
            //     if (distance < enemy.width/2 + this.width/2) {
            //         gameOver = true;
            //     }
            // });

            // sprite animation
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrameX) {
                    this.frameX = 0;
                } else {
                    this.frameX++;
                }
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }

            // determine speed
            if (input.keys.indexOf('ArrowRight') > -1) {
                this.speed = 2;
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speed = -2; 
            } else {
                this.speed = 0;
            }

            // determine velocity y
            if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
                this.vy -= 12;
            }

            // horizontal movement
            this.x += this.speed;
            if (this.x < 0 ) this.x = 0; // left boundary
            if (this.x > (this.gameWidth - this.width))  this.x = this.gameWidth - this.width; // right boundary
            
            // vertical movement
            this.y += this.vy;            
            if (!this.onGround()) {
                this.vy += this.gravity; // apply gravity
                this.frameY = 5; // use jump animation frames (index 5)
                this.maxFrameX = 7;
            } else {
                this.vy = 0; // prevents infinite jump
                this.frameY = 0; // use idle animation frames (index 0)
                this.frameX = 0;
                this.maxFrameX = 1;
            }
            if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height; // ground boundary
        }
        // returns if player is on the ground
        onGround() {
            return this.y >= this.gameHeight - this.height;
        }
    }

    class Background {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImage');
            this.x = 0;
            this.y = -110;
            this.width = 1184;
            this.height = 544;
            this.speed = 3;
        }
        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            // second background for seamless scrolling
            context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
        }
        update() {
            this.x -= this.speed;

            // background scrolling
            if (this.x < 0 - this.width) this.x = 0;
        }
    }

    class Enemy {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 32;
            this.height = 32;
            this.image = document.getElementById('enemyImage');
            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height;
            this.frameX = 0;
            this.frameY = 2; // use run animation frames
            this.maxFrameX = 6;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;
            this.speed = 2;
            this.markedForDeletion = false;
        }
        draw(context) {
            context.drawImage(this.image, (this.frameX * this.width), (this.frameY * this.height), this.width, this.height, this.x, this.y, this.width, this.height);
            
            // collision hit box
            context.strokeStyle = 'white';
            context.strokeRect(this.x, this.y + 15, this.width, this.height - 15);

            // collision hit circle
            // context.beginPath();
            // context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI*2);
            // context.stroke();
        }
        update(deltaTime) {
            // movement
            this.x -= this.speed;

            // sprite animation
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrameX) {
                    this.frameX = 0;
                } else {
                    this.frameX++;
                }
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
            
            // if off screen, mark for deletion
            if (this.x < 0 - this.width) {
                this.markedForDeletion = true;
                score++;
            }
        }
    }

    function handleEnemies(deltaTime) {
        let randomEnemyInterval = Math.random() * 1000 + 500;
        if (enemyTimer > enemyInterval + randomEnemyInterval) {
            enemies.push(new Enemy(canvas.width, canvas.height)); // add an enemy
            enemyTimer = 0;
        } else {
            enemyTimer += deltaTime;
        }
        
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        });

        enemies = enemies.filter(enemy => !enemy.markedForDeletion);
    }

    function displayStatusText(context) {
        // display current score
        context.fillStyle = 'white';
        context.font = '20px Helvetica';
        context.fillText('Score: ' + score, 15, 30);

        // display game over
        if (gameOver) {
            context.textAlign = 'center';
            context.fillStyle = 'white'
            context.fillText('GAME OVER, try again!', canvas.width/2, 200);
        }
    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);

    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 1000; // in miliseconds    
    
    // main animation loop
    function animate(timestamp) {
        const deltaTime = timestamp - lastTime; // timestamp is an a paramater passed to animate function due to requestAnimationFrame function
        lastTime = timestamp;
        ctx.clearRect(0,0,canvas.width, canvas.height);     
        background.draw(ctx);
        // background.update();
        player.draw(ctx);
        player.update(input, deltaTime);
        handleEnemies(deltaTime);
        displayStatusText(ctx);
        if (!gameOver) {
            requestAnimationFrame(animate);
        }        
    }
    animate(0);
});