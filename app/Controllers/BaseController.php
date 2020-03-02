<?php
namespace App\Controllers;

class BaseController {
    protected function View($path) {
        require_once 'app/views/layout.php';
    }
}