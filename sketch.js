var ground,groundImg;
var runner,runnerImg;
var edges,virus;
var enemy;
var gameState="PLAY";
var runnerStop;
var gameOver,gameOverImg;
var reset,resetImg;
var mask,maskImg;
var life=0;



function preload(){
    groundImg=loadImage("Road.png");
    runnerImg=loadAnimation("Runner-1.png","Runner-2.png");
    runnerStop=loadAnimation("Runner-1.png");
    virus=loadImage("virus.png");
    gameOverImg=loadImage("gameOver.png");
    resetImg=loadImage("reset.png");
    maskImg=loadImage("N95.png")
}

function setup(){
    createCanvas(600,660);
  
    ground=createSprite(300,300,600,660);
    ground.addImage(groundImg);

    runner=createSprite(300,610,20,20);
    runner.addAnimation("hello",runnerImg);
    runner.addAnimation("stop",runnerStop);
    runner.scale=0.08;

    enemyGroup= new Group();
    
    gameOver=createSprite(300,300);
    gameOver.addImage(gameOverImg);
    gameOver.visible=false;

    reset=createSprite(300,410,10,10);
    reset.addImage(resetImg);
    reset.scale=0.1;
    reset.visible=false;
}


function draw() {


 if(gameState=="PLAY"){
   //fill("yellow");
   //text("LIFE :"+life,400,100);
    ground.velocityY=3;
      if(ground.y>500){
        ground.y=200;
      }

      runner.x=mouseX;

     if(runner.isTouching(enemyGroup)){
      gameState="END";
      }

enemies();
Mask();

  }
  drawSprites();
   if(gameState=="END"){
    runner.changeAnimation("stop",runnerStop);
    ground.velocityY=0;
    enemyGroup.setVelocityYEach(0);
    gameOver.visible=true;
    reset.visible=true
    strokeWeight(4);
    fill("skyblue");
    textSize(25);
    text("Don't forget to wear mask and use sanitizers",70,380);
  }
 
  if(mousePressedOver(reset)){
    Reset();
  }

}


function enemies(){
if(frameCount%100==0){

enemy=createSprite(random(0,660),random(200,300))
enemy.addImage(virus)
enemy.scale=0.1
enemy.velocityY=3
enemyGroup.add(enemy)
}
}

function Reset(){

  gameState="PLAY";
gameOver.visible=false;
reset.visible=false;
enemyGroup.destroyEach();
text("",70,380)
runner.changeAnimation("hello",runnerImg)
}

function Mask(){
  if(frameCount%100==0){

    mask=createSprite(random(0,660),random(200,300));
    mask.addImage(maskImg);
    mask.scale=0.1;
    mask.velocityY=3;
   // maskGroup.add(mask);
  }
}