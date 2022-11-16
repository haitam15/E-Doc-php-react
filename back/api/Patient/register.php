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

$firstName = '';
$lastName = '';
$email = '';
$password = '';
$conn = null;

$Database = new Database();
$conn = $Database->connect();

$PatientManager = new PatientManager($conn);

$data = json_decode(file_get_contents("php://input"));

$cin = $data->cin;
$name = $data->name;
$email = $data->email;
$password = $data->password;

if(filter_var($email, FILTER_VALIDATE_EMAIL))
{
  

  $password_hash = password_hash($password, PASSWORD_BCRYPT);

  $patient = new Patient($email,$password_hash,$cin,$name);

  if( $PatientManager->AddPatient($patient)){

    $secret_key = "YOUR_SECRET_KEY";
    $issuer_claim = "THE_ISSUER"; // this can be the servername
    $audience_claim = "THE_AUDIENCE";
    $issuedat_claim = time(); // issued at
    $notbefore_claim = $issuedat_claim + 10; //not before in seconds
    $expire_claim = $issuedat_claim + 60; // expire time in seconds
    $token = array(
        "iss" => $issuer_claim,
        "aud" => $audience_claim,
        "iat" => $issuedat_claim,
        "nbf" => $notbefore_claim,
        "exp" => $expire_claim,
        "data" => array(
            "name" => $name,
            "cin" => $cin,
            "email" => $email
    ));

    http_response_code(200);

    $jwt = JWT::encode($token, $secret_key);
    echo json_encode(
        array(
            "message" => "Successful login.",
            "jwt" => $jwt,
            "email" => $email,
            "expireAt" => $expire_claim
        ));
  }
  else{
      http_response_code(400);

      echo json_encode(array("message" => "Unable to register the user."));
  }}else{
    http_response_code(400);

    echo json_encode(array("message" => "Unable to register the user."));
  }