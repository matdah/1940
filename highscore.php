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