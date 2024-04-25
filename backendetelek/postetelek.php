<?php
$megnevezes =$_POST["megnevezes"];
$kaloria=$_POST["kaloria"];	
$feherje =$_POST["feherje"];
$zsir =$_POST["zsir"];
$szenhidrat =$_POST["szenhidrat"];
$hamu =$_POST["hamu"];
$rost =$_POST["rost"];
require_once './databaseconnect.php';
$sql = "INSERT INTO levesek(megnevezes, kaloria, feherje, zsir, szenhidrat, hamu, rost) VALUES (?,?,?,?,?,?,?)";
$stmt = $connection->prepare($sql);
$stmt->bind_param("sdddddd", $megnevezes, $kaloria, $feherje, $zsir, $szenhidrat, $hamu, $rost);  
if ($stmt->execute()) {
    http_response_code(201);
    $message=array("message" =>'Sikeresen hozzáadva');
    return json_encode($message);
} else {
    http_response_code(404);
    $message=array("message" =>'Nem sikerült hozzáadni');
    return json_encode($message);
}