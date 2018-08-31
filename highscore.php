<?php

$file_handle = fopen("highscore.txt", "r");
while (!feof($file_handle)) {
   $line = fgets($file_handle);
   echo $line;
}
fclose($file_handle);

	//echo 99;
?>

<?php
if(isset($_GET['newscore'])) {
    $newscore = $_GET['newscore'];
    $myFile = "highscore.txt";
	$fh = fopen($myFile, 'w') or die("can't open file");
	fwrite($fh, $newscore);
	fclose($fh);
}
