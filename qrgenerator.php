<?php
$username = $_POST["username"];
$session = $_POST["session"];
$speaker=$_POST["speaker"];
$email = $_POST["email"];

$connect = mysqli_connect('localhost', 'root', '', 'conferenceday');

$sql = "INSERT INTO qrgenerator(username,`session`,speaker, email)  /*all visiters are call customers if the customer register the event then that customer is a participent */
        VALUES('$username', '$session','$speaker', '$email')";

$result = mysqli_query($connect, $sql);

if ($result){
    $queryString = http_build_query([
        'username' => $username,
        'session' => $session,
        'speaker' => $speaker,
        'email' => $email,
        
    ]);
    header("Location: qrgen.html?$queryString");
    exit();
    
    
}
else{
    echo "<script>location.replace('')</script>";
}

?>