<?php
namespace App\Services;

use PDO;

class VenueService {
    private $pdo;
    
    public function __construct() {
        $this->pdo = \App\Persistence\DbContext::get();
    }
    
    public function getSalesPerVenue() : array {
        $result = array();

        $query = "
            SELECT
                v.id,
                v.name,
                SUM(s.num_sales) num_sales,
                SUM(s.num_transactions) num_transactions
            FROM venues v
            INNER JOIN sales s ON s.venue_id = v.id
            GROUP BY v.id, v.name
            ORDER BY v.name
        ";

        $stm = $this->pdo->prepare($query);
        $stm->execute();

        return $stm->fetchAll(PDO::FETCH_OBJ);
    }
}