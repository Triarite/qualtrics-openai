<?php

require_once 'config.php';

// File that is called to grab a UID that has been fetched Qualtrics-side,
// but not yet assigned to a conversation.

// Check if the UID is provided in the request
if (!isset($_GET['uid']) || empty($_GET['uid'])) {
    echo json_encode(["error" => "UID parameter is missing or empty"]);
    exit();
}

$uid = $_GET['uid'];  // Get the UID from the GET request

// SQL queries
$fetchQuery = "SELECT uid FROM interactions WHERE uid = :uid AND isFetched = TRUE AND isAssigned = FALSE LIMIT 1";
$updateQuery = "UPDATE interactions SET isAssigned = TRUE WHERE uid = :uid";

// Try-catch block for error handling
try {
    // Start a transaction
    $conn->beginTransaction();

    // Step 1: Check if the given UID is unused and fetched
    $stmt = $conn->prepare($fetchQuery);
    $stmt->bindParam(':uid', $uid, PDO::PARAM_STR);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$result) {
        // No matching unused UID found
        $conn->rollBack(); // Roll back the transaction
        echo json_encode(["error" => "No unused UID found or UID is already assigned"]);
        exit();
    }

    // Step 2: Mark the provided UID as used
    $stmt = $conn->prepare($updateQuery);
    $stmt->bindParam(':uid', $uid, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        // Commit the transaction
        $conn->commit();
        // Return the provided UID as a response
        echo json_encode(["uid" => $uid, "message" => "UID marked as used"]);
    } else {
        // Roll back if the update fails
        $conn->rollBack();
        echo json_encode(["error" => "Failed to mark UID as used"]);
    }

} catch (Exception $e) {
    // Roll back the transaction in case of error
    $conn->rollBack();
    echo json_encode(["error" => "Error processing request: " . $e->getMessage()]);
}
?>
