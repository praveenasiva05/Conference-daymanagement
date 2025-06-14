<?php
$username = $_POST['username'];
$password = $_POST['password'];

if ($username == 'ADMIN' && $password == 'Admin001') {
    // Redirect to admin dashboard
    echo '<script>
            alert("Success");
            location.replace("Admin.html");
          </script>';
} else {
    // Database connection
    $conn = new mysqli('localhost', 'root', '', 'conferenceday');

    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    // SQL queries
    $sqlcu = "SELECT * FROM participants WHERE username = '$username' AND password = '$password'";
    
    
    // Execute queries
    $cu = mysqli_query($conn, $sqlcu);
    
    
    // Verify if rows were returned
    if (mysqli_num_rows($cu) > 0) {
        echo "<script>location.replace('dash.html');</script>";
    } else {
        // Show an error message
        echo '<script>
                alert("Something went wrong! Invalid username or password.");
                history.back();
              </script>';
    }

    // Close the statement and connection
    $conn->close();
}
?>
