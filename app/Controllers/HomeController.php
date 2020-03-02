<?php
namespace App\Controllers;

use App\Services\ReportService;
use App\Services\SaleService;
use App\Services\VenueService;

class HomeController extends BaseController
{
    private $venueService;
    private $saleService;
    private $reportService;

    public function __construct()
    {
        $this->venueService = new VenueService();
        $this->saleService = new SaleService();
        $this->reportService = new ReportService();
    }

    public function Index()
    {
        $this->view('home/index.php');
    }

    public function Venues()
    {
        $this->view('home/venues.php');
    }

    public function Dashboard()
    {
        $this->view('home/dashboard.php');
    }

    // Ajax
    public function Report()
    {
        $type = $_GET['type'];
        $data;

        switch ($type) {
            case 'venues':
                $data = $this->venueService->getSalesPerVenue();
                break;
            case 'sales':
                $data = $this->saleService->getSalesByVenue($_GET['id']);
                break;
            case 'dashboard':
                $data = $this->reportService->getGeneralVision();
                break;
        }

        print_r(json_encode($data));
    }
}
