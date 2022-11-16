<?php
include_once '../../config/database.php';
require "../../vendor/autoload.php";
require_once "../../models/Patient.php";
use \Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$email = '';
$password = '';

$database = new Database();
$conn = $database->connect();

$PatientManager = new PatientManager($conn);



$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

$row = $PatientManager->getPatientByEmail($email);




if(!empty($row)){
    //$row = $stmt->fetch(PDO::FETCH_ASSOC);
    $pid = $row['Pid'];
    $name = $row['Name'];
    $email = $row['email'];
    $cin = $row['CIN'];
    $password2 = $row['password'];

    if(password_verify($password, $password2))
    {
        $secret_key = "YOUR_SECRET_KEY";
        $issuer_claim = "THE_ISSUER"; // this can be the servername
        $audience_claim = "THE_AUDIENCE";
        $issuedat_claim = time(); // issued at
        $notbefore_claim = $issuedat_claim + 10; //not before in seconds
        $expire_claim = $issuedat_claim + 60*60*24; // expire time in seconds
        $token = array(
            "iss" => $issuer_claim,
            "aud" => $audience_claim,
            "iat" => $issuedat_claim,
            "nbf" => $notbefore_claim,
            "exp" => $expire_claim,
            "data" => array(
                "id" => $pid,
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

        http_response_code(401);
        echo json_encode(array("message" => "Login failed."));
    }
}
?>