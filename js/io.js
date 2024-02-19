
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
	console.log("Reading highscore...");
	// Read from localstorage
	let highscores = JSON.parse(localStorage.getItem("highscores"));

	console.table(highscores);

	if (highscores == null) {
		returnHighscore(0);
	} else {
		// Get highest score
		let highest = 3;
		for (let i = 0; i < highscores.length; i++) {
			if (highscores[i].score > highest) {
				highest = highscores[i].score;
			}
		}

		console.log("Highscore: " + highest);
		returnHighscore(highest);
	}
}

function returnHighscore(data) {
	highscore = data;
}
function storeHighscore(newscore, playerName) {
	console.log("Saving...");

	let newScore = {
		score: newscore,
		name: playerName
	};

	// Read from localstorage
	let storedscores = JSON.parse(localStorage.getItem("highscores"));

	if (storedscores == null) {
		storedscores = [];

		// Save to localstorage
		localStorage.setItem("highscores", JSON.stringify(storedscores));
	}

	// Add item to storedscores
	storedscores.push(newScore);

	// Sort by score
	storedscores.sort(function (a, b) {
		return b.score - a.score;
	});

	// Save to localstorage
	localStorage.setItem("highscores", JSON.stringify(storedscores));

	// Display highscorelist
	displayHighScoreList();
}

function storedHighscore(newscore) {
	highscore = newscore;
}
