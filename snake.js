function init(){
    // initializing game elements
    // DOM manipulation
    //initial direction of the snake is towards right
    // and initial length is equivalent to 5 cells
    canvas = document.getElementById('mycanvas');
    W = H = canvas.width = canvas.height = 1000;
    pen = canvas.getContext('2d');
    cs = 66;
    score = 0;
    //creating food object from the image.
    food_img =  new Image();
    food_img.src = "assests/apple.png"

    trophy = new Image();
    trophy.src = "assests/trophy.png"

    food = getRandomFood();
    game_over = false;

    snake = {
        init_len: 5,
        color: "blue",
        cells: [],
        direction: "right",
        
        createSnake: function(){
            for(let i=this.init_len;i>0;i--){
                this.cells.push({x:i,y:0});
            }
        },

        drawSnake: function(){
            for(let i=0;i<this.cells.length;i++){
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
            }
        },

        updateSnake: function(){
            // console.log("update snake");
            //if snake will eating then increase the length of the snake.
            // headX,HeadY are the initial coordinates of the snake's head.
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            //check for the collision between food object and the snake's head.
            if(headX == food.x && headY == food.y){
                //since old food object has been eaten so create the new food object.
                food = getRandomFood();
                score++;
            }
            else{
                // only pop when there is no collision between food and the snake.
                this.cells.pop();
            }

            var nextX,nextY;
            
            if(this.direction == "right"){
                nextX = headX + 1;
                nextY = headY;
            }
            else if(this.direction == "left"){
                nextX = headX - 1;
                nextY = headY;
            }
            else if(this.direction == "up"){
                nextX = headX;
                nextY = headY - 1;
            }
            else{
                nextX = headX;
                nextY = headY + 1;
            }

            this.cells.unshift({x:nextX,y:nextY});

            var last_x_co = Math.round((W-cs)/cs);
            var last_y_co = Math.round((H-cs)/cs);

            if(this.cells[0].x<0 || this.cells[0].y<0 || this.cells[0].x>last_x_co || this.cells[0].y>last_y_co){
                game_over = true;
            }

        },

    };

    snake.createSnake();

    //Add event listener on the document DOM object.

    function pressedKeys(element){

        if(element.key == "ArrowRight"){
            snake.direction = "right";
        }
        else if(element.key == "ArrowLeft"){
            snake.direction = "left";
        }
        else if(element.key == "ArrowUp"){
            snake.direction = "up";
        }
        else{
            snake.direction = "down";
        }
        //console.log(snake.direction);
    }

    document.addEventListener('keydown',pressedKeys);

}

function draw(){
    //Clear the frame every time while drawing the snake.
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.fillStyle = food.color;
    // drawing food object as the images.
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
    // drawing trophy object as the images.
    pen.drawImage(trophy,0,0,cs,cs);
    pen.fillStyle = "black";
    pen.font = "25px Roboto";
    pen.fillText(score,28,35);
}

function getRandomFood(){
    var foodX = Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(H-cs)/cs);

    var food = {
        x:foodX,
        y:foodY,
        color:"black",
    }
    return food;
}

function update(){
    snake.updateSnake();
}

function gameloop(){
    if(game_over){
        clearInterval(f);
        alert("Game Over");
    }
    draw();
    update();
}

init();
// calling gameloop @ 100ms with the method setInterval()
var f = setInterval(gameloop,100);