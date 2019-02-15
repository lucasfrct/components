<?php
#Connect.php

class Connect 
{
	# Singleton Instance
	private static $instance = null; # Instância única
	private $database = ""; # nome o vanco de dados
	private $connection = null; # instância do PDO connect

	const HOST = "127.0.0.1:3306"; # servidor mysql
	const USERNAME = "root"; # usuário de acesso
	const PASSWORD = ""; # senha passe de acesso

	# faz um pingo no servidor 
	private function ping ( string $host = "127.0.0.1:80" ) 
	{
		$server = @fsockopen ( $host, -1, $errCode, $errStr, 1 );
		@fclose ( $server );
		return ( $server ) ? TRUE : FALSE;
	}

	# método stático para iniciar a classe em sigleton
	public static function on ( string $database = "" ): Connect
	{
		# cria uma nova instância
		if ( null == self::$instance && !empty ( $database ) ) {
			self::$instance = new Connect;
		};
		
		if ( !empty ( $database ) ) {
			# carrega o nome do banco de dados
			self::$instance->database = $database;
			
			# inicia a conexão PDO
			if ( self::$instance->ping ( self::HOST ) ) {
				self::$instance->getConnection ( );
			};
		};
		
		#retorna um objeto tipo Connect
		return self::$instance;
	}

	# faz a connexão como o banco de dados PDO
	private function getConnection ( ): PDO
	{
		if ( null == $this->connection ) {
			$this->connection = @new PDO ( 
				"mysql:dbname=".$this->database.";host:".self::HOST."", 
				self::USERNAME, 
				self::PASSWORD 
			);
			# habilita o o error de exceção
			$this->connection->setAttribute ( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
			# configura o Charset para UTF-8
			$this->connection->exec("set names utf8");

			return $this->connection;	
		};
	}

	# inicia um acesso  ao bacno de dados
	public function query ( string $sql = "", array $data = Array ( ) )
	{
		$stmt = $this->connection->prepare ( $sql );
		$stmt->execute ( $data );
		return $stmt; 
	}

	public function insert ( string $table = "", string $fields = "*", string $values = "" ): bool
	{
		$params = explode ( ",", $fields );
		$params = array_map ( function ( $item  ) {
			return  ":".trim( $item );
		}, $params );
		$paramsStr = implode ( ", ", $params );
		
		preg_match_all ( '/\'([^\']*)\'/', $values, $result );
		$values  = $result [ 1 ];

		$data = Array ( );
		foreach ( $params as $key => $field ) {
			$data = array_merge ( $data, array ( $field => $values [ $key ] ) );
		};

		$sql = "INSERT INTO {$table} ({$fields}) VALUES({$paramsStr})";
		$insert = $this->query ( $sql, $data );
		return  ( $insert->rowCount ( ) > 0 ) ? TRUE : FALSE;
	}

	public function select ( string  $table = "", string $fields = "", string $condition = "" ): array
	{
		#$sql = "SELECT {$fields} FROM {$table } WHERE {$condition}";
		$condition = ( !empty ( $condition ) ) ? " WHERE {$condition}" : "";
		$sql = "SELECT {$fields} FROM {$table } {$condition}";
		$consult = $this->query ( $sql );
		$result = Array ( );
		while ( $row = $consult->fetch(PDO::FETCH_ASSOC) ) {
			$result = array_merge ( $result, array ( $row ) );
		};
		return $result;
	}

	public function update ( string $table = "", string $data = "" , string $condition = "" ): bool
	{
		$sql = "UPDATE {$table} SET user = :user, email = :email WHERE id= :id";
		$data = Array( ':id' => '24', ':user' => 'user aaa', ':email' => "email aaa" );
		$update = $this->query ( $sql, $data );
		return  ( $update->rowCount ( ) > 0 ) ? TRUE : FALSE;
	}

	# Protetor Singletom na Construção da classe
	private function __construct ( ) { }

	# Protetor Simgleton na colnagem da classe
	private function __clone ( ) { }

	# Protetor Simgleton contra o despertar da classe
	private function __wakeup ( ) { }
};

$conn = Connect::on ( "callcommunity" );
#$conn->insert ( "registers", "user, email", "'user1', 'email1 , teste: email.'" );
#$data = $conn->select ( "registers", "user, email, country" );
#echo json_encode ( $data );
var_dump ( $conn->update ( "registers", "user='userAAA', email='emailAAA'", "id='24'" ) );