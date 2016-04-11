var blockWidth = 101;
var blockHeight = 83;
var edge_x = 450;
var edge_y = 450;
var player_pos_x = 200;
var player_pos_y = 400;



// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //set the speed
    var pxlpermsec = 100;
    this.speed = Math.random()*pxlpermsec + 1;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, player) {
    
    //console.log(this.x);
    if (this.x < edge_x){
        this.x += this.speed * dt;
    } else {
        this.x = 0;
        this.x += this.speed * dt;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //this.Collisions(player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var enemy = new Enemy(0,0);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function(x,y){
    this.x = player_pos_x;
    this.y = player_pos_y;
    this.height = 83;
    this.width = 70;
    this.score = 0;
    this.lives = 5;
    this.sprite = 'images/char-boy.png';
    //assign player's movement
    /*this.moveLeft = function(){
        this.x -= blockWidth;
    };
    this.moveRight = function(){
        this.x += blockWidth;
    };
    this.moveUp = function(){
        this.y -= blockHeight*0.5;
    };
    this.moveDown = function(){
        this.y += blockHeight*0.5;
    };
    */
};

player.prototype.update = function(){
    this.x = this.x;
    this.y = this.y; 
};

player.prototype.reset = function(){
    this.x = player_pos_x;
    this.y = player_pos_y;
}

player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

player.prototype.handleInput = function(allowedKeys){
    switch (allowedKeys) {
        case 'left':
            if (this.x > this.width){
                this.x -= blockWidth;
            } 
                
            if (this.y == 0){
                player.reset();
            }
            //this.moveLeft();
            break;
        case 'up':
            if (this.y > this.height){
                this.y -= blockHeight;
            } else if (this.y <= this.height){
                this.score += 100;
                document.getElementById("myScoreDivId").innerHTML = player.score;
                this.y = 0;
                player.reset();
            } else {
                this.y = 0;
                player.reset();
            }
            //this.moveUp();
            break;
        case 'right':
             if (this.x + blockWidth < ctx.canvas.width - this.width){
                this.x += blockWidth;
            } 
                
            if (this.y == 0){
                player.reset();
            }
            //this.moveRight();
            break;
        case 'down':
            if (this.y < ctx.canvas.height - this.height && this.y != 0 && this.y + this.height < ctx.canvas.height - blockHeight){
                this.y += blockHeight* 0.5;
            } else if ((this.y + this.height) > ctx.canvas.height){
                this.y = player_pos_y ;
            } else {
                player.reset();
            }
            //this.moveDown();
            break;
    }
    
};

//collision code
var checkCollisions = function(target){
    // if enemy:
     //if (player.x <= target.x && player.x + player.width * 0.25  >= target.x && player.y <= target.y && player.y + player.height* 0.25 >= target.y){
    //if (player.x <= target.x && player.x + player.width < target.x && player.y < target.y && player.y + player.height < target.height){
    if (player.x < target.x + target.width && player.x + player.width > target.x && player.y < target.y + target.height && player.y + player.height > target.y){
        console.log("collision is happening!");
    }
    /*if (this.lives > 1) {
             this.lives -= 1;
             document.getElementById("myLivesDivId").innerHTML = player.lives;
            
            player.reset();
        } else {
            this.lives = 0;
        }
     }*/
};

//Collision code for player class

player.prototype.checkCollisions = function (targets){
    var target;
    if (Array.isArray(targets)){
        for (var i =0; i < targets.length; i++){
            target = targets[i];
            checkCollisions(target);
            //console.log("Collision!");
        }   
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy (0,200), new Enemy(100,400), new Enemy(200,300)];

// Place the player object in a variable called player
var player = new player(200,400);


//Define handleInput function
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down', 
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

function drawScore (){
    
}