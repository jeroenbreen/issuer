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
    protected $data, $total = 0, $subtotal = 0, $dpi = 300;


    public function handlePrint()
    {
        $data_raw = file_get_contents("php://input");
        $data = json_decode($data_raw);
        $this->document = $data->document;
        $this->template = $data->template;
        $this->company = $data->company;
        $this->resize = 1;

        $dompdf = new Dompdf();
        $dompdf->loadHtml($this->getHMTL());

        $dompdf->setPaper('A4', 'portrait');
        $dompdf->set_option( 'dpi' , $this->dpi);
        $dompdf->render();

        $file_name = $this->getFileName();
        $path_to_pdf_directory = "./../pdf/";

        file_put_contents($path_to_pdf_directory . $file_name, $dompdf->output());
        echo $file_name;
    }

    protected function getFileName()
    {
        return strtolower("Document -" . $this->document->documentIdFormatted . ".pdf");
    }

    protected function getHMTL()
    {
        $dpi = $this->dpi / 150;
        $original = 620;
        $original_spacing = 10;
        $page_width = $dpi * 1240;
        $page_height = $page_width / 21 * 29.7;
        $scale = $page_width / $original;
        $spacing = $scale * $original_spacing;
        $elements_width = $page_width - ($scale * $this->template->margin->left) - ($scale * $this->template->margin->right);
        $col_width_50 = $elements_width / 2;

        $html = "";
        $html .= $this->openHTML();
        $i = 0;
        foreach ($this->document->pages as $page) {
            ob_start();
            include("templates/page.html");
            $html .= ob_get_clean();
            $i++;
        }
        $html .= $this->closeHTML();
        return $html;
    }

    protected function blocks() {
        $size = 100;
        $n = 10;
        for ($i = 0; $i < $n; $i++) {
            $html .= '<div class="block" style="width:'. $size . 'px; height:' . $size . 'px; left:' . ($i * $size) . 'px">' . ($i + 1) .'</div>';
        }
        return $html;
    }

    protected function openHTML()
    {
        $html = "
            <!doctype html>
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

