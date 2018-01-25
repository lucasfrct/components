<?php	
	function hasLetter($letter,$word){ return (strripos($word,$letter)) ? true : false; };
	function replaceLetter($char, $sub, $text){ return str_replace($char, $sub, $text); };
	function clearLetter($word){ return trim(preg_replace("/[^0-9]/", "", $word)); };
	function countLetter($str){ return strlen($str); };
	function stroc($letter,$string){ return substr_count($string, $letter); };
	function num($str){ return preg_replace("/[^0-9]/", "", $str); };
	
	function cpfEvaluate($cpf){
		$cpf = clearLetter($cpf);
		
		function blockNum($cpf){
			$g = false;
			switch($cpf){
				case '00000000000' : $g = false; break;
				case '11111111111' : $g = false; break;
				case '22222222222' : $g = false; break;
				case '33333333333' : $g = false; break;
				case '44444444444' : $g = false; break;
				case '55555555555' : $g = false; break;
				case '66666666666' : $g = false; break;
				case '77777777777' : $g = false; break;
				case '88888888888' : $g = false; break;
				case '99999999999' : $g = false; break;
				default : $g = true;
			};
			return $g;
		};
		
		function validate($cpf){
			for($t = 9; $t < 11; $t++){
				for($d = 0, $c = 0; $c < $t; $c++){ $d += $cpf{$c} * (($t + 1) - $c); }; 
				$d = ((10 * $d) % 11) % 10;
				if($cpf{$c} != $d){ return false; };
			};
			return true;
		};
		
		return (countLetter($cpf) == 11 && blockNum($cpf)) ? validate($cpf) : false;
	};
	

class Form
{
	
	public function valid($data){
		$response = array();
		
		function text($name,$val){
			return 	(countLetter($val) >= 5) ? trim($val) : array('name'=>$name);
		};
		
		function dated($name,$val){
			return (hasLetter('/',$val)) ? trim(str_replace('/','-',$val)) : array('name'=>$name); 
		};
		
		function tel($name,$val){
			$val = clearLetter($val);
			$n = countLetter($val);
			return ($n >= 10 && $n <=13) ? trim($val) : array('name'=>$name);
		};
		
		function cpf($name,$val){
			$val = clearLetter($val);
			return (cpfEvaluate($val)) ? trim($val) : array('name'=>$name);
		};
		
		function cep($name,$val){
			$val = clearLetter($val);
			return (countLetter($val) == 8) ? trim($val) : array('name'=>$name);
		};
		
		function email($name,$val){
			return (countLetter($val) >= 8 && hasLetter('@',$val) && hasLetter('.',$val)) ? trim($val) : array('name'=>$name);
		};
		
		function password($name,$val){
			$pass = 'aaaaaa';
			return ($val == $pass && countLetter($val) >= 6 && !hasLetter(' ',$val)) ? trim($val) : array('name'=>$name);
		};
		
		function evaluate($name,$val){
			switch($name){
				case 'name' : return text($name,$val); break;
				case 'date' : return dated($name,$val); break;
				case 'tel'  : return tel($name,$val); break;
				case 'cpf'  : return cpf($name,$val); break;
				case 'cep'  : return cep($name,$val); break;
				case 'email': return email($name,$val); break;
				case 'password': return password($name,$val); break;
				default : return text($name,$val);
			};
		};
	
		$n = count($data);
		for($i = 0; $i < $n; $i++){
			$v = evaluate($data[$i]['name'],$data[$i]['value']);
			(is_array($v)) ? array_push($response,$v) : $data[$i]['value'] = $v;
		};
		
		$data = (count($response) > 0) ? array() : $data;
		return array($response,$data);
	}
};