<?php
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        require_once 'backendetelek/getetelek.php';
        break;
    case 'POST':
        require_once 'backendetelek/postetelek.php';
        break;
    case 'DELETE':
        require_once 'backendetelek/deleteetelek.php';
        break;
    case 'PUT':
        require_once 'backendetelek/putetelek.php';
        break;
    default:
        break;
}