<?php

if(isset($_POST['register'])){ 
    $email = htmlspecialchars($_POST['email']); 
    $password = htmlspecialchars($_POST['password']);
    $password_hashed = password_hash
    $sql = "SELECT * FROM Patient WHERE email=?";

    $stms = $this->conn->prepare($sql);
    $stms->bindValue(1,$email,PDO::PARAM_STR);
    $patient = $stms->fetch();
    if($patient && password_verify($password,$patient["password"])) {
        $_SESSION["login"] = "P".$patient["Pid"];
    }
}