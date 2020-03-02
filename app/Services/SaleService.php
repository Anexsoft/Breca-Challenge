<?php
namespace App\Services;

use PDO;

class SaleService {
    private $pdo;
    
    public function __construct() {
        $this->pdo = \App\Persistence\DbContext::get();
    }
    
    public function getSalesByVenue(int $venue_id) : array {
        $result = array();

        $query = "
            SELECT 
                YEAR(DATE) year,
                MONTH(DATE) month,
                SUM(num_transactions) num_transactions,
                SUM(num_sales) num_sales
            FROM sales
                WHERE venue_id = ?
            GROUP BY
                YEAR(DATE),
                MONTH(DATE)
            ORDER BY
                DATE DESC
        ";

        $stm = $this->pdo->prepare($query);
        $stm->execute([$venue_id]);
        $stm->execute();

        return $stm->fetchAll(PDO::FETCH_OBJ);
    }
}