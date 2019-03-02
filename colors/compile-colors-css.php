<?php 
include_once ( "../php/Compile.php" );

header ( "Content-type: text/css" );

$colors = array (
	'color-red.css',
	'color-pink.css',
	'color-purple.css',
	'color-deep-purple.css',
	'color-indigo.css',
	'color-blue.css',
	'color-light-blue.css',
);

$compile = new Compile;
$compile->getList ( $colors );
$compile->joinFiles ( );
$compile->minify ( );
$compile->writeFile ( "colors.css" );
$compile->content ( );