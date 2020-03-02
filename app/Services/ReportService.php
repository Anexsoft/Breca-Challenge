<?php
namespace App\Services;

use PDO;

class ReportService {
    private $pdo;
    
    public function __construct() {
        $this->pdo = \App\Persistence\DbContext::get();
    }
    
    public function getGeneralVision() : array {
        $result = array();

        $this->numberOfVisits($result);
        $this->numberOfVisitsByGender($result);
        $this->numberOfVisitsByGeneration($result);
        $this->salesPerYear($result);

        return $result;
    }

    private function numberOfVisits(&$result) : void {
        $query = "
            SELECT
                YEAR(v.date) year,
                ve.name,
                COUNT(*) total
            FROM visits v
                INNER JOIN venues ve ON ve.id = v.venue_id
                GROUP BY YEAR(v.date), ve.id
            ORDER BY ve.name
        ";

        $stm = $this->pdo->prepare($query);
        $stm->execute();

        $result['visits'] = $stm->fetchAll(PDO::FETCH_OBJ);
    }

    private function numberOfVisitsByGender(&$result) : void {
        $query = "
            SELECT
                YEAR(v.date) year,
                vi.gender,
                COUNT(*) total
            FROM visits v
            INNER JOIN visitors vi ON v.email = vi.email
            GROUP BY YEAR(v.date), vi.gender
        ";

        $stm = $this->pdo->prepare($query);
        $stm->execute();

        $result['visitsPerGender'] = $stm->fetchAll(PDO::FETCH_OBJ);
    }

    private function numberOfVisitsByGeneration(&$result) : void {
        $query = "
            SELECT
                YEAR(vi.date) year,
                SUM(IF(YEAR(v.date_of_birth) BETWEEN 1946 AND 1964, 1, 0)) babyboomer,
                SUM(IF(YEAR(v.date_of_birth) BETWEEN 1965 AND 1980, 1, 0)) generationx,
                SUM(IF(YEAR(v.date_of_birth) BETWEEN 1980 AND 1996, 1, 0)) generationy,
                SUM(IF(YEAR(v.date_of_birth) BETWEEN 1997 AND 2015, 1, 0)) generationz
            FROM visitors v
            INNER JOIN visits vi ON v.email = vi.email
            GROUP BY YEAR(vi.date)
        ";

        $stm = $this->pdo->prepare($query);
        $stm->execute();

        $result['visitsPerGeneration'] = $stm->fetchAll(PDO::FETCH_OBJ);
    }

    private function salesPerYear(&$result) : void {
        $query = "
            SELECT
                YEAR(s.date) year,
                MONTH(s.date) month,
                SUM(s.num_sales) num_sales,
                SUM(s.num_transactions) num_transactions
            FROM sales s
            GROUP BY YEAR(s.date), MONTH(s.date)
            ORDER BY YEAR(s.date) DESC, MONTH(s.date) DESC
        ";

        $stm = $this->pdo->prepare($query);
        $stm->execute();

        $result['salesPerYear'] = $stm->fetchAll(PDO::FETCH_OBJ);
    }
}