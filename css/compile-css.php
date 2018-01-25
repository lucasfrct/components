<?php 
include ( "../php/Compile.php" );

echo '<meta charset="utf-8"><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0">';

$componentsCss = array (
	'src/component-reset.css',
);

Compile::list ( $componentsCss );
Compile::join ( );
if ( Compile::write ( "all-components.css" ) ) {
	echo '<meta http-equiv="refresh" content="0; URL=..\css.html">';
} else {
	Compile::report ( );
};
