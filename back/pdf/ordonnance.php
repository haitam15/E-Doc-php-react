<?php

use Dompdf\Dompdf;
use Dompdf\Options;

ob_start();
require_once './Ordonnance.html';
$html = ob_get_contents();

ob_end_clean();

require_once './dompdf/autoload.inc.php';

$options = new Options();
$dompdf = new Dompdf();

$dompdf->loadHtml($html);

$dompdf->setPaper('A4','portrait');

$dompdf->render();


$fichier = "Certificat Médical";
$dompdf->stream($fichier);