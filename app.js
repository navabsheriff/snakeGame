const gameBoard=document.getElementById('gameBoard')
const context=gameBoard.getContext('2d');
const scoretext=document.getElementById('scoreVal')

const WIDTH=gameBoard.width;
const HEIGHT=gameBoard.height;
const UNIT=25;

let foodX;
let foodY;
let xvel=25; 
let yvel=0;
let score=0;
let active=true;
let started=false;
let paused =false;

let snake=[
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}

];

window.addEventListener( 'keydown',keyPress);
starGame();

function starGame(){
    context.fillStyle='#212121';
    //fillrect(x start,y start,width,height)
    context.fillRect(0,0,WIDTH,HEIGHT)
    createFood();
    displayFood();
    drawsnake();
    //movesnake();
    //nexttick();
}

    function clearboard(){
    context.fillStyle='#212121';
    context.fillRect(0,0,WIDTH,HEIGHT)

    }
    function createFood(){
        foodX=Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
        foodY=Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;


    }
    function displayFood(){
        context.fillStyle='red';
        context.fillRect(foodX,foodY,UNIT,UNIT)
    }
    function drawsnake(){
        context.fillStyle = 'aqua';
        context.strokeStyle ='black';
        snake.forEach((snakepart)=>{
            context.fillRect(snakepart.x,snakepart.y,UNIT,UNIT)
            context.strokeRect(snakepart.x,snakepart.y,UNIT,UNIT)

        })
    }
    function movesnake(){
        const head={x:snake[0].x+xvel,
            y:snake[0].y+yvel}
            snake.unshift(head);
            if(snake[0].x==foodX && snake[0].y == foodY){
                score+=1;
                scoretext.textContent=score;
                scoretext.score=score;
                createFood()
            } 
            else
            snake.pop();
        
    }
    function nexttick(){
        if(active && !paused){
        setTimeout(()=>{
            clearboard();
            displayFood();
            movesnake();
            drawsnake();
            checkgameover();
            nexttick();

        },200);
    }
    else if(!active){
        clearboard();
        context.font =" bold 50px serif"
        context.fillStyle="white";
        context.textAlign="center";
        context.fillText("Game over !",WIDTH/2,HEIGHT/2)
    }
    }

function keyPress(event){
    if(!started){
    started=true;
     nexttick();
}
//pause when space pressed
if(event.keyCode ===32){
    console.log('clicked')
    if(paused){
        paused=false;
        nexttick();
    }
    else{
        paused=true;
    }
}
    const LEFT=37;
    const RIGHT=39;
    const UP=38;
    const DOWN=40;
    switch(true){
        case(event.keyCode ==LEFT && xvel!=UNIT):
            xvel=-UNIT;
            yvel=0;
            break;
         case(event.keyCode==RIGHT && xvel!=-UNIT):
            xvel=UNIT
            yvel=0;
            break;
         case(event.keyCode==UP && yvel!=UNIT):
            xvel=0;
            yvel=-UNIT;
            break;
         case(event.keyCode==DOWN && yvel!=-UNIT):
            xvel=0;
            yvel=UNIT;
            break;
    }



}
function checkgameover(){
    switch(true){
        case(snake[0].x<0)://active=false; break;
        case(snake[0].x>=WIDTH)://active=false; break;
        case(snake[0].y<0)://active=false; break;
        case(snake[0].y>=HEIGHT):
        active=false;
        break;
    }
}

