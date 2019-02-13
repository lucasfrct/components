<?php 
include_once ( "../php/Compile.php" );
include_once ( "../php/Minify.php" );

header ( "Content-type: text/css" );

$grid = array (
	'grid/grid-reset.css',
	'grid/grid-container.css',
	'grid/grid-xs.css',
	'grid/grid-sm.css',
	'grid/grid-md.css',
	'grid/grid-lg.css',
	'grid/grid-xl.css',
);

Compile::list ( $grid );
Compile::join ( );
Compile::write ( "grid.min.css", 'Minify' );
#echo Compile::data ( );