<?php 
include_once ( "../php/Compile.php" );

header ( "Content-type: text/css" );

$grid = array (
	'grid/grid-reset.css',
	'grid/grid-container.css',
	'grid/grid-xs.css',
	'grid/grid-sm.css',
	'grid/grid-md.css',
	'grid/grid-lg.css',
	'grid/grid-xl.css',
	'grid/typography.css',
);

$compile = new Compile;
$compile->getList ( $grid );
$compile->joinFiles ( );
$compile->minify ( );
$compile->writeFile ( "grid.min.css" );
#$compile->content ( );