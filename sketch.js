var trex, trex_running, edges, ground, groundimg, invisibleGround, cloudImg;
var obstacle1Img, obstacle2Img, obstacle3Img, obstacle4Img, obstacle5Img, obstacle6Img;
var cloudGroup, obstacleGroup;
var trex_collided
var score = 0;
var PLAY = 1;
var END = 0;
var gamestate = PLAY
function preload() {

  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png")
  groundimg = loadImage("ground2.png")
  cloudImg = loadImage("cloud.png")
  obstacle1Img = loadImage("obstacle1.png")
  obstacle2Img = loadImage("obstacle2.png")
  obstacle3Img = loadImage("obstacle3.png")
  obstacle4Img = loadImage("obstacle4.png")
  obstacle5Img = loadImage("obstacle5.png")
  obstacle6Img = loadImage("obstacle6.png")
}

function setup() {

  createCanvas(600, 200)
  edges = createEdgeSprites();
  //create a trex sprite
  trex = createSprite(50, 180, 20, 50)
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)
  trex.scale = 0.4;
  ground = createSprite(200, 180, 400, 20)
  ground.addImage(groundimg)
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false
  cloudGroup = new Group()
  obstacleGroup = new Group()
  trex.debug = true
  trex.setCollider("circle", 0, 0, 40)
}

function draw() {

  background("white")
  text("My Score:" + score, 510, 20)
  text(mouseX + "," + mouseY, mouseX, mouseY)
  if (gamestate === PLAY) {
    ground.velocityX = -6
    score = score + Math.round(frameCount / 60)
    if (ground.x < 0) {

      ground.x = ground.width / 2

    }
    if (keyDown("space") && trex.y >= 150) {

      trex.velocityY = -12;

    }
    trex.velocityY = trex.velocityY + 0.5
    if (obstacleGroup.isTouching(trex)) {
      gamestate = END
    }
  }
  else if (gamestate === END) {
    ground.velocityX = 0
    obstacleGroup.setVelocityEach(0)
    cloudGroup.setVelocityEach(0)
    obstacleGroup.setLifetimeEach(-1)
    cloudGroup.setLifetimeEach(-1)
    trex.changeAnimation("collided", trex_collided)
    trex.velocityY = 0
  }
  spawningCloud()
  spawningObstacles()
  trex.collide(invisibleGround)
  drawSprites();

}
function spawningCloud() {
  if (frameCount % 60 === 0) {

    var cloud = createSprite(600, 75, 10, 10)
    cloud.addImage(cloudImg)
    cloud.scale = 0.5
    cloud.y = Math.round(random(40, 100))
    cloud.velocityX = -4
    trex.depth = cloud.depth
    trex.depth = trex.depth + 1
    cloud.lifetime = 300
    cloudGroup.add(cloud)
  }
}
function spawningObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 170, 10, 10)
    obstacle.velocityX = -5
    var rand = Math.round(random(1, 6))
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1Img)
        break
      case 2:
        obstacle.addImage(obstacle2Img)
        break
      case 3:
        obstacle.addImage(obstacle3Img)
        break
      case 4:
        obstacle.addImage(obstacle4Img)
        break
      case 5:
        obstacle.addImage(obstacle5Img)
        break
      case 6:
        obstacle.addImage(obstacle6Img)
        break
      default: break

    }
    obstacle.scale = 0.5
    obstacle.lifetime = 300
    obstacleGroup.add(obstacle)
  }
}