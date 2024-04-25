<?php
$putdata = fopen('php://input', "r");
$raw_data= "";
while($chunk = fread($putdata, 1024)){
    $raw_data.= $chunk;
}
fclose($putdata);
$adatJson = json_decode($raw_data);
$megnevezes=$adatJson->megnevezes;
$kaloria=$adatJson->kaloria;
$feherje=$adatJson->feherje;
$zsir=$adatJson->zsir;
$szenhidrat=$adatJson->szenhidrat;
$hamu=$adatJson->hamu;
$rost=$adatJson->rost;
require_once './databaseconnect.php';
$sql = "UPDATE levesek SET kaloria=?, feherje=?, zsir=?, szenhidrat=?, hamu=?, rost=? WHERE megnevezes=?";
$stmt = $connection->prepare($sql);
$stmt->bind_param("dddddds", $kaloria, $feherje, $zsir, $szenhidrat, $hamu, $rost, $megnevezes);  
if ($stmt->execute()) {
    http_response_code(201);
    echo 'Sikeresen módosítva';
} else {
    http_response_code(404);
    echo 'Nem sikerült módosítani';
}