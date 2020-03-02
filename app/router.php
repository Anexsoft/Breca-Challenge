<?php
$route = $_GET['route'] ?? '';
$controller = null;

if(empty($route)) {
    $controller = new App\Controllers\HomeController();
    $controller->Index();
} else {
    $controller = new App\Controllers\HomeController();
    $controller->$route();
}