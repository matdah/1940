function displayHud() {

	if(isPlaying)
	{
		ctx.font = '18px Impact';
	  	ctx.fillStyle = "#000";
	  	ctx.fillText("SCORE: " + playerScore, (55) + 3, (30) + 3); 
	  	ctx.fillText("HIGHSCORE: " + highscore, (200) + 3, (30) + 3);
	  	ctx.fillText("AMMO: " + playerAmmo, (150) + 3, (screenHeight - 20 ) + 3); 
	  	ctx.fillText("LIVES: " + playerLives, (250) + 3, (screenHeight - 20 ) + 3); 
	  	ctx.fillText("LEVEL: " + level, (350) + 3, (30) + 3); 
	  	
	  	ctx.fillStyle = "#fff";
	  	ctx.fillText("SCORE: " + playerScore, (55) , (30)); 
	  	ctx.fillText("HIGHSCORE: " + highscore, (200) , (30));
	  	ctx.fillText("AMMO: " + playerAmmo, (150) , (screenHeight - 20 ));
	  	ctx.fillText("LIVES: " + playerLives, (250) , (screenHeight - 20 ));
	  	ctx.fillText("LEVEL: " + level, (350) , (30));
	}

} 