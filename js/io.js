
function readFile(level) {
	$.ajax({
    	type: "GET",
    	url: "level.xml",
    	dataType: "xml",
    	success: parseXml
  	});
}

function parseXml(xml)
{
	var enPos, enType, enXPos, enSpeed, enDirection;
	var piPos, piXPos, piType;
	var tempArr = new Array();

	//Enemies
	$(xml).find("enemy").each(function()
	{
	enPos = $(this).find("position").text();
	enXPos = $(this).find("xposition").text();
	enType = $(this).find("type").text();
	enSpeed = $(this).find("speed").text();
	enDirection = $(this).find("direction").text();

	tempArr[0] = enPos;
	tempArr[1] = parseInt(enXPos);
	tempArr[2] = parseInt(enType);
	tempArr[3] = parseInt(enSpeed);
	tempArr[4] = parseInt(enDirection);

	enemyData.push(tempArr);
	tempArr = [];
	});

	//Pickups
	$(xml).find("pickup").each(function()
	{
	piPos = $(this).find("position").text();
	piXPos = $(this).find("xposition").text();
	piType = $(this).find("type").text();

	tempArr[0] = piPos;
	tempArr[1] = parseInt(piXPos);
	tempArr[2] = parseInt(piType);

	pickupData.push(tempArr);
	tempArr = [];
	});
}

$.ajaxSetup ({
	cache: false
});
function readHighscore() {
	$.get('highscore.php', returnHighscore);
}

function returnHighscore(data) {
    highscore = data;
}
function storeHighscore(newscore){
	$.get('highscore.php?newscore=' + newscore, storedHighscore(newscore));
}

function storedHighscore(newscore){
	highscore = newscore;
}
