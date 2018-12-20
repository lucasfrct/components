<?php 
include_once ( "../php/Compile.php" );
header ( "Content-type: text/css" );

$componentsReset = array (
	'src/component-reset.css',
	#'src/component-line.css',
	#'#src/component-window.css',
);

$componentsColumn = array (
	'src/component-grid-column-all.css',
	'src/component-grid-column-xs.css',
	'src/component-grid-column-sm.css',
	'src/component-grid-column-md.css',
	'src/component-grid-column-lg.css',
	'src/component-grid-column-xl.css',
);

$componentsRow = array ( 
	#'src/component-grid-row-all.css',
	#'src/component-grid-row-xs.css',
	#'src/component-grid-row-sm.css',
	#'src/component-grid-row-md.css',
	#'src/component-grid-row-lg.css',
	#'src/component-grid-row-xl.css',
);

$componentsBtn = array ( 
	#'src/component-btn.css',
);

$componentsShape = array ( 
	#'src/component-shape-reset.css',
	#'src/component-shape-bar-code.css',
	#'src/component-shape-lock.css',
	#'src/component-shape-arrows.css',
	#'src/component-shape-credit-card.css',
	#'src/component-shape-cash-out.css',
	#'src/component-shape-backspace.css',
	#'src/component-shape-calendar-flip.css',
	#'src/component-shape-sandwich.css',
	#'src/component-shape-more.css',
	#'src/component-shape-picker.css',
);

$componentsAnimation = array ( 
	#'src/component-animation-reset.css',
	#'src/component-animation-preloader.css',
	#'src/component-animation-bar-preloader.css',
	#'src/component-animation-loader.css',
	#'src/component-animation-line-load.css',
);

$componentsAll = array_merge ( 
	$componentsReset, 
	$componentsColumn, 
	$componentsRow, 
	$componentsBtn, 
	$componentsShape, 
	$componentsAnimation 
);

Compile::list ( $componentsAll );
Compile::join ( );
if ( !Compile::write ( "components4-all.css" ) ) {
	echo Compile::report ( );
} else{
	echo Compile::data ( );
};

Compile::list ( array_merge ( $componentsReset, $componentsColumn, $componentsRow ) );
Compile::join ( );
Compile::write ( "components4-grid.css" );

Compile::list ( array_merge ( $componentsReset, $componentsColumn ) );
Compile::join ( );
Compile::write ( "components4-column.css" );

Compile::list ( array_merge ( $componentsReset, $componentsRow ) );
Compile::join ( );
Compile::write ( "components4-row.css" );

Compile::list ( array_merge ( $componentsReset, $componentsBtn ) );
Compile::join ( );
Compile::write ( "components4-btn.css" );

Compile::list ( array_merge ( $componentsReset, $componentsShape ) );
Compile::join ( );
Compile::write ( "components4-shape.css" );

Compile::list ( array_merge ( $componentsReset, $componentsAnimation ) );
Compile::join ( );
Compile::write ( "components4-animation.css" );