
function readFile(level) {
	$.ajax({
		type: "GET",
		url: "level.xml",
		dataType: "xml",
		success: parseXml
	});
}

function parseXml(xml) {
	var enPos, enType, enXPos, enSpeed, enDirection;
	var piPos, piXPos, piType;
	var tempArr = new Array();

	//Enemies
	$(xml).find("enemy").each(function () {
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
	$(xml).find("pickup").each(function () {
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

$.ajaxSetup({
	cache: false
});
function readHighscore() {
	// Fetch highscore from server
	fetch('highscore.php').
		then(response => response.json()).
		then(data => {
			// Sort array by score
			data.sort(function (a, b) {
				return b.score - a.score;
			});

			// Return highscore
			returnHighscore(data[0].score)
		});
}

function returnHighscore(data) {
	highscore = data;
}
function storeHighscore(newscore, playerName) {
	console.log("Saving...");

	// Save highscore to server
	// New form data
	var formData = new FormData();
	formData.append("score", newscore);
	formData.append("playerName", playerName);

	// Send data to server
	fetch('highscore.php', {
		method: 'POST',
		body: formData
	}).
		then(response => response.json()).
		then(data => {
			// Sort array by score
			data.sort(function (a, b) {
				return b.score - a.score;
			});

			// Return highscore
			storedHighscore(data[0].score)
		});
}

function storedHighscore(newscore) {
	highscore = newscore;
}
