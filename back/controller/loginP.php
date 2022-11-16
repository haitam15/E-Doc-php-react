<?php

if(isset($_POST['login'])){ 
    $email = htmlspecialchars($_POST['email']); 
    $password = htmlspecialchars($_POST['password']);

    if ($email && $password) {
        $pm = new PatientManager($db);
        $patient = $pm->getPatientByEmail();
        if($patient && password_verify($password,$patient["password"])) {
            $_SESSION["login"] = "P".$patient["Pid"];
        }

    }
}