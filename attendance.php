<?php
date_default_timezone_set("Asia/Colombo"); 
$name = $_COOKIE['data1'];
$session = $_COOKIE['data2'];
$currentTime  = date("H:i:s");



 $crrentdate = date("y-m-d");

$connect = mysqli_connect('localhost', 'root', '', 'conferenceday');

if (!$connect) {
    die("Connection failed: " . mysqli_connect_error());
}

// Query to check if email exists for a given name
$sql1 = "SELECT email FROM qrgenerator WHERE username = ?";

$sql2 = "INSERT INTO attendance(`name`,`session`, currentTime) VALUES(?, ?, ?)";

// Prepare and execute the first query to fetch email based on name
$stmt1 = mysqli_prepare($connect, $sql1);
mysqli_stmt_bind_param($stmt1, "s", $name);
mysqli_stmt_execute($stmt1);
mysqli_stmt_store_result($stmt1);

if (mysqli_stmt_num_rows($stmt1) > 0) {
    // Bind and fetch email from the result of the first query
    mysqli_stmt_bind_result($stmt1, $db_email);
    mysqli_stmt_fetch($stmt1);
    
    // If the fetched email doesn't match the provided email
    if ($db_email != $email) {
        // Insert the attendance record using a prepared statement
        $stmt2 = mysqli_prepare($connect, $sql2);
        mysqli_stmt_bind_param($stmt2, "sss", $name, $session,$currentTime);
        
        if (mysqli_stmt_execute($stmt2)) {
            echo "<script> alert('Success! your attendence is marked');location.replace('admin.html');</script>";
        } else {
            echo "Error: " . mysqli_error($connect);
        }
        mysqli_stmt_close($stmt2);
    }
} else {
    echo "No record found for name: " . $name;
}

mysqli_stmt_close($stmt1);
mysqli_close($connect);
?>
