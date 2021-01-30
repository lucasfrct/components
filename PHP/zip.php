<?php

$arquivo = getcwd().'/magento.zip';
$destino = getcwd().'/';

$zip = new ZipArchive;
$zip->open($arquivo);
if($zip->extractTo($destino) == TRUE){
    echo 'Arquivo descompactado com sucesso.';
} else{
    echo 'O Arquivo não pode ser descompactado.';
}
$zip->close();