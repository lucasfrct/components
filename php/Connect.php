<?php
#Connect.php

class Connect 
{
	# Instância única 
	private static $instance = null;
	private $database = "";
	private $connection = null;

	const HOST = "127.0.0.1";
	const USERNAME = "root";
	const PASSWORD = "";

	private function ping ( string $domain = "127.0.0.1" ) {
		$status = FALSE;
		exec ( "ping -n 1 -w 1 " . $domain, $output, $result );
		var_dump ( $output ); 
		$status =  ( !$result && count ( $output ) > 2 ) ? TRUE : FALSE;
		return $status;
	}

	public static function on ( string $database = "" ): Connect
	{
		if ( null == self::$instance ) {
			self::$instance = new Connect;
		};
		
		self::$instance->database = $database;
		
		if ( self::ping ( self::HOST ) ) {
			self::$instance->getConnection ( );
		};

		echo self::ping ( self::HOST );
		
		return self::$instance;
	}

	private function getConnection ( ): PDO 
	{
		if ( null == $this->connection ) {
			$this->connection = @new \PDO ( 
				"mysql:dbname=".self::$instance->database.";host:".self::HOST."", 
				self::USERNAME, 
				self::PASSWORD 
			);
		};

		return $this->connection;
	}

	public function query ( string $sql = "", $args = Array ( ) )
	{
		$stmt = $this->connection->prepare ( $sql );
		$stmt->execute ( $args );
		return $stmt; 
	}

	# Protetor Singletom na Construção da classe
	private function __construct ( ) { }

	# Protetor Simgleton na colnagem da classe
	private function __clone ( ) { }

	# Protetor Simgleton contra o despertar da classe
	private function __wakeup ( ) { }
};

$conn = Connect::on ( "test" );
#var_dump ( $conn );