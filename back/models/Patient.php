<?php

    class Patient {
        private $email;
        private $password;
        private $cin;
        private $name;

        function __construct($email,$password,$cin,$name) {
            $this->email = $email;
            $this->password = $password;
            $this->cin = $cin;
            $this->name = $name;
        }

        function getEmail() {
            return $this->email;
        }

        function getPassword() {
            return $this->password;
        }

        function getCin() {
            return $this->cin;
        }

        function getName() {
            return $this->name;
        }
    }

    interface PIAdmin {
        function getPatient($Pid);
        function AddPatient($patient);
        function UpdatePatient($patient,$Pid);
        function DelPatient($Pid);
        function getPatientByEmail($email);
        function getPatientByCin($cin);
    }

    class PatientManager implements PIAdmin{

        private $conn;
        private $table = 'Patient';

        public function __construct($db){
            
            $this->conn = $db;
        }

        function getPatient($Pid) {
            $sel = "SELECT * FROM Patient WHERE Pid=?";
            $stms = $this->conn->prepare($sel);
            $stms->bindValue(1,$Pid,PDO::PARAM_INT);
            $stms->execute();
            $patient = $stms->fetch(PDO::FETCH_ASSOC);
            return $patient;
        }

        function getAllPatients(){
            $sel = "SELECT PID, name, cin, email FROM Patient";
            $stms = $this->conn->prepare($sel);
            $stms->execute();
            return $stms;
        }

        function AddPatient($patient) {
            $ins = "INSERT INTO Patient VALUES(NULL,:name,:cin,:email,:password) ";
            $stmi = $this->conn->prepare($ins);
            $stmi->bindValue("name",$patient->getName(),PDO::PARAM_STR);
            $stmi->bindValue("cin",$patient->getCin(),PDO::PARAM_STR);
            $stmi->bindValue("email",$patient->getEmail(),PDO::PARAM_STR);
            $stmi->bindValue("password",$patient->getPassword(),PDO::PARAM_STR);
            return $stmi->execute();
        }

        function UpdatePatient($patient,$Pid) {
            $upd = "UPDATE Patient SET name=:name,cin=:cin,email=:email,password=:password WHERE Pid=:Pid";
            $stmu = $this->conn->prepare($upd);
            $stmu->bindValue("name",$patient->getName(),PDO::PARAM_STR);
            $stmu->bindValue("cin",$patient->getCin(),PDO::PARAM_STR);
            $stmu->bindValue("email",$patient->getEmail(),PDO::PARAM_STR);
            $stmu->bindValue("password",$patient->getPassword(),PDO::PARAM_STR);
            return $stmu->execute();
    
        }

        function DelPatient($Pid) {
            $del = "DELETE FROM ¨Patient WHERE Pid=?";
            $stmd = $this->conn->prepare($del);
            $stmd->bindValue(1,$Pid,PDO::PARAM_INT);
            return $stmd->execute();
        }

        function getPatientByEmail($email) {
            $sel = "SELECT * FROM Patient WHERE email=?";
            $stms = $this->conn->prepare($sel);
            $stms->bindValue(1,$email,PDO::PARAM_STR);
            $stms->execute();
            $patient = $stms->fetch(PDO::FETCH_ASSOC);
            return $patient;
        }

        function getPatientByCin($cin) {
            $sel = "SELECT * FROM Patient WHERE cin=?";
            $stms = $this->conn->prepare($sel);
            $stms->bindValue(1,$cin,PDO::PARAM_STR);
            $stms->execute();
            $patient = $stms->fetch(PDO::FETCH_ASSOC);
            return $patient;
        }



    }

?>