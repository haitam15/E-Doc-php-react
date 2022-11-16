<?php

    class Medecin {
        private $email;
        private $password;
        private $name;

        function __construct($email,$password,$name) {
            $this->email = $email;
            $this->password = $password;
            $this->name = $name;
        }

        function getEmail() {
            return $this->email;
        }

        function getPassword() {
            return $this->password;
        }

        function getName() {
            return $this->name;
        }

    }

    class MedecinManager {

        private $conn;

        public function __construct($db){
            
            $this->conn = $db;
        }

        function UpdateMedecin($medecin) {
            $upd = "UPDATE Medecin SET name=:name,email=:email,password=:password";
            $stmu = $this->conn->prepare($upd);
            $stmu->bindValue("name",$medecin->getName(),PDO::PARAM_STR);
            $stmu->bindValue("email",$medecin->getEmail(),PDO::PARAM_STR);
            $stmu->bindValue("password",$medecin->getPassword(),PDO::PARAM_STR);
            $stmu->execute();
    
        }

        function getMedecinByEmail($email) {
            $sel = "SELECT * FROM MEdecin WHERE email=?";
            $stms = $this->conn->prepare($sel);
            $stms->bindValue(1,$email,PDO::PARAM_STR);
            $stms->execute();
            $secretaire = $stms->fetch(PDO::FETCH_ASSOC);
            return $secretaire;
        }

    }

?>