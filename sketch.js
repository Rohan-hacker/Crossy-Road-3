var grid = 50;
var width = 1366;
var carGroup1,logGroup1;
var grassHeight = 100;
var gameState = "play";
var carAnimation, logAnimation, roadAnimation, seaAnimation, playerAnimation, grassAnimation;
var school;
var background, backgroundImage
function preload()
{
  carAnimation1=loadAnimation("images/car1.png");
  carAnimation2=loadAnimation("images/car2.png");
  playerAnimation=loadAnimation("images/cr playerrun 1.png","images/cr playerrun 2.png","images/cr playerrun 3.png","images/cr playerrun 4.png");
  logAnimation=loadAnimation("images/log.png");
  grassAnimation=loadAnimation("images/grass.png");
  roadAnimation=loadAnimation("images/road.png");
  seaAnimation=loadAnimation("images/sea1.png","images/sea1.png");
  //backgroundImage=loadAnimation("images/sea1.png","images/sea1.png");
}

function setup() {
  createCanvas(windowWidth+87,displayHeight);
  carGroup1 = new Group();
  logGroup1 = new Group();

  background=createSprite(windowWidth+87,displayHeight);
  
  //Grasses where player can rest
  for(var i=0;i<6;i++){
    var bottomGrass1 = createSprite(683,height-50-(i*400),width,grassHeight);
    if(i%2===0)//adding road
    {
     var road= createSprite(683,height-150-(i*400)-grassHeight,width,300,);
     road.addAnimation("road",roadAnimation);
     road.shapeColor="black";
     road.scale=1.25;
    }
    if(i%4===0)//adding road
    {
     var sea= createSprite(683,height-150-(i*400)-grassHeight,width,10,);
     sea.addAnimation("sea",seaAnimation);
     sea.shapeColor="black";
     sea.scale=0.5;
     sea.depth=road.depth-21;
    }
    bottomGrass1.addAnimation("grass",grassAnimation);
    bottomGrass1.shapeColor = "green";
    bottomGrass1.scale=1.2;
    bottomGrass1.depth=bottomGrass1.depth-20;
  }
  //To create rows of car
   for(var i = 0; i < 40; i++){
     cars = new Car(2);
     carGroup1.add(cars.spt);
   }
  //To create rows of Logs
    for(var i = 0; i < 40; i++){
      log = new Log(-3);
      logGroup1.add(log.spt);
    }

   //create player
   player = new Player(width/2,height+75);
   
 }

function draw() {

  background("blue");

  //move the screen to location of player.
  translate(0,-player.spt.y+height-150);

  //Making the cars re-apper
  for(i=1;i<carGroup1.length;i++) {
    if(carGroup1[i].x>width)
    {
     carGroup1[i].x=0;
    }
    if(carGroup1[i].x<0)
    {
      carGroup1[i].x=width;
    }
  }

  //making the logs re-apper
  for(i=1;i<logGroup1.length;i++){
    if(logGroup1[i].x<0)
    {
    logGroup1[i].x=width;
    }
  }
 
    //to make the player go to the starting position if he will touch car
  if(carGroup1.isTouching(player.spt)){
    player.spt.x = width/2;
    player.spt.y = height-75;
   } 

   //to make the player float on the logs and if he will touch the river then he will again start 
 if(logGroup1.isTouching(player.spt)){  
    player.spt.x= player.spt.x-3;
  }
  else if((player.spt.y > height-1550 && player.spt.y < height-1300) ||
          (player.spt.y < height-500 && player.spt.y > height-850)|| 
          (player.spt.y>height)||
          (player.spt.x<0)||
          (player.spt.x>width)){

            player.spt.x = width/2;
            player.spt.y = height-75;
  }

 
  drawSprites();
}

function keyPressed(){
  if(keyCode == UP_ARROW){
    player.move(0,-2);
  }else if(keyCode == DOWN_ARROW){
    player.move(0,2);
  }else if(keyCode == LEFT_ARROW){
    player.move(-2,0);
  }else if(keyCode == RIGHT_ARROW){
    player.move(2,0);
  }
}
