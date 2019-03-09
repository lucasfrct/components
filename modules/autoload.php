<?php
# autoload.php

# Prefixo para um projeto
$GLOBALS [ "prefix"] = "";

# pilha de classes que são carregadas
$GLOBALS [ "CLASSES" ] = Array ( );

spl_autoload_register ( 'loadNamespace' );

function loadNamespace ( $namespace ) {
    # cria o arquivo .php
    $file = geratePath ( getPath ( ), $namespace  ).".php";
    
    if ( callClass ( $file ) ){
        array_push ( $GLOBALS [ "CLASSES" ], $file );
    };
};

# Diretório que serve como base para o namespace
function getPath ( ) {
    return  __DIR__.DIRECTORY_SEPARATOR;
};

function geratePath ( string $path = "", string $namespace = "" ) {
    $path = str_replace ( '\\', DIRECTORY_SEPARATOR, $path.$namespace );
    return str_replace ( '/', DIRECTORY_SEPARATOR, $path );
};

# Cahama o arquivo da classe
function callClass ( string $file = "" ) {
    return ( file_exists ( $file ) && require_once ( $file ) ) ?  TRUE : FALSE;
};

# Modo de uso
#include_once ( "autoload.php" );