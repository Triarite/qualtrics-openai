<?php

require_once 'config.php';

// Fetches UID from cookie and updates row to have user conversation and
// unix time at completion of interaction.

$uid = $_COOKIE['uid'];

echo $uid;

?>