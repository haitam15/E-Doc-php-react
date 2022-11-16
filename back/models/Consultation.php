<?php

class Consultation{
    private $Cid;
    private $Pid;
    private $DateConsultation;
    private $Diagnostic;
    private $Motif;
    private $ExamenClinique;
    private $ExamenLabo;
    private $Prescription;

    function __construct($Cid, $Pid, $DateConsultation,$Diagnostic, $Motif,$ExamenClinique,$ExamenLabo,$Prescription){
       $this->Cid = $Cid;
       $this-> Pid = $Pid;
       $this-> DateConsultation = $DateConsultation;
       $this->Diagnostic = $Diagnostic;
       $this-> Motif = $Motif;
       $this-> ExamenClinique = $ExamenClinique;
       $this->ExamenLabo = $ExamenLabo;
       $this-> Prescription = $Prescription;
    }

    function getCid(){
        return $this->Cid;
    }

    function getPid(){
        return $this->Pid;
    }

    function getDiagnostic(){
        return $this->Diagnostic;
    }

    function getDateConsultation(){
        return $this->DateConsultation;
    }

    function getMotif(){
        return $this->Motif;
    }

    function getExamenClinique(){
        return $this->ExamenClinique;
    }
    
    function getExamenLabo(){
        return $this->ExamenLabo;
    }

    function getPrescription(){
        return $this->Prescription;
    }

}

class ConsultationMAnager{

    private $conn;

    function __construct($db){
        $this->conn = $db;
    }

    function addConsultation($cons){
        $ins = "INSERT INTO consultation VALUES(NULL,:Pid,:DateConsultation,:Motif,:Diagnostic,:ExamenClinique,:ExamenLabo,:Prescription)";
        $stmu = $this->conn->prepare($ins);
        $stmu->bindValue("Pid",$cons->getPid(),PDO::PARAM_INT);
        $stmu->bindValue("DateConsultation",$cons->getDateConsultation(),PDO::PARAM_STR);
        $stmu->bindValue("Motif",$cons->getMotif(),PDO::PARAM_STR);
        $stmu->bindValue("Diagnostic",$cons->getDiagnostic(),PDO::PARAM_STR);
        $stmu->bindValue("ExamenClinique",$cons->getExamenClinique(),PDO::PARAM_STR);
        $stmu->bindValue("ExamenLabo",$cons->getExamenLabo(),PDO::PARAM_STR);
        $stmu->bindValue("Prescription",$cons->getPrescription(),PDO::PARAM_STR);
        return $stmu->execute();
    }

    function getAllConsultations($Pid){
        $sql = "SELECT * FROM consultation where Pid=:Pid";
        $stmu = $this->conn->prepare($sql);
        $stmu->bindParam(':Pid',$Pid,PDO::PARAM_INT);
        return $stmu->execute();
    }

    function totalConsultations($dateD,$dateF){
        $sql = "SELECT * FROM consultation where DateConsultation between :dateD and :dateF";
        $stmu = $this->conn->prepare($sql);
        $stmu->bindValue("dateD",$dateD,PDO::PARAM_STR);
        $stmu->bindValue("dateF",$dateF,PDO::PARAM_STR);
        $stmu->execute();
        return $stmu->rowCount();
    }
}