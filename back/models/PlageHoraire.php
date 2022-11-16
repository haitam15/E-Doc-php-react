<?php

    class PlageHoraire {
        private $jourD;
        private $jourF;
        private $heureMatinD;
        private $heureMatinF;
        private $heureSoireD;
        private $heureSoireF;
        private $dureeRDV;

        function __construct($jourD,$jourF,$heureMatinD,$heureMatinF,$heureSoireD,$heureSoireF,$dureeRDV) {
            $this->jourD = $jourD;
            $this->jourF = $jourF;
            $this->heureMatinD = $heureMatinD;
            $this->heureMatinF = $heureMatinF;
            $this->heureSoireD = $heureSoireD;
            $this->heureSoireF = $heureSoireF;
            $this->dureeRDV = $dureeRDV;
        }

        function getJourD() {
            return $this->jourD;
        }

        function getJourF() {
            return $this->jourF;
        }

        function getHeureMatinD() {
            return $this->heureMatinD;
        }

        function getHeureMatinF() {
            return $this->heureMatinF;
        }

        function getHeureSoireD() {
            return $this->heureSoireD;
        }

        function getHeureSoireF() {
            return $this->heureSoireF;
        }

        function getDureeRDV() {
            return $this->dureeRDV;
        }

    }


    class PlageHoraireManager {

        private $conn;
        private $table = 'PlageHoraire';

        public function __construct($db){
            
            $this->conn = $db;
        }

        function getPlageHoraire() {
            $sel = "SELECT * FROM PlageHoraire";
            $stms = $this->conn->prepare($sel);
            $stms->execute();
            $plageHoraire = $stms->fetch(PDO::FETCH_ASSOC);
            return $plageHoraire;
        }


        function UpdatePlageHoraire($plageHoraire) {
            $upd = "UPDATE PlageHoraire SET jourD=:jourD,jourF=:jourF,heureMatinD=:heureMatinD,heureMatinF=:heureMatinF,heureSoireD=:heureSoireD,heureSoireF=:heureSoireF,dureeRDV=:dureeRDV";
            $stmu = $this->conn->prepare($upd);
            $stmu->bindValue("jourD",$plageHoraire->getJourD(),PDO::PARAM_INT);
            $stmu->bindValue("jourF",$plageHoraire->getJourF(),PDO::PARAM_INT);
            $stmu->bindValue("heureMatinD",$plageHoraire->getHeureMatinD(),PDO::PARAM_STR);
            $stmu->bindValue("heureMatinF",$plageHoraire->getHeureMatinF(),PDO::PARAM_STR);
            $stmu->bindValue("heureSoireD",$plageHoraire->getHeureSoireD(),PDO::PARAM_STR);
            $stmu->bindValue("heureSoireF",$plageHoraire->getHeureSoireF(),PDO::PARAM_STR);
            $stmu->bindValue("dureeRDV",$plageHoraire->getDureeRDV(),PDO::PARAM_INT);
            $stmu->execute();
    
        }


    }

?>