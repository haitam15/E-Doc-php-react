<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header("HTTP/1.1 200 OK");
die();
}

require_once "../config/Database.php";
require_once "../models/RendezVous.php";
require_once "../models/PlageHoraire.php";
require '../vendor/autoload.php';

use \Firebase\JWT\JWT;


$db = new Database();
$conn = $db->connect();
$secret_key = "YOUR_SECRET_KEY";

$headers = getallheaders();

if(isset($headers['Authorization'])){
    $authHeader = $headers["Authorization"];
    $arr = explode(" ", $authHeader);

    $jwt = $arr[1];

    if($jwt){
        try{
            $decoded = JWT::decode($jwt, $secret_key, array('HS256'));
            $rendezVousManager = new RendezVousManager($conn);
            $plageHoraireManager = new PlageHoraireManager($conn);
            $plageHoraire = $plageHoraireManager->getPlageHoraire();

            $input = json_decode(file_get_contents("php://input"),true);

            if ( isset($input["day"]) && isset($input["orderDay"]) && (int)$plageHoraire["jourD"] <= (int)$input["orderDay"] && (int)$plageHoraire["jourF"] >= (int)$input["orderDay"] ) {
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
        }catch(Exception $e){
            http_response_code(401);
            echo json_encode(array(
                "message" => "Access denied.",
                "error" => $e->getMessage()
            ));
        }
    }
}else{
    http_response_code(401);
            echo json_encode(array(
                "message" => "Access denied.",
                "error" => "No token sent"
            ));
}

