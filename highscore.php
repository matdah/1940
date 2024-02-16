<?php

// Read highscore.json
$highscore = file_get_contents('highscore.json');

// Return as JSON
header('Content-Type: application/json');
echo $highscore;

// $file_handle = fopen("highscore.txt", "r");
// while (!feof($file_handle)) {
//     $line = fgets($file_handle);
//     echo $line;
// }
// fclose($file_handle);

// //echo 99;
?>

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
