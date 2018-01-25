<?php 
include ( "../php/Compile.php" );

header ( "Content-type: text/css" );
#echo '<meta charset="utf-8"><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0">';

$componentsCss = array (
	'src/component-reset.css',
	'src/component-line.css',
	'src/component-grid-col-xs.css',
);

Compile::list ( $componentsCss );
Compile::join ( );
if ( Compile::write ( "all-components.css" ) ) {
	#echo '<meta http-equiv="refresh" content="0; URL=..\css.html">';
} else {
	Compile::report ( );
};