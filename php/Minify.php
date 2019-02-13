<?php 
function Minify ( $str ) {
	$str = str_replace ( ' ',    '', $str );
	$str = str_replace ( "\r\n", '', $str );
	$str = str_replace ( "\r",   '', $str );
	$str = str_replace ( "\n",   '', $str );
	$str = str_replace ( ' ',    '', $str );
	return $str;
};