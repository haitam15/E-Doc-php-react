<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: Application/json");

require_once "../config/Database.php";
require_once "../models/RendezVous.php";
require_once "../models/PlageHoraire.php";

$db = new Database();
$conn = $db->connect();

$rendezVousManager = new RendezVousManager($conn);
$plageHoraireManager = new PlageHoraireManager($conn);
$plageHoraire = $plageHoraireManager->getPlageHoraire();

$input = json_decode(file_get_contents("php://input"),true);

if ( isset($input["day"]) && isset($input["orderDay"]) && (int)$plageHoraire["jourD"] <= (int)$input["orderDay"] && (int)$plageHoraire["jourF"]>=(int)$input["orderDay"] ) {
    $day = $input["day"];
    $rendezVous = $rendezVousManager->getRendezVousByDay($day);
    $nbr_RDV_M = floor( ( ( strtotime($plageHoraire["heureMatinF"]) - strtotime($plageHoraire["heureMatinD"]) ) / 60 ) / $plageHoraire["dureeRDV"] );
    $nbr_RDV_S = floor( ( ( strtotime($plageHoraire["heureSoireF"]) - strtotime($plageHoraire["heureSoireD"]) ) / 60 ) / $plageHoraire["dureeRDV"] );
    
    $rendezVousPleinM = [];
    $rendezVousPleinS = [];

    foreach( $rendezVous as $rdv) {
        if($rdv["M_S"]==="M")
            $rendezVousPleinM[(int)$rdv["ordre"]] = true;
        elseif($rdv["M_S"]==="S")
            $rendezVousPleinS[(int)$rdv["ordre"]] = true;
    }

    $rendezVousDispoM = [];
    $rendezVousDispoS = [];

    for ($i=0;$i<$nbr_RDV_M;$i++) {
        if (!isset($rendezVousPleinM[$i]))
            array_push($rendezVousDispoM,$i);
    }

    for ($i=0;$i<$nbr_RDV_S;$i++) {
        if (!isset($rendezVousPleinS[$i]))
            array_push($rendezVousDispoS,$i);
    }


    $response = [
        "M" => [
            "heure" => $plageHoraire["heureMatinD"] ,
            "dispo" => $rendezVousDispoM
        ],
        "S" => [
            "heure" => $plageHoraire["heureSoireD"] ,
            "dispo" => $rendezVousDispoS
        ],
        "D" => $plageHoraire["dureeRDV"]
    ];

    echo json_encode($response);

} else {
    $response = [
        "message" => "Error"
    ];

    echo json_encode($response);
}