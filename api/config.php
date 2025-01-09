<?php
// Database configuration
$host = "localhost";
$username = "root";
$password = "";
$db_name = "vision-video";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $exception) {
    // echo json_encode(["error" => "Connection error: " . $exception->getMessage()]);
    exit();
}
?>
