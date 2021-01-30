<?php
// Simulation configuration
$config['uppercase'] = true;



$lambda = function ($str) { return $str; };
echo "Método Lambda = ".$lambda('lambda')."<br>";


$closure = function ($message) use ($config,$lambda){
    if(isset($config['uppercase']) && $config['uppercase'] == true) { $message = strtoupper($message); };
    return $message;
};

echo "Método Closure = ".$closure('Closure')."<br>";
 

$callback = function ($message, $callbacked) { return $callbacked($message); };
echo "Método Callback = ".$callback('Callback', $closure)."<br>";


class Invoker {
    public function __invoke($msg) {
        echo "Método invoke = ".$msg."<br>";
    }
}
 
$inv = new Invoker();
$inv('invoke');


// syntax simple explicit
$str = " syntax simple explicit";
echo "mostrando {$str} : {variavel}<br>";

$lig = function(&$v){
	$v++;
};

$l = 1;
echo $l ;
$lig($l);
echo $l ;