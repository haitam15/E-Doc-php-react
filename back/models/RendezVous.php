<?php

    class RendezVous {
        private $Pid;
        private $jour;
        private $M_S;
        private $ordre;

        function __construct($Pid,$jour,$M_S,$ordre) {
            $this->Pid = $Pid;
            $this->jour = $jour;
            $this->M_S = $M_S;
            $this->ordre = $ordre;
        }

        function getPid() {
            return $this->Pid;
        }

        function getM_S() {
            return $this->M_S;
        }

        function getJour() {
            return $this->jour;
        }

        function getOrdre() {
            return $this->ordre;
        }

    }

    interface RIAdmin {
        function getRendezVous($Rid);
        function AddRendezVous($rendezVous);
        function UpdateRendezVous($rendezVous,$Rid);
        function DelRendezVous($Rid);
        function getRendezVousByDay($jour);
    }

    class RendezVousManager implements RIAdmin{

        private $conn;
        private $table = 'RendezVous';

        public function __construct($db){
            
            $this->conn = $db;
        }

        function getRendezVous($Rid) {
            $sel = "SELECT * FROM RendezVous WHERE Rid=?";
            $stms = $this->conn->prepare($sel);
            $stms->bindValue(1,$Rid,PDO::PARAM_INT);
            $stms->execute();
            $rendezVous = $stms->fetch(PDO::FETCH_ASSOC);
            return $rendezVous;
        }

        function AddRendezVous($rendezVous) {
            $ins = "INSERT INTO RendezVous VALUES(NULL,:Pid,:jour,:M_S,:ordre) ";
            $stmi = $this->conn->prepare($ins);
            $stmi->bindValue("Pid",$rendezVous->getPid(),PDO::PARAM_INT);
            $stmi->bindValue("jour",$rendezVous->getJour(),PDO::PARAM_STR);
            $stmi->bindValue("M_S",$rendezVous->getM_S(),PDO::PARAM_STR);
            $stmi->bindValue("ordre",$rendezVous->getOrdre(),PDO::PARAM_INT);
            return $stmi->execute();
        }

        function UpdateRendezVous($rendezVous,$Rid) {
            $upd = "UPDATE RendezVous SET jour=:jour,M_S=:M_S,ordre=:ordre WHERE Rid=:Rid";
            $stmu = $this->conn->prepare($upd);
            $stmu->bindValue("jour",$rendezVous->getJour(),PDO::PARAM_STR);
            $stmu->bindValue("M_S",$rendezVous->getM_S(),PDO::PARAM_STR);
            $stmu->bindValue("ordre",$rendezVous->getOrdre(),PDO::PARAM_INT);
            $stmu->bindValue("Rid",$Rid,PDO::PARAM_INT);
            return $stmu->execute();
        }

        function DelRendezVous($Rid) {
            $del = "DELETE FROM RendezVous WHERE Rid=?";
            $stmd = $this->conn->prepare($del);
            $stmd->bindValue(1,$Rid,PDO::PARAM_INT);
            return $stmd->execute();
        }

        function getRendezVousByDay($jour) {
            $sel = "SELECT * FROM RendezVous WHERE DATE(jour)=?";
            $stms = $this->conn->prepare($sel);
            $stms->bindValue(1,$jour,PDO::PARAM_STR);
            $stms->execute();
            if ($stms->rowCount()===0)
                return [];
            $rendezVous = $stms->fetchAll(PDO::FETCH_ASSOC);
            return $rendezVous;
        }

        function getRDVAndPAtientsByDay($day){
            $sql = "SELECT Rid,name,cin,email,M_S,ordre from patient 
            NATURAL JOIN rendezvous
            WHERE DATE(jour) = ?";
            $stms = $this->conn->prepare($sql);
            $stms->bindValue(1,$day,PDO::PARAM_STR);
            $stms->execute();
            return $stms;

        }


    }

?>