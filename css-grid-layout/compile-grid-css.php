<?php 
include_once ( "../php/Compile.php" );
header ( "Content-type: text/css" );

$componentsReset = array (
	'grid/component-reset.css',
);

$componentsColumn = array (
	'grid/component-grid-container.css',
	'grid/component-grid-xs.css',
	'grid/component-grid-sm.css',
	'grid/component-grid-md.css',
	'grid/component-grid-lg.css',
	'grid/component-grid-xl.css',
);


Compile::list ( array_merge ( $componentsReset, $componentsColumn ) );
Compile::join ( );
Compile::write ( "components-grid.css" );
echo Compile::data ( );

