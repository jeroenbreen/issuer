<?php
/**
 * Created by PhpStorm.
 * User: Arjen
 * Date: 03/04/2017
 * Time: 15:35
 */

use Dompdf\Dompdf;

require __DIR__ . '/../vendor/autoload.php';

class PrintManager
{
    protected $data, $total = 0, $subtotal = 0;

    public function handlePrint()
    {
        $data_raw = file_get_contents("php://input");
        $data = json_decode($data_raw);
        $this->document = $data->document;
        $this->template = $data->template->settings;
        $this->company = $data->company;
        $this->dictionary = $data->template->settings->dictionary;
        $this->resize = 3.65;

        $dompdf = new Dompdf();
        $dompdf->loadHtml($this->getHMTL());

        $dompdf->setPaper('A4', 'portrait');
        $dompdf->set_option( 'dpi' , '300' );
        $dompdf->render();

        $file_name = $this->getFileName();
        $path_to_pdf_directory = "./../pdf/";

        file_put_contents($path_to_pdf_directory . $file_name, $dompdf->output());
        echo $file_name;
    }

    protected function getFileName()
    {
        return strtolower($this->dictionary->{$this->document->type} . "-.pdf");
    }

    protected function getHMTL()
    {
        $html = "";
        $html .= $this->openHTML();
        ob_start();
        include("templates/page--front.html");
        $html .= ob_get_clean();
        $html .= $this->blocks();
        $html .= $this->closeHTML();
        return $html;
    }

    protected function blocks() {
        $size = 100;
        $n = 40;
        for ($i = 0; $i < $n; $i++) {
            $html .= '<div class="block" style="width:'. $size . 'px; height:' . $size . 'px; left:' . ($i * $size) . 'px">' . $i .'</div>';
        }
        return $html;
    }

    protected function openHTML()
    {
        $html = "
             <HTML>
                 <HEAD>
                     <TITLE></TITLE>
                     <meta charset='utf-8'>
                     <link rel='StyleSheet' href='style.css' type='text/css' media='all'>
                 </HEAD>

                 <BODY>
                     ";
        return $html;
    }

    protected function closeHTML()
    {
        $html = "</BODY></HTML>";
        return $html;
    }
}

