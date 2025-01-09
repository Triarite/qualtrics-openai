<?php

require_once 'config.php'; // Make sure this file contains the DB connection setup

// Used as an API call on the Qualtrics end to fetch the next
// available UID and mark it as fetched (isFetched = 1)

// Function to fetch UID and mark it as fetched
function qltrxFetch($conn) {
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
            $conn->rollBack(); // Roll back the transaction
            return json_encode(["error" => "No unused uid found"]);
        }

        $uid = $result['uid'];

        // Step 2: Mark the retrieved UID as used
        $stmt = $conn->prepare($updateQuery);
        $stmt->bindParam(':uid', $uid, PDO::PARAM_STR);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            // Commit the transaction
            $conn->commit();
            // Return the fetched UID as a response
            return json_encode(["uid" => $uid, "message" => "uid marked as used"]);
        } else {
            // Roll back if the update fails
            $conn->rollBack();
            return json_encode(["error" => "Failed to mark uid as used"]);
        }
    } catch (Exception $e) {
        // Roll back the transaction in case of error
        $conn->rollBack();
        return json_encode(["error" => "Error processing request: " . $e->getMessage()]);
    }
}

// Handle GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Call the function to fetch UID
    $response = qltrxFetch($conn);

    // Set content type to JSON
    header('Content-Type: application/json');

    // Output the response
    echo $response;
}
?>
