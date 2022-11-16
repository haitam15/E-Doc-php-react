<?php 

class FichePatient{
    private $Pid;
    private $dateNaissance;
    private $tlfn;
    private $poids;
    private $assurance;
    private $grpSanguin;
    private $sexe;
    private $adresse;

    function __construct($Pid, $dateNaissance, $tlfn, $poids, $assurance, $grpSanguin, $sexe, $adresse) {
        $this->Pid = $Pid;
        $this->dateNaissance = $dateNaissance;
        $this->tlfn = $tlfn;
        $this->poids = $poids;
        $this->assurance = $assurance;
        $this->grpSanguin = $grpSanguin;
        $this->sexe = $sexe;
        $this->adresse = $adresse;
    }

    function getPid() {
        return $this->Pid;
    }

    function getDateNaissance(){
        return $this->dateNaissance;
    }

    function getTlfn(){
        return $this->tlfn;
    }

    function getPoids(){
        return $this->poids;
    }

    function getAssurance(){
        return $this->assurance;
    }

    function getSexe(){
        return $this->sexe;
    }

    function getGrpSanguin(){
        return $this->grpSanguin;
    }

    function getAdresse(){
        return $this->adresse;
    }

}

class FicheManager{
    private $conn;
    public function __construct($db){
            
        $this->conn = $db;
    }

    function updateFichePatient($fiche){
         $sql = "UPDATE fichepatient SET dateNaissance = :dateNaissance,tlfn = :tlfn,poids = :poids, assurance = :assurance,grpSanguin = :grpSanguin,
                                        sexe = :sexe,adresse = :adresse WHERE Pid = :Pid";
        $stmu = $this->conn->prepare($sql);
        $stmu->bindValue("dateNaissance",$fiche->getDateNaissance(),PDO::PARAM_STR);
        $stmu->bindValue("tlfn",$fiche->getTlfn(),PDO::PARAM_STR);
        $stmu->bindValue("poids",$fiche->getPoids(),PDO::PARAM_INT);
        $stmu->bindValue("assurance",$fiche->getAssurance(),PDO::PARAM_STR);
        $stmu->bindValue("grpSanguin",$fiche->getGrpSanguin(),PDO::PARAM_STR);
        $stmu->bindValue("sexe",$fiche->getSexe(),PDO::PARAM_STR);
        $stmu->bindValue("adresse",$fiche->getAdresse(),PDO::PARAM_STR);
        $stmu->bindValue("Pid",$fiche->getPid(),PDO::PARAM_INT);
        return $stmu->execute();
    }

    function getFichePatientById($id) {
        $sql = "SELECT * from fichepatient WHERE id = :id";
        $stmu = $this->conn->prepare($sql);
        $stmu->bindValue("id",$id,PDO::PARAM_INT);
        $stmu->execute();
        $fiche = $stmu->fetch(PDO::FETCH_ASSOC);
        return $fiche;
    }

    function getFichePatientByPid($Pid){
        $sql = "SELECT * FROM fichepatient 
        NATURAL JOIN patient
        WHERE Pid = :Pid ";
        $stms = $this->conn->prepare($sql);
        $stms->bindValue("Pid",$Pid,PDO::PARAM_INT);
        $stms->execute();
        $fiche = $stms->fetch(PDO::FETCH_ASSOC);
        return $fiche;
    }

    function getFichePatientByCin($cin){
        $sql = "SELECT * FROM fichepatient 
        NATURAL JOIN patient
        WHERE cin = :cin ";
        $stms = $this->conn->prepare($sql);
        $stms->bindValue("cin",$cin,PDO::PARAM_STR);
        $stms->execute();
        return $stms;
    }

    function addFichePatient($fiche){
        $ins = "INSERT INTO fichepatient VALUES(NULL,:Pid,:dateNaissance,:tlfn,:poids,:assurance,:grpSanguin,:sexe,:adresse) ";
        $stmu = $this->conn->prepare($ins);
        $stmu->bindValue("Pid",$fiche->getPid(),PDO::PARAM_INT);
        $stmu->bindValue("dateNaissance",$fiche->getDateNaissance(),PDO::PARAM_STR);
        $stmu->bindValue("tlfn",$fiche->getTlfn(),PDO::PARAM_STR);
        $stmu->bindValue("poids",$fiche->getPoids(),PDO::PARAM_INT);
        $stmu->bindValue("assurance",$fiche->getAssurance(),PDO::PARAM_STR);
        $stmu->bindValue("grpSanguin",$fiche->getGrpSanguin(),PDO::PARAM_STR);
        $stmu->bindValue("sexe",$fiche->getSexe(),PDO::PARAM_STR);
        $stmu->bindValue("adresse",$fiche->getAdresse(),PDO::PARAM_STR);
        return $stmu->execute();
    }
}