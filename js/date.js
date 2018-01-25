( function ( ) {
	"use strict";

//	DATE IN FORMAT 
var _date = function ($format){
    var $date = new Date();
    var $d = Number($date.getDate());
    var $m = Number($date.getMonth()+1);
    var $Y = Number($date.getFullYear());
	var $y = Number(String($Y).substring(2));
    $d = String(($d < 10) ? "0"+$d : $d);
	$m = String(($m < 10) ? "0"+$m : $m);
	$Y = String(($d < 10) ? "0"+$Y : $Y);
	$y = String(($y < 10) ? "0"+$y : $y);
	
	var $resolve = '';
	switch($format){
		case 'Y-m-d': $resolve = String($Y+"-"+$m+"-"+$d); break;
		case 'Y/m/d': $resolve = String($Y+"/"+$m+"/"+$d); break;
		case 'd-m-Y': $resolve = String($d+"-"+$m+"-"+$Y); break;
		case 'd/m/Y': $resolve = String($d+"/"+$m+"/"+$Y); break;
		case 'd-m-y': $resolve = String($d+"-"+$m+"-"+$y); break;
		case 'd/m/y': $resolve = String($d+"/"+$m+"/"+$y); break;
		case 'd-m': $resolve = String($d+"-"+$m); break;
		case 'd/m': $resolve = String($d+"/"+$m); break;
		case 'm-Y': $resolve = String($m+"-"+$Y); break;
		case 'm/Y': $resolve = String($m+"/"+$Y); break;
		case 'm-y': $resolve = String($m+"-"+$y); break;
		case 'm/y': $resolve = String($m+"/"+$y); break;
		case 'd': $resolve = Number($d); break;
		case 'm': $resolve = Number($m); break;
		case 'Y': $resolve = Number($Y); break;
		case 'y': $resolve = Number($y); break;
		case 'sum': $resolve = Number(Math.floor(Math.floor($Y * 12) * 30))+Math.floor(Number($m) * 30)+Number($d); break;
		default : $resolve = String($Y+"-"+$m+"-"+$d); 
	};

    return $resolve;
}

//	HOUR IN FORMAT
var _hour = function($format){
	var $date = new Date();
	var $h = $date.getHours();
	var $m = $date.getMinutes();
	var $s = $date.getSeconds();
	var $ms = $date.getMilliseconds();
	
	$h = String(($h < 10) ? "0"+$h : $h);
	$m = String(($m < 10) ? "0"+$m : $m);
	$s = String(($s < 10) ? "0"+$s : $s);
	$ms = ($ms < 10) ? "0"+$ms : $ms;
	$ms = ($ms < 100) ? "0"+$ms : $ms;
	
	var $resolve = '';
	switch($format){
		case 'h' : $resolve = Number($h); break;
		case 'm' : $resolve = Number($m); break;
		case 's' : $resolve = Number($s); break;
		case 'ms' : $resolve = Number($ms); break;
		case 'h:m' : $resolve = String($h+":"+$m); break;
		case 'm:s' : $resolve = String($m+":"+$s); break;
		case 's:ms' : $resolve = String($s+":"+$ms); break;
		case 'sum' : $resolve = Math.floor(Math.floor(Number($h) * 60) * 60)+Number(Math.floor($m * 60))+Number($s)+Number('0.'+$ms); break;
		default : $resolve = String($h+":"+$m+":"+$s);
	};
	
	return $resolve;
};

/* TRANSFORM STRING DATE IN OBJECT DATE*/
var dateParse = function(dt){
	var dArray = dt.split('/');
	var d = dArray[0];
	var m = dArray[1];
	var Y = dArray[2];
	return String(Y+'-'+m+'-'+d);
};

/* TRANSFORM OBJECT DATE IN STRING DATE*/
var dateView = function(dt){
	var dArray = dt.split('-');
	var Y = dArray[0];
	var m = dArray[1];
	var d = dArray[2];
	return String(d+'/'+m+'/'+Y);
};


} ) ( );