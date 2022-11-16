<?php

include_once '../../config/database.php';
require "../../vendor/autoload.php";
require_once "../../models/Patient.php";
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
            $PatientManager = new PatientManager($conn);
            $row = $PatientManager->getAllPatients();
            $json_array = array();
            while($r = $row->fetch(PDO::FETCH_ASSOC)){
                $json_array[] = $r;
            }
            echo json_encode($json_array);
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




