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
            window.addEventListener('keydown', function(e) {
                // get key pressed from event
                var keyPressed = e.key;
                
                // if key that is pressed is valid and is NOT present in keys pressed list
                if ((keyPressed === 'ArrowDown' || keyPressed === 'ArrowUp' || keyPressed === 'ArrowLeft' || keyPressed === 'ArrowRight') && this.keys.indexOf(keyPressed) === -1) {
                    // add key pressed to keys pressed list
                    this.keys.push(keyPressed);
                }
                console.log(keyPressed, this.keys);
            });

            // check for when key is lifted up
            window.addEventListener('keyup', function(e) {
                // get key lifted from event
                var keyPressed = e.key;

                if (keyPressed === 'ArrowDown' || keyPressed === 'ArrowUp' || keyPressed === 'ArrowLeft' || keyPressed === 'ArrowRight') {
                    this.keys.splice(this.keys.indexOf(keyPressed), 1);
                }
                console.log(keyPressed, this.keys);
            });
        }
    }

    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 200;
            this.x = 0;
            this.y = this.gameHeight - this.height; // start player at bottom of screen
        }
        draw(context) {
            context.fillStyle = 'white';
            context.fillRect(this.x, this.y, this.width, this.height);
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
    function animate() {}
});