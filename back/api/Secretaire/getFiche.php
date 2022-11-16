<?php

include_once '../../config/database.php';
require "../../vendor/autoload.php";
require_once "../../models/FichePatient.php";
use \Firebase\JWT\JWT;

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

$secret_key = "YOUR_SECRET_KEY";
$jwt = null;
$db = new Database();
$conn = $db->connect();

//JWT verification

$headers = getallheaders();

if(isset($headers['Authorization'])){
    $authHeader = $headers["Authorization"];
    $arr = explode(" ", $authHeader);

    $jwt = $arr[1];

    if($jwt){
        try{
            $decoded = JWT::decode($jwt, $secret_key, array('HS256'));
            $data = json_decode(file_get_contents("php://input"));
            $ficheMan = new FicheManager($conn);
            $Pid = $data->Pid;
            if($row = $ficheMan->getFichePatientByPid($Pid)){
                echo json_encode(array(
                    "dateNaissance"=>$row["dateNaissance"],
                    "tlfn" => $row["tlfn"],
                    "poids" => $row["poids"],
                    "assurance" => $row["assurance"],
                    "grpSanguin" => $row["grpSanguin"],
                    "sexe" => $row["sexe"],
                    "adresse" => $row["adresse"],
                ));
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




