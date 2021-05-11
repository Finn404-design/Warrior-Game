var bg,bgIMG;
var warrior,warriorIMG
var ground
var edges
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4
var obstacleGroup
var PLAY = 1
var END = 0
var gameState = PLAY
var Score = 0
var gameover,gameoverIMG
var restart, restartIMG
var hit



function preload(){
 
 bgIMG = loadImage("Back.png");
 warriorIMG = loadImage("warrior.png")
 obstacle1 = loadImage("Skelly.png")
 obstacle2 = loadImage("Orge.png")
 obstacle3 = loadImage("Knight.png")
 obstacle4 = loadImage("Barrel.png")
 gameoverIMG = loadImage("gameover.png")
  restartIMG = loadImage("Restart.png")
  hit = loadSound("SharpPunch.mp3")
  

}




function setup(){
  createCanvas(800,600);
//BG is the background for the game and the image is a forest
 bg = createSprite(400,300,800,600);
 bg.addImage(bgIMG);
 bg.scale = 2.5;
 
 // The warrior is the pc and is the main character
 warrior = createSprite(200,450,30,30)
 warrior.addImage(warriorIMG)
 warrior.scale = 0.65
 warrior.debug = false
 
 warrior.setCollider("rectangle",0,0,280,270)
  //This is for the pc so it would not fall through the floor
 ground = createSprite(400,570,800,10)
 ground.visible = false
  //This is for when you get hit and only appears in gamestate End
  gameover = createSprite(400,200,40,40)
  gameover.addImage(gameoverIMG)
  gameover.visible = false
  //This is for when you get hit and only appears in gamestate End and also it is for restartig the game
  restart = createSprite(400,300,40,40)
  restart.addImage(restartIMG)
  restart.scale = 0.5
  restart.visible = false
  
  edges = createEdgeSprites();
  
  obstacleGroup = createGroup();
  
  

}





function draw(){
background("black")
  
  

  //This is the play state of the game 
  if(gameState === PLAY){
    
    
  warrior.bounceOff(edges)
// These are for moving the pc
  if(keyDown(UP_ARROW)){
  warrior.velocityY = -15
}

if(keyDown(RIGHT_ARROW)){
  warrior.x = warrior.x + 10
}
  
if(keyDown(LEFT_ARROW)){
  warrior.x = warrior.x + -10

}
  
warrior.velocityY = warrior.velocityY + 0.8;

warrior.collide(ground)
    
spawnObstacles();  
  
    //This is to caculate the score
    Score = Score + Math.round(getFrameRate()/60)
    //This is for when the pc touches the npc the game is over
  if(warrior.isTouching(obstacleGroup) ){
    gameState = END
    hit.play()
   
  }
   
  }
  //This is the end state fo when the game is over
 else if(gameState === END){
  
   warrior.velocityX = 0
   warrior.velocityY = 0
   
   obstacleGroup.setVelocityXEach(0)

   obstacleGroup.setLifetimeEach(-1)
   
   gameover.visible = true
   restart.visible = true
   
   if(mousePressedOver(restart)){
     reset()
   }
   
 }





drawSprites()
  fill("white")
  textSize(20)
  text("Score: "+Score,650,100)
  
  
}

//This is to spawn the npcs
function spawnObstacles(){
  if(frameCount % 150 === 0){
    obstacle = createSprite(800,500,10,40)
    obstacle.velocityX = -6
    obstacle.scale = 0.4
    obstacle.debug=false
    
    var rand = Math.round(random(1,4));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
      
       
    }
     obstacle.lifetime = 133;
    
    obstacleGroup.add(obstacle);
  }
}
//This is to reset the game when it is over
function reset(){
  gameState = PLAY
  gameover.visible = false
  restart.visible = false
  obstacleGroup.destroyEach()
  Score = 0
  
}




