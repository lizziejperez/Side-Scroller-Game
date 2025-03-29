// load event - waits for all assets to be fully loaded before it executes code
window.addEventListener('load', function() {
    // enter all game code here
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;

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
        }
        draw(context) {
            context.fillStyle = 'white';
            context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, (this.frameX * this.width), (this.frameY * this.height), this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(input) {
            // horizontal movement
            this.x += this.speed;
            if (input.keys.indexOf('ArrowRight') > -1) {
                this.speed = 1;
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speed = -1; 
            } else {
                this.speed = 0;
            }

            // horizontal walls
            if (this.x < 0 ) this.x = 0;
            if (this.x > (this.gameWidth - this.width))  this.x = this.gameWidth - this.width;
            
        }
    }

    class Backgorund {}
    class Enemy {}

    function handleEnemies() {}
    function displayStatusText() {}

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    player.draw(ctx);
    
    // main animation loop
    function animate() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        player.draw(ctx);
        player.update(input);
        requestAnimationFrame(animate);
    }
    animate();
});