<?php
$sql = '';
if (count($kereSzoveg) > 1) {
    if ($kereSzoveg[1]) {
        $sql = 'SELECT * FROM levesek WHERE megnevezes=' . $kereSzoveg[1];
    } else {
        http_response_code(404);
        echo 'Nem létező leves';
    }
} else {
    $sql = 'SELECT * FROM levesek WHERE 1';
}
require_once './databaseconnect.php';
$result = $connection->query($sql);
if ($result->num_rows > 0) {
    $leves = array();
    while ($row = $result->fetch_assoc()) {
        $leves[] = $row;
    }
    http_response_code(200);
    echo json_encode($leves);
} else {
    http_response_code(404);
    echo 'Nincs egy ügyfél sem';
}