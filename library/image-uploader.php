<?php

$data_raw = file_get_contents("php://input");
$data = json_decode($data_raw);
$base64_string = $data->image;

$path = 'uploads/';
$random = bin2hex(openssl_random_pseudo_bytes(10));
$extension = '.jpg';
$file_name =  $random . $extension;
$write_location = $path .$file_name;


function base64_to_jpeg( $string, $file ) {
    $ifp = fopen( $file, "wb" );
    fwrite( $ifp, base64_decode( $string) );
    fclose( $ifp );
}

base64_to_jpeg( $base64_string, $write_location);
print($file_name);
