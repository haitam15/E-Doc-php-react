<?php

    class Secretaire {
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

    class SecretaireManager {

        private $conn;
        private $table = 'Secretaire';

        public function __construct($db){
            
            $this->conn = $db;
        }

        function UpdateSecretaire($secretaire) {
            $upd = "UPDATE Secretaire SET name=:name,email=:email,password=:password";
            $stmu = $this->conn->prepare($upd);
            $stmu->bindValue("name",$secretaire->getName(),PDO::PARAM_STR);
            $stmu->bindValue("email",$secretaire->getEmail(),PDO::PARAM_STR);
            $stmu->bindValue("password",$secretaire->getPassword(),PDO::PARAM_STR);
            $stmu->execute();
    
        }

        function getSecreataireByEmail($email) {
            $sel = "SELECT * FROM Secretaire WHERE email=?";
            $stms = $this->conn->prepare($sel);
            $stms->bindValue(1,$email,PDO::PARAM_STR);
            $stms->execute();
            $secretaire = $stms->fetch(PDO::FETCH_ASSOC);
            return $secretaire;
        }

    }

?>