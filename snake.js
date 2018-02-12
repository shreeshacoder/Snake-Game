//start position
var snakeX = 2;
var snakeY = 2;
var score = 0;
//size of the map
var height = 25;
var width = 25;

//updation period
var interval = 100;

var increment = 1; //each time fruit is eaten, increment size of snake by 1
//history of the tail
var tailX = [snakeX];
var tailY = [snakeY];

//position of the fruit
var fX;
var fY;

//is game running?
var running = false;
var gameOver = false;

var direction = -1; //down = -1, up = 0, left = 2, right = 3

var runInterval;

var length = 0; //size of the snake
//start the game

function run(){
	init();
	runInterval=setInterval(gameLoop, 100);

}

//initially, we have to create the map, snake and fruit
function init(){
	createMap();
	createSnake();
	createFruit();
}

function createMap(){
	document.write("<table>");
	for(var y = 0; y<height; y++){
		document.write("<tr>");
		for(var x = 0; x<width; x++){
			if(x == 0 || x == width-1 || y == 0 || y == height-1){
				//document.write("<td class='wall' id='"x+"-"+y"'></td>");
				document.write("<td class='wall' id='"+x+'-'+y+"'></td>");
			}
			else
				document.write("<td class='blank' id='"+x+'-'+y+"'></td>");
				//document.write("<td class='blank' id='"x+"-"+y"'></td>");

		}
		document.write("</tr>");
	}
	document.write("</table>");

}

function createSnake(){
	set(snakeX,snakeY,"snake");

}

function get(x, y){
	return document.getElementById(x+"-"+y);
}

function set(x, y, value){
	get(x,y).setAttribute("class",value);
}

function rand(min, max){
	return Math.floor((Math.random() * (max-min))+min);
}

function getType(x, y){
	return get(x,y).getAttribute("class");
}

function createFruit(){
	while(length<((width-2)*(height-2))){
		var fruitX = rand(1, width-1);
		var fruitY = rand(1, height-1);
		if(getType(fruitX, fruitY) == "blank"){
			set(fruitX, fruitY, "fruit");
			fX = fruitX;
			fY = fruitY;
			break;
		}
	}

}

//detecting the directional buttons
window.addEventListener("keydown", function key(){
	var key = event.which;
	if(direction!=-1 && key == 38) //up arrow
		direction = 0;
	else if(direction!=2 && key == 37) //left arrow
		direction = 1;
	else if(direction!=1 && key == 39) //right arrow
		direction = 2;
	else if(direction!=0 && key == 40) //down arrow
		direction = -1;
	if(!running)
		running = true;
	else if(key == 32)
		running = false;
});

function gameLoop(){
	if(running && !gameOver)
		runGame();
	else if(gameOver){
		clearInterval(runInterval);
	}
}

function runGame(){
	//updateTail();
	set(tailX[length], tailY[length], "blank"); //make the last cell blank
	if(direction == 0)
		snakeY--;
	else if(direction == -1)
		snakeY++;
	else if(direction == 1)
		snakeX--;
	else
		snakeX++;
	set(snakeX,snakeY,"snake"); //make the new cell the snake head
	for(var x = length; x>0; x--){
		if(snakeX == tailX[x] && snakeY == tailY[x]){
			gameOver = true;
			break;
		}
	}
	if(snakeX == 0 || snakeX == width || snakeY == 0 || snakeY == height){
		gameOver = true;
	}
	else if(snakeX == fX && snakeY == fY){
		length++;
		createFruit();
		score++;
	}
	updateTail();
	document.getElementById("score").innerHTML = "Score: "+score;
}

function updateTail(){
	for(var i = length; i > 0; i--){
		tailX[i] = tailX[i-1];
		tailY[i] = tailY[i-1];
	}
	tailX[0] = snakeX;
	tailY[0] = snakeY;
}

run();