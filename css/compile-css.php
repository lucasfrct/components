<?php 
include_once ( "../php/Compile.php" );
header ( "Content-type: text/css" );

$componentsReset = array (
	'src/component-reset.css',
	'src/component-line.css',
	'src/component-window.css',
);

$componentsCol = array (
	'src/component-grid-col-all.css',
	'src/component-grid-col-xs.css',
	'src/component-grid-col-sm.css',
	'src/component-grid-col-md.css',
	'src/component-grid-col-lg.css',
	'src/component-grid-col-xl.css',
);

$componentsRow = array ( 
	'src/component-grid-row-all.css',
	'src/component-grid-row-xs.css',
	'src/component-grid-row-sm.css',
	'src/component-grid-row-md.css',
	'src/component-grid-row-lg.css',
	'src/component-grid-row-xl.css',
);

$componentsBtn = array ( 
	'src/component-btn.css',
);

$componentsShape = array ( 
	'src/component-shape-reset.css',
	'src/component-shape-bar-code.css',
	'src/component-shape-lock.css',
	'src/component-shape-arrows.css',
	'src/component-shape-credit-card.css',
	'src/component-shape-cash-out.css',
	'src/component-shape-backspace.css',
	'src/component-shape-calendar-flip.css',
	'src/component-shape-sandwich.css',
	'src/component-shape-more.css',
	'src/component-shape-picker.css',
);

$componentsAnimation = array ( 
	'src/component-animation-reset.css',
	'src/component-animation-preloader.css',
	'src/component-animation-bar-preloader.css',
	'src/component-animation-loader.css',
	'src/component-animation-line-load.css',
);

$componentsAll = array_merge ( 
	$componentsReset, 
	$componentsCol, 
	$componentsRow, 
	$componentsBtn, 
	$componentsShape, 
	$componentsAnimation 
);

Compile::list ( $componentsAll );
Compile::join ( );
if ( !Compile::write ( "components-all.css" ) ) {
	echo Compile::report ( );
} else{
	echo Compile::data ( );
};

Compile::list ( array_merge ( $componentsReset, $componentsCol, $componentsRow ) );
Compile::join ( );
Compile::write ( "components-grid.css" );

Compile::list ( array_merge ( $componentsReset, $componentsCol ) );
Compile::join ( );
Compile::write ( "components-col.css" );

Compile::list ( array_merge ( $componentsReset, $componentsRow ) );
Compile::join ( );
Compile::write ( "components-row.css" );

Compile::list ( array_merge ( $componentsReset, $componentsBtn ) );
Compile::join ( );
Compile::write ( "components-btn.css" );

Compile::list ( array_merge ( $componentsReset, $componentsShape ) );
Compile::join ( );
Compile::write ( "components-shape.css" );

Compile::list ( array_merge ( $componentsReset, $componentsAnimation ) );
Compile::join ( );
Compile::write ( "components-animation.css" );