<?php
namespace App\Persistence;

use PDO;

class DbContext {
    public static function get() : PDO {
        $pdo = new PDO('mysql:host=localhost;dbname=breca', 'root', '');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 

        return $pdo;
    }
}