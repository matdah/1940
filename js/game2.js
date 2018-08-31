//By Mattias Dahlgren (mattias@gnarp.se) 2012

//Variables
var screenWidth = 400;
var screenHeight = 640;
var ctx;
var canvas;
var FPS = 30;
var mapPosition;
var SCROLL_SPEED = 1;
var isColliding = 0;
var hasSpawned = false;
var isCollidingX;
var isCollidingY;
var tempPos;
var isScrolling = false;
var level = 1;
var SHADOW_DISTANCE = 20;
var CLOUD_SEED = 100;
var clouds = new Array();
var isPlaying = false;
var isDead = false;
var isDeadText = 500;

//Player
var playerWidth = 48;
var playerHeight = 46;
var xPos;
var yPos;
var PLAYER_SPEED = 8;
var keys = {};
var playerHealth;
var playerScore;
var playerAmmo;
var PLAYER_AMMO = 40;
var playerLives;
var PLAYER_LIVES = 3;
var startText;
var highscore = 999;

//Bullet
var bulletSize = 6;
var bulletSpeed = 12;
var bullets = new Array();
var bulletshot = new Array();
var bulletPosition;
var bulletTimer = 0;
var BULLLET_TIMEOUT = 4;

//Enemies
var enemyData = new Array();
var enemies = new Array();
var enemy = new Array();
var enemyPositionX;
var enemyPositionY;
var ENEMY_SIZE = 28;
var ENEMY_SPEED = 4;
var ENEMY_SPEED_MULTIPLIER = 1;

//Pickups
var pickups = new Array();
var pickup = new Array();
var pickupData = new Array();
var PICKUP_SIZE = 40;


//Images
var player = new Image();
var playerShadow = new Image();
var enemyShadow = new Image();
var bullet = new Image();
var redPlane = new Image();
var redPlaneUpShadow = new Image();
var redPlaneUp = new Image();
var map = new Image();
var ammoBox = new Image();
var bonusBox = new Image();
var pickupShadow = new Image();
var cloud1 = new Image();
var cloud2 = new Image();
var cloud3 = new Image();

//Event handlers
//Prevent display before image has loaded
$(document).ready(function(){ 
    init();   
});

//Functions
function init() {
	//2D canvas
	canvas = document.getElementById('c');
	canvas.width = screenWidth;
	canvas.height = screenHeight;
	ctx = canvas.getContext('2d'); 

	//Load XML
	readFile(1);

	//Load images
	loadImages();

	//Timer interval - FPS
	setInterval(update, 1000/FPS);

	//Player init position
	placePlayer();
	
	//Read highscore
	readHighscore();

	//Initial values
	playerScore = 0;
	playerAmmo = PLAYER_AMMO;
	playerLives = PLAYER_LIVES;
	startText = 0;
	isScrolling = false;
}

function loadImages() {
	player.src = "images/plane_up.png";
	playerShadow.src = "images/plane_shadow.png";
	bullet.src = "images/bullet.png";
	map.src = "images/map1.jpg";
	redPlane.src = "images/red_plane.png";
	redPlaneUp.src = "images/red_plane_up.png";
	redPlaneUpShadow.src = "images/plane_shadow_up.png";
	ammoBox.src = "images/ammo.png";
	bonusBox.src = "images/bonus.png";
	pickupShadow.src = "images/pickup_shadow.png";
	enemyShadow.src = "images/plane_shadow2.png";
	cloud1.src = "images/cloud1.png";
	cloud2.src = "images/cloud2.png";
	cloud3.src = "images/cloud3.png";
}

function placePlayer() {
	xPos = (screenWidth / 2) - (playerWidth / 2);
	yPos = screenHeight - playerHeight * 4;
	//Initial map position
	mapPosition = screenHeight - 5000;	

	//displayStartText();
}

function displayPreStart() {
	ctx.font = '120px Impact';
	ctx.textAlign = 'center';
	ctx.fillStyle = "#000"; 
  	ctx.fillText("1940", (screenWidth / 2) + SHADOW_DISTANCE, (screenHeight / 3) + SHADOW_DISTANCE); 
  	ctx.fillStyle = "#fff"; 
  	ctx.fillText("1940", (screenWidth / 2), (screenHeight / 3)); 

  	ctx.font = '42px Impact';
  	ctx.fillStyle = "#000";
  	ctx.fillText("PRESS ANY KEY", (screenWidth / 2) + SHADOW_DISTANCE / 2, (screenHeight / 2 ) + SHADOW_DISTANCE / 2); 
  	ctx.fillText("TO START", (screenWidth / 2) + SHADOW_DISTANCE / 2, (screenHeight / 2 ) + 50 + SHADOW_DISTANCE / 2); 
	ctx.fillStyle = "#fff";
  	ctx.fillText("PRESS ANY KEY", screenWidth / 2, (screenHeight / 2 )); 
  	ctx.fillText("TO START", screenWidth / 2, (screenHeight / 2 ) + 50); 
  	//Reset values
  	playerScore = 0;
  	playerLives = PLAYER_LIVES;
  	playerAmmo = PLAYER_AMMO;
  	level = 1;
}

function displayStartText() {
	isScrolling = false;
	ctx.textAlign = 'center';
	ctx.font = '64px Impact';

	ctx.fillStyle = "#000"; 
  	ctx.fillText("LEVEL " + level, (screenWidth / 2) + SHADOW_DISTANCE / 2, (screenHeight / 2) + SHADOW_DISTANCE / 2); 
	ctx.fillStyle = "#fff"; 
  	ctx.fillText("LEVEL " + level, (screenWidth / 2), (screenHeight / 2)); 

  	ctx.font = '42px Impact';
	
	ctx.fillStyle = "#000";
  	ctx.fillText("GET READY!", (screenWidth / 2) + SHADOW_DISTANCE / 2, (screenHeight / 2 + 80) + SHADOW_DISTANCE / 2); 
  	ctx.fillStyle = "#fff";
  	ctx.fillText("GET READY!", (screenWidth / 2), (screenHeight / 2 + 80)); 
  	
  	//Read highscore
  	readHighscore();

  	//Timeout
  	window.setTimeout(function() { startScroll() }, 500);
}

function playEnd() {
	isScrolling = false;
	isPlaying = false;
	isDead = true;

	ctx.textAlign = 'center';
	ctx.font = '54px Impact';

	ctx.fillStyle = "#000"; 
  	ctx.fillText("GAME OVER!", (screenWidth / 2) + SHADOW_DISTANCE / 2, (screenHeight / 2) + SHADOW_DISTANCE / 2); 
	ctx.fillStyle = "#fff"; 
  	ctx.fillText("GAME OVER!", (screenWidth / 2), (screenHeight / 2)); 

  	ctx.font = '42px Impact';
	
	ctx.fillStyle = "#000";
  	ctx.fillText("YOUR SCORE: " + playerScore, (screenWidth / 2) + SHADOW_DISTANCE / 2, (screenHeight / 2 + 80) + SHADOW_DISTANCE / 2); 
  	ctx.fillStyle = "#fff";
  	ctx.fillText("YOUR SCORE: " + playerScore, (screenWidth / 2), (screenHeight / 2 + 80)); 
}

function nextLevel() {
	level ++;
	playerScore += 100;
	playerAmmo += 20;
	placePlayer();
	enemies = [];
	bullets = [];
	clouds = [];
	pickups = [];
	startText = 120;
	Sound.play("levelup");
}

function startScroll() {
	isScrolling = true;
}

function update() {
	checkInput();	
	checkBullets();
	checkEnemies();
	spawnEnemies();
	spawnPickups();
	spawnCloud();
	
	//Check collision pickup vs Player
	for(var i = 0; i < pickups.length; i++)
	{
		if(checkCollisionPickup(pickups[i]))
		{
			destroyPickup(i, pickups[i][2]);
		}
	}	

	//Check collision enemy vs Player
	for(var i = 0; i < enemies.length; i++)
	{
		if(checkCollisionPlayer(enemies[i]))
		{
			destroyPlayer();
		}
	}

	//Check collision enemy vs bullets
	for(var i = 0; i < enemies.length; i++)
	{
		if(checkCollisionBullet(i))
		{
			//Not
		}
	}

	//Scroll background
	if(isScrolling == true && isPlaying == true) { mapPosition = mapPosition + SCROLL_SPEED; }
	
	//Finished?
	if(mapPosition > 0)
	{
		mapPosition = 0;
		nextLevel();
	}
	
	//Draw to screen
	draw();
}


function draw() {
	//Clear screen
	ctx.clearRect(0, 0, screenWidth, screenHeight);

	//Draw the map
	ctx.drawImage(map,0,mapPosition);

	//Draw pickups
	for(var i = 0; i < pickups.length; i++)
	{
		if(pickups[i][2] == 0)
		{
			ctx.drawImage(pickupShadow, pickups[i][0] + SHADOW_DISTANCE / 2, pickups[i][1] + SHADOW_DISTANCE / 2); //Shadow
			ctx.drawImage(ammoBox, pickups[i][0], pickups[i][1]);
		}	
		else if(pickups[i][2] == 1)
		{
			ctx.drawImage(pickupShadow, pickups[i][0] + SHADOW_DISTANCE / 2, pickups[i][1] + SHADOW_DISTANCE / 2); //Shadow
			ctx.drawImage(bonusBox, pickups[i][0], pickups[i][1]);
		}
		else
		{
			//console.log("Error: " + pickups[i][2]);
		}
	}

	//Draw clouds - Bottom layer
	for(var i = 0; i < clouds.length; i++)
	{
		if(clouds[i][3] == 1) {
			if(clouds[i][2] == 0)
			{
				ctx.drawImage(cloud1, clouds[i][0], clouds[i][1]);
			}	
			else if(clouds[i][2] == 1)
			{
				ctx.drawImage(cloud2, clouds[i][0], clouds[i][1]);
			}
			else
			{
				ctx.drawImage(cloud3, clouds[i][0], clouds[i][1]);
			}
		}	
	}

	//Draw clouds - Mid layer
	for(var i = 0; i < clouds.length; i++)
	{
		if(clouds[i][3] == 2) {
			if(clouds[i][2] == 0)
			{
				ctx.drawImage(cloud1, clouds[i][0], clouds[i][1]);
			}	
			else if(clouds[i][2] == 1)
			{
				ctx.drawImage(cloud2, clouds[i][0], clouds[i][1]);
			}
			else
			{
				ctx.drawImage(cloud3, clouds[i][0], clouds[i][1]);
			}
		}	
	}	

	//Draw player
	if(isPlaying) {
		ctx.drawImage(playerShadow, xPos + SHADOW_DISTANCE, yPos + SHADOW_DISTANCE); //Shadow
		ctx.drawImage(player, xPos, yPos);
	}


	//Draw bullets
	for (var i = 0; i < bullets.length; i++) {
		ctx.drawImage(bullet, bullets[i][0], bullets[i][1]);
	}

	//Draw enemies
	for(var i = 0; i < enemies.length; i++)
	{
		if(enemies[i][3] == 1)
		{
			ctx.drawImage(redPlaneUpShadow, enemies[i][0] + SHADOW_DISTANCE, enemies[i][1] + SHADOW_DISTANCE); //Shadow
			ctx.drawImage(redPlane, enemies[i][0], enemies[i][1]);
		}
		else
		{
			ctx.drawImage(enemyShadow, enemies[i][0] + SHADOW_DISTANCE, enemies[i][1] + SHADOW_DISTANCE); //Shadow
			ctx.drawImage(redPlaneUp, enemies[i][0], enemies[i][1]);
		}	
	}

	//Draw clouds - Top layer
	for(var i = 0; i < clouds.length; i++)
	{
		if(clouds[i][3] == 3) {
			if(clouds[i][2] == 0)
			{
				ctx.drawImage(cloud1, clouds[i][0], clouds[i][1]);
			}	
			else if(clouds[i][2] == 1)
			{
				ctx.drawImage(cloud2, clouds[i][0], clouds[i][1]);
			}
			else
			{
				ctx.drawImage(cloud3, clouds[i][0], clouds[i][1]);
			}
		}	
	}		

	//Display HUD
	displayHud();

	//Draw debug info
	//ctx.fillStyle = "#fff"; // Set color to black
	//ctx.font = '16px Verdana';
  	//ctx.fillText("Pos" + mapPosition, screenWidth / 2, (screenHeight - 100));

  	if(startText > 0 && isDead == false)
  	{
  		displayStartText();
  		startText --;
  	}
	
	if(isPlaying == false && isDead == false)
	{
		displayPreStart();
	}

	if(isDead == true && isDeadText > 0)
	{
		playEnd();
		isDeadText --;
		if(isDeadText < 1)
		{
			isDead = false;
			startText = 0;
		}

	}

}

//Keyboard input
//Keyboard event handler
$(document).keydown(function (e) {
	
	if(isDead == false)
	{
		if(isPlaying == false) {
			isPlaying = true;
			startText = 120;
			displayStartText();
		}	
	}
	
    keys[e.which] = true;
});

$(document).keyup(function (e) {
    delete keys[e.which];
});

function fireBullet() {
	bulletshot = [(xPos + (playerWidth / 2) - bulletSize / 2), yPos - 10];
	bullets.push (bulletshot);
	bulletTimer = BULLLET_TIMEOUT;
	playerAmmo --;
	Sound.play("shoot");
}

function missFire() {
	Sound.play("click");
}

function checkInput() {
	//Check key input
	for (var i in keys) {
		if (!keys.hasOwnProperty(i)) continue;
		if(i == 37)
		{
			xPos -= PLAYER_SPEED;
		}
		if(i == 39)
		{
			xPos += PLAYER_SPEED;
		}
		if(i == 38)
		{
			yPos -= PLAYER_SPEED / 2;
		}
		if(i == 40)
		{
			yPos += PLAYER_SPEED / 2;
		}
		if(i == 32)
		{
			if(bulletTimer == 0)
			{
				if(playerAmmo > 0) {
					fireBullet();
				}
				else
				{
					missFire();
				}
			}			
		}
    }
}

function checkBullets() {
	//Check if ready to fire
	if(bulletTimer > 0) bulletTimer--;
	
	//Check out of bounds
	if(xPos < 0) xPos = 0;
	if(xPos > screenWidth - playerWidth) xPos = screenWidth - playerWidth;
	
	if(yPos < 0) yPos = 0;
	if(yPos > screenHeight - playerHeight) yPos = screenHeight - playerHeight;
	
	//Calculate bullet positions
	for (var i = 0; i < bullets.length; i++) {
		bulletPosition = bullets[i][1];
		//If out of bounds - remove
		if(bulletPosition < 0)
		{
			bullets.splice(i,1);
		}
		else
		{
			bullets[i][1] = bulletPosition - bulletSpeed;
		}		
	}
}

function checkEnemies() {
	//Check out of bounds
	for (var i = 0; i < enemies.length; i++) {
		if((enemies[i][1] > screenHeight + 100) || (enemies[i][1] < -70))
			enemies.splice(i,1);
	}
}

function spawnEnemies() {
	//Spawn enemies
	spawnEnemy();

	//Calculate enemy position
	for(var i = 0; i < enemies.length; i++)
	{
		enemyPositionY = enemies[i][1];
		var boost = 1;
		if(level > 1)
		{
			boost += (ENEMY_SPEED_MULTIPLIER * level);
		}
		if(enemies[i][3] == 1)
		{
			enemyPositionY = enemyPositionY + (enemies[i][2] + boost);
		}
		else
		{
			enemyPositionY = enemyPositionY - (enemies[i][2] + boost);
		}

		enemies[i][1] = enemyPositionY;
	}
}

function spawnEnemy() {
	//Check if avaible
	for (var i = 0; i < enemyData.length; i++) {
		var tempYPos;
		var tempPos = enemyData[i][0];

		if(tempPos == mapPosition)
		{
			var tempXPos = enemyData[i][1];
			var tempType = enemyData[i][2];
			var tempSpeed = enemyData[i][3];
			//var tempSpeed = 1;
			var tempDirection = enemyData[i][4];
			if(tempDirection == 1)
			{

				tempYPos = 0 - ENEMY_SIZE;
			}
			else
			{
				tempYPos = screenHeight + ENEMY_SIZE;
			}
			enemy = [tempXPos, tempYPos, tempSpeed, tempDirection];
			enemies.push (enemy);			
		}		
	}	

	//Random enemies
	if(isPlaying == true && level > 1)
	{
		var spawnSeed = 500 - (level * 2);
		if(spawnSeed < 100)
			spawnSeed = 100;

		var randEnemy = Math.floor((Math.random() * spawnSeed) + 1);

		if(randEnemy == 1)
		{
			var randomX = Math.floor((Math.random() * (screenWidth - playerWidth)) + 1);
			var randDir = Math.floor((Math.random() * 2) + 1) -1;
			var randSpeed = Math.floor((Math.random() * 2) + 1);
			var randY;
			if(randDir == 0)
			{
				randY = screenHeight + ENEMY_SIZE;
			}
			else
			{
				randY = 0 - ENEMY_SIZE;
			}
			enemy = [randomX, randY, randSpeed, randDir];
			enemies.push (enemy);
		}
	}
	
}

function spawnPickups() {
	spawnPickup();

	//Calculate pickup position
	for(var i = 0; i < pickups.length; i++)
	{
		var pickupPositionY = pickups[i][1];
		pickupPositionY = pickupPositionY + 1;
		pickups[i][1] = pickupPositionY;
	}
}

function spawnPickup() {
	//Check if avaible
	for (var i = 0; i < pickupData.length; i++) {
		
		var tempPos = pickupData[i][0];

		if(tempPos == mapPosition)
		{
			var tempXPos = pickupData[i][1];
			var tempYPos;
			tempYPos = - PICKUP_SIZE;
			var tempType = pickupData[i][2];

			pickup = [tempXPos, tempYPos, tempType];
			pickups.push (pickup);			
		}		
	}	
}

function spawnCloud() {
	var spawn = Math.floor((Math.random() * CLOUD_SEED) + 1);
	if(spawn == 1) {
		var cloudx = Math.floor((Math.random() * (screenWidth + 100)) - 50);
		var cloudtype = Math.floor((Math.random() * 3) + 1);
		var cloudz = Math.floor((Math.random() * 3) + 1);
		var cloudy = -555;
		var cloud = new Array();

		cloud = [cloudx, cloudy, cloudtype, cloudz];
		clouds.push (cloud);
	}

	//Calculate pickup position
	for(var i = 0; i < clouds.length; i++)
	{
		var cloudPositionY = clouds[i][1];
		cloudPositionY = cloudPositionY + clouds[i][3];
		clouds[i][1] = cloudPositionY;

		//Remove cloud
		if(cloudPositionY > screenHeight + 550)
			clouds.splice(i,1);
	}

}

function collides(ax, ay, bx, by, awidth, aheight, bwidth, bheight) {
 return ax < bx + bwidth &&
         ax + awidth > bx &&
         ay < by + bheight &&
         ay + aheight > by;     
}

function checkCollisionPlayer(enemy) {
	//Plane vs Player

	enemyPositionX = enemy[0];
	enemyPositionY = enemy[1];

	isCollidingX = Math.abs(xPos - enemyPositionX);
	isCollidingY = Math.abs(yPos - enemyPositionY);

	if(isCollidingX < ENEMY_SIZE && isCollidingY < ENEMY_SIZE)
	{
		isColliding = true;
	}
	else
	{
		isColliding = false;
	}
	
	return isColliding;
}

function checkCollisionPickup(pickup) {
	//Plane vs Player
	var pickupPositionX = pickup[0];
	var pickupPositionY = pickup[1];

	isCollidingX = Math.abs(xPos - pickupPositionX);
	isCollidingY = Math.abs(yPos - pickupPositionY);

	if(isCollidingX < PICKUP_SIZE && isCollidingY < PICKUP_SIZE)
	{
		isColliding = true;
	}
	else
	{
		isColliding = false;
	}
	
	return isColliding;
}

function checkCollisionBullet(enemyindex) {
	//Plane vs Player
	isHit = false;
	enemyPositionX = enemies[enemyindex][0];
	enemyPositionY = enemies[enemyindex][1];

	for (var i = 0; i < bullets.length; i++) {
		var bulletPositionX = bullets[i][0];
		var bulletPositionY = bullets[i][1];

		if(collides(enemyPositionX, enemyPositionY, bulletPositionX, bulletPositionY, ENEMY_SIZE, ENEMY_SIZE, bulletSize, bulletSize))
		{
			destroyEnemy(enemyindex);
			destroyBullet(i);
		}
	}
}

function destroyPlayer() {
	//Remove current objects
	enemies = [];
	pickups = [];
	clouds = [];
	bullets = [];
	
	playerAmmo += 5;

	Sound.play("boom");

	//Remove Life
	playerLives --;

	if(playerLives < 1)
	{
		isDead = true;
		startText = 0;
		//If Highscore
		if(playerScore > highscore)
		{	
			storeHighscore(playerScore);
		}
		playEnd();
	}
		
	//Place player at bottom
	startText = 120;
	placePlayer();
}

function destroyEnemy(enemyindex){
	enemies.splice(enemyindex, 1);
	playerScore += 10;
	Sound.play("explode");
}

function destroyBullet(bulletindex){
	bullets.splice(bulletindex, 1);
}

function destroyPickup(pickupindex, pickuptype){
	// Pickuptype 0 = ammo, 1 = bonus
	if(pickuptype == 0)
	{
		Sound.play("reload");
		playerAmmo += 10;
	}
		
	if(pickuptype == 1)
	{	
		playerScore += 50;
		Sound.play("bonus");
	}
		
	pickups.splice(pickupindex, 1);
}