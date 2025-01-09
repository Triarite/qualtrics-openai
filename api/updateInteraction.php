<?php

require_once 'config.php';

// Fetches UID from cookie and updates row to have user conversation and
// unix time at completion of interaction.

$uid = $_COOKIE['uid'];
$unix_time = time();

$jsonData = file_get_contents('php://input');
$conversation = json_decode($jsonData, true);

// Prepare the SQL query to update the row
$query = "UPDATE interactions SET `unix-time` = :unix_time, `conversation` = :conversation WHERE uid = :uid";

try {
    // Prepare the statement
    $stmt = $conn->prepare($query);

    // Bind the parameters
    $stmt->bindParam(':unix_time', $unix_time, PDO::PARAM_INT);
    $stmt->bindParam(':conversation', $jsonData, PDO::PARAM_STR);
    $stmt->bindParam(':uid', $uid, PDO::PARAM_STR);

    // Execute the statement
    $stmt->execute();

    echo json_encode([
        'status' => 'success',
        'uid' => $uid,
        'unix_time' => $unix_time,
        'conversation' => $conversation
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to update the database: ' . $e->getMessage()
    ]);
}

?>
