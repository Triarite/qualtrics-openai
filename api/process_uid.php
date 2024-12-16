<?php
// Include the database configuration
require_once 'config.php';

// SQL query to fetch the first unused UID
$fetchQuery = "SELECT uid FROM interactions WHERE isFetched = FALSE LIMIT 1";
// SQL query to mark the UID as used
$updateQuery = "UPDATE interactions SET isFetched = TRUE WHERE uid = :uid";

try {
    // Start a transaction
    $conn->beginTransaction();

    // Step 1: Fetch the first unused UID
    $stmt = $conn->prepare($fetchQuery);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$result) {
        // No unused UID found
        echo json_encode(["error" => "No unused uid found"]);
        $conn->rollBack(); // Roll back the transaction
        exit();
    }

    $uid = $result['uid'];

    // Step 2: Mark the retrieved UID as used
    $stmt = $conn->prepare($updateQuery);
    $stmt->bindParam(':uid', $uid, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        // Commit the transaction
        $conn->commit();
        // Respond with the fetched UID
        echo json_encode(["uid" => $uid, "message" => "uid marked as used"]);
    } else {
        // Roll back if the update fails
        $conn->rollBack();
        echo json_encode(["error" => "Failed to mark uid as used"]);
    }
} catch (Exception $e) {
    // Roll back the transaction in case of error
    $conn->rollBack();
    echo json_encode(["error" => "Error processing request: " . $e->getMessage()]);
}