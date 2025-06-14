<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Getting user input
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Connect to the database
    $conn = mysqli_connect('localhost', 'root', '', 'conferenceday');
    if (mysqli_connect_errno()) {
        die("Database connection failed: " . mysqli_connect_error());
    }

    // Prepare and bind the statement
    $stmt = $conn->prepare("INSERT INTO participants(username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $username, $password);

    // Check if the query executes successfully
    if ($stmt->execute()) {
        echo '<script>alert("Success");location.replace("login.html");</script>';
    } else {
        echo "Something went wrong: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>
