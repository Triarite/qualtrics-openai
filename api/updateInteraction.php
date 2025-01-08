<?php

require_once 'config.php';

// Fetches UID from cookie and updates row to have user conversation and
// unix time at completion of interaction.

$uid = $_COOKIE['uid'];
$unix_time = time();

$jsonData = file_get_contents('php://input');
$conversation = json_decode($jsonData, true); // true converts it to an associative array


echo json_encode([
    'uid' => $uid,
    'unix_time' => $unix_time,
    'conversation' => $conversation
]);


?>