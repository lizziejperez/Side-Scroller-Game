// load event - waits for all assets to be fully loaded before it executes code
window.addEventListener('load', function() {
    // enter all game code here
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 360;
    let enemies = [];

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
            this.frameY = 0;
            this.speed = 0;
            this.vy = 0; // velocity y
            this.gravity = 1; // or weight
        }
        draw(context) {
            // background rectangle
            // context.fillStyle = 'white';
            // context.fillRect(this.x, this.y, this.width, this.height);

            context.drawImage(this.image, (this.frameX * this.width), (this.frameY * this.height), this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(input) {
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
                this.vy -= 15;
            }

            // horizontal movement
            this.x += this.speed;
            if (this.x < 0 ) this.x = 0; // left boundary
            if (this.x > (this.gameWidth - this.width))  this.x = this.gameWidth - this.width; // right boundary
            
            // vertical movement
            this.y += this.vy;            
            if (!this.onGround()) {
                this.vy += this.gravity; // apply gravity
            } else {
                this.vy = 0; // prevents infinite jump
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
        }
        draw(context) {
            context.drawImage(this.image, (this.frameX * this.width), (this.frameY * this.height), this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(deltaTime) {
            this.x -= this.speed;

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
    }

    function displayStatusText() {}

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
        player.update(input);
        handleEnemies(deltaTime);
        requestAnimationFrame(animate);
    }
    animate(0);
});