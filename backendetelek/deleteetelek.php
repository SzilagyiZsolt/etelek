<?php
$sql = '';
if (count($kereSzoveg) > 1) {
    if ($kereSzoveg[1]) {
        $sql = 'DELETE FROM levesek WHERE megnevezes=' . $kereSzoveg[1];
    } else {
        http_response_code(404);
        echo 'Nem létező leves';
    }
}
require_once './databaseconnect.php';
$result = $connection->query($sql);
if ($result = $connection->query($sql)) {
    http_response_code(200);
    echo "Sikeres törlés";
}
else {
    http_response_code(404);
    echo 'Nem sikerült a törlés';
}