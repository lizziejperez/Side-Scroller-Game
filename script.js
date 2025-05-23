// load event - waits for all assets to be fully loaded before it executes code
window.addEventListener('load', function() {
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 360;
    let enemies = [];
    let score = 0;
    let life = 3;
    let gameOver = false;

    class InputHandler {
        constructor() {
            this.keys = [];

            // check for when key is pressed down
            window.addEventListener('keydown', event => {
                if (!gameOver) {
                    bgAudio.play();
                }                

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
            this.fps = 20;
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
            // context.strokeStyle = 'white';
            // context.strokeRect(this.x + 7, this.y + 5, this.width - 14, this.height - 5);

            // collision hit circle
            // context.beginPath();
            // context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI*2);
            // context.stroke();
        }
        update(input, deltaTime) {
            // collision detection (hit boxes)
            enemies.forEach(enemy => {
                const playerRect = [this.x + 7, this.y + 5, this.width - 14, this.height - 5];
                const enemyRect = [enemy.x + 5, enemy.y + 20, enemy.width - 10, enemy.height - 20];

                if (!enemy.collided) {
                    // if player hits enemy
                    if (playerRect[0] < enemyRect[0] + enemyRect[2] &&
                        playerRect[0] + playerRect[2] > enemyRect[0] &&
                        playerRect[1] < enemyRect[1] + enemyRect[3] &&
                        playerRect[1] + playerRect[3] > enemyRect[1]) {
                            enemy.collided = true;
                            life -= 1;
                            if (life == 0) {
                                gameOver = true;
                                bgAudio.pause();
                            }                       
                    }
                }
                
            });

            // collision detection (hit circles)
            // enemies.forEach(enemy => {
            //     const dx = (enemy.x + enemy.width/2) - (this.x + this.width/2);
            //     const dy = (enemy.y + enemy.height/2) - (this.y + this.height/2);
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
                this.vy -= 14;
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
                if (this.frameY !== 0) {
                    this.frameX = 0;
                }
                this.frameY = 0; // use idle animation frames (index 0)
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
            this.speed = 2;
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

    class ParallaxBackground {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.y = -110;
            this.width = 592 * 2;
            this.height = 272 * 2;

            // background layers
            this.backgroundLayer1 = document.getElementById('backgroundLayer1Image');
            this.backgroundLayer1_x = 0;
            this.backgroundLayer1_speed = 0;

            this.backgroundLayer2 = document.getElementById('backgroundLayer2Image');
            this.backgroundLayer2_x = 0;
            this.backgroundLayer2_speed = 0.5;

            this.backgroundLayer3 = document.getElementById('backgroundLayer3Image');
            this.backgroundLayer3_x = 0;
            this.backgroundLayer3_speed = 1.5;
            
            this.backgroundLayer4 = document.getElementById('backgroundLayer4Image');
            this.backgroundLayer4_x = 0;
            this.backgroundLayer4_speed = 2.5;
        }
        draw(context) {
            context.drawImage(this.backgroundLayer1, this.backgroundLayer1_x, this.y, this.width, this.height);
            context.drawImage(this.backgroundLayer1, this.backgroundLayer1_x + this.width - this.backgroundLayer1_speed, this.y, this.width, this.height);  // second background for seamless scrolling

            context.drawImage(this.backgroundLayer2, this.backgroundLayer2_x, this.y, this.width, this.height);
            context.drawImage(this.backgroundLayer2, this.backgroundLayer2_x + this.width - this.backgroundLayer2_speed, this.y, this.width, this.height); // second background for seamless scrolling
            
            context.drawImage(this.backgroundLayer3, this.backgroundLayer3_x, this.y, this.width, this.height);
            context.drawImage(this.backgroundLayer3, this.backgroundLayer3_x + this.width - this.backgroundLayer3_speed, this.y, this.width, this.height); // second background for seamless scrolling
            
            context.drawImage(this.backgroundLayer4, this.backgroundLayer4_x, this.y, this.width, this.height);
            context.drawImage(this.backgroundLayer4, this.backgroundLayer4_x + this.width - this.backgroundLayer4_speed, this.y, this.width, this.height); // second background for seamless scrolling     
        }
        update() {
            this.backgroundLayer1_x -= this.backgroundLayer1_speed;
            this.backgroundLayer2_x -= this.backgroundLayer2_speed;
            this.backgroundLayer3_x -= this.backgroundLayer3_speed;
            this.backgroundLayer4_x -= this.backgroundLayer4_speed;

            // background scrolling
            if (this.backgroundLayer1_x < 0 - this.width) this.backgroundLayer1_x = 0;
            if (this.backgroundLayer2_x < 0 - this.width) this.backgroundLayer2_x = 0;
            if (this.backgroundLayer3_x < 0 - this.width) this.backgroundLayer3_x = 0;
            if (this.backgroundLayer4_x < 0 - this.width) this.backgroundLayer4_x = 0;
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
            this.collided = false;
        }
        draw(context) {
            context.drawImage(this.image, (this.frameX * this.width), (this.frameY * this.height), this.width, this.height, this.x, this.y, this.width, this.height);
            
            // collision hit box
            // context.strokeStyle = 'white';
            // context.strokeRect(this.x + 5, this.y + 20, this.width - 10, this.height - 20);

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
        // TODO: display current life as hearts

        // display current score
        context.fillStyle = 'white';
        context.font = '20px Helvetica';
        context.fillText('Score: ' + score + '    Life: ' + life, 15, 30);

        // display game over
        if (gameOver) {
            context.textAlign = 'center';
            context.fillStyle = 'white'
            context.fillText('GAME OVER, try again!', canvas.width/2, 200);
        }
    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    // const background = new Background(canvas.width, canvas.height);
    const parallaxBackground = new ParallaxBackground(canvas.width, canvas.height);

    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 1000; // in miliseconds  
    
    let bgAudio = new Audio('./assets/WahCubed.mp3');
    bgAudio.loop = true;
    
    // main animation loop
    function animate(timestamp) {
        const deltaTime = timestamp - lastTime; // timestamp is an a paramater passed to animate function due to requestAnimationFrame function
        lastTime = timestamp;
        ctx.clearRect(0,0,canvas.width, canvas.height);     
        // background.draw(ctx);
        // background.update();
        parallaxBackground.draw(ctx);
        parallaxBackground.update();
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