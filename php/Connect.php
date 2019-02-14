<?php
#Connect.php

class Connect 
{
	# Instância única 
	private static $instance = null;
	private $database = "";

	const USERNAME = "root";
	const PASSWORD = "";
	const HOST = "127.0.0.1:3306"

	public static function on ( string $database = "" ) 
	{
		if ( null == self::$instance ) {
			self::$instance = new Connect;
		};
		self::$instance->database = $database;
	}

	# Protetor Singletom na Construção da classe
	private function __construct ( ) { }

	# Protetor Simgleton na colnagem da classe
	private function __clone ( ) { }

	# Protetor Simgleton contra o despertar da classe
	private function __wakeup ( ) { }
};


function ping ( string $domain = "localhost" ) {
	$status = FALSE;
	exec ( "ping -n 1 -w 1 " . $domain, $output, $result );
	$status =  ( !$result && count ( $output ) > 2 ) ? TRUE : FALSE;
	return $status;
}