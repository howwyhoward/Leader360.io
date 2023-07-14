<?php
    $Email = $_POST['Email'];
    $First_Name = $_POST['First_Name'];
    $Last_Name = $_POST['Last_Name'];
    $UserName = $_POST['Username'];
    $Password = $_POST['Password'];

    // DataBase Connecion

    $conn = new mysqli('localhost', 'root', '', 'Leadership360NEW');
    if ($conn -> connect_error){
        die('Connection Failed: ' . $conn->connect_error);
    } else {
        $stmt = $conn -> prepare("insert into SignIN(Email, First_Name, Last_Name, Username, Password)
            values(?, ?, ?, ?, ?)");
        $stmt -> bind_param("s,s,s,s,s", $Email, $First_Name, $Last_Name, $UserName, $Password);
        $stmt -> execute();
        echo "SignIN Succesful";
        $stmt -> close();
        $conn -> close();
    }
?>