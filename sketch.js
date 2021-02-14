var witch, girl, potion, gem, fire,bg;
var witchimg, girlRunning,girlFalling,potionimg,fireimg,gemimg, bgimg;
var score=0;
var invisibleGround;
var gameState= "play"

function preload(){
  bgimg= loadImage("background.jpg");
  girlRunning= loadAnimation("girl1.png", "girl2.png", "girl3.png", "girl 4.png","girl5.png","girl6.png"
  )
  girlFalling= loadImage("girl fall.png")
  witchimg= loadImage("witch.png")
  potionimg= loadImage("potion.png")
  gemimg= loadImage("gem.png")
  fireimg= loadImage("fire.png")
}
function setup(){
  createCanvas(displayWidth, displayHeight);

  potionGroup=new Group();
  gemGroup=new Group();
  fireGroup=new Group();
  bg= createSprite(0,0,displayWidth,displayHeight);
  bg.x=bg.width/2;
  bg.addImage(bgimg);
  bg.scale= 4;
  bg.velocityX= -4;

  invisibleGround= createSprite(displayWidth/2, displayHeight-160,displayWidth,10)
  invisibleGround.visible= false;

  girl= createSprite(displayWidth/2-400, displayHeight-200);
  girl.addAnimation("running",girlRunning)
  girl.addAnimation("Fall",girlFalling);
  girl.scale= 1.3;

  witch= createSprite(displayWidth/2-575, displayHeight-250);
  witch.addImage("witch", witchimg)
  witch.scale= 0.3;
}
function draw(){
  background(0)
  if(gameState=="play"){
  if(bg.x<100){ 
    bg.x= bg.width/2
  }
var choice= Math.round(random(1,2))
if(frameCount%200===0){
  if(choice==1)
  spawnGem();
  else if(choice==2)
  spawnPotion();
}
spawnFire();
if (keyDown("space")){
  girl.velocityY= -10
}
girl.velocityY= girl.velocityY+0.5

girl.collide(invisibleGround);

if(girl.isTouching(fireGroup)){
  gameState="end"
}
if(girl.isTouching(gemGroup)){
  score= score+5;
  gemGroup.destroyEach();
}
//if(girl.isTouching(potionGroup)){
  //gameState= "fast"
 // }
}
drawSprites();
//if(gameState=="fast"){
 // bg.velocityX=-7
//}

if(gameState=="end"){
  girl.changeAnimation("Fall",girlFalling);
  fireGroup.destroyEach();
  gemGroup.destroyEach();
  potionGroup.destroyEach();
  bg.velocityX=0;
  girl.velocityY=0;
  textSize(45)
  textStyle(BOLD)
  fill("red")
  text("YOU LOST",displayWidth/2-100,displayHeight/2-100)
  text("THE GIRL HAS BEEN CAUGHT!",displayWidth/2-250,displayHeight/2-50)


}
textSize(35);
fill("white");
text("SCORE: "+score,displayWidth-200,100 )
}
 function spawnPotion(){
     potion= createSprite(displayWidth, displayHeight-200)
     potion.addImage("potionimg",potionimg)
     potion.scale= 0.4;
     potion.y= random(displayHeight-200, displayHeight-300)
     potion.velocityX= -5
     potion.lifetime= 500
     potionGroup.add(potion)
   
 }
 function spawnGem(){
     gem= createSprite(displayWidth, displayHeight-100)
     gem.addImage("gemimg",gemimg)
     gem.scale= 0.2;
     gem.y= random(displayHeight-150, displayHeight-200)
     gem.velocityX= -5
     gem.lifetime= 500
     gemGroup.add(gem)
  
 }
 function spawnFire(){
  if(frameCount%150==0){
    fire= createSprite(displayWidth, displayHeight-250)
    fire.addImage("fireimg",fireimg)
    fire.scale= 0.5;
    fire.velocityX= -5
    fire.lifetime= 500
    fireGroup.add(fire)
    fire.debug= true;
    fire.setCollider("rectangle",0,0,400,50)
}
 }

