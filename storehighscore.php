<?php
if (isset($_POST['newscore'])) {
    file_put_contents("test", "Hello World. Testing!");
    $newscore = $_POST['newscore'];
    $playername = $_POST['playerName'];

    $highscore = file_get_contents('highscore.json');
    $highscore = json_decode($highscore, true);

    $highscore[] = array('name' => $playername, 'score' => $newscore);

    usort($highscore, function ($a, $b) {
        return $b['score'] - $a['score'];
    });

    $highscore = array_slice($highscore, 0, 10);

    file_put_contents('highscore.json', json_encode($highscore));

    echo json_encode($highscore);
} else {
    file_put_contents("test", "Nopes...");
}
