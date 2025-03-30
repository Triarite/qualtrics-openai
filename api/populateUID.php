<?php

require_once 'config.php';

// Populates MySQL database with 10,000 new UIDs
// !!! WARNING: OVERWRITES *ALL* DATA !!! //
// ^^ To prevent accidental usage, takes "passkey" variable as argument which must be equal to "overwrite" ^^ //


function populateUID(PDO $conn, $passkey): void {
    // Columns Config
    $isFetched = 0;
    $isAssigned = 0;
    $unixtime = 0;
    $conversation = '';



    if ($passkey == "overwrite") {
        try {
            // Clear existing data
            $sqlClear = "TRUNCATE TABLE interactions";
            $conn->exec($sqlClear); // Use exec for non-prepared statements
    
            $stmt = $conn->prepare("INSERT INTO interactions (uid, isFetched, isAssigned, `unix-time`, conversation) VALUES (:uid, $isFetched, $isAssigned, $unixtime, $conversation)");
    
            // Begin transaction
            $conn->beginTransaction();
    
            for ($i = 34971; $i < 44971; $i++) { // Loop for 10,000 records, using random-ish numbers to reduce UID guessability
                $stmt->bindValue(':uid', $i, PDO::PARAM_INT); // Bind the UID to the named placeholder
                $stmt->execute(); // Execute the statement
            }
    
            // Commit transaction
            $conn->commit();
    
            echo "Successfully populated 10,000 records!";
        } catch (Exception $e) {
            // Rollback transaction in case of error
            $conn->rollBack();
            die("Error inserting records: " . $e->getMessage());
        }    
    } else {
        die("Error: Incorrect passkey for populating UIDs! Please input the correct passkey or remove the populate_uid() function call.");
    }
}
