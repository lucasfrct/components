<?php 
include ( "../php/Compile.php" );
header ( "Content-type: text/css" );

$componentsCss = array (
	'src/component-reset.css',
	'src/component-line.css',
	'src/component-grid-col-xs.css',
	'src/component-grid-col-sm.css',
	'src/component-grid-col-md.css',
	'src/component-grid-col-lg.css',
	'src/component-grid-col-xl.css',
	'src/component-grid-row-xs.css',
	'src/component-grid-row-sm.css',
	'src/component-grid-row-md.css',
	'src/component-grid-row-lg.css',
	'src/component-grid-row-xl.css',
	'src/component-btn.css',
);

Compile::list ( $componentsCss );
Compile::join ( );
if ( !Compile::write ( "all-components.css" ) ) {
	Compile::report ( );
} else{
	echo Compile::data ( );
};