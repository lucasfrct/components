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
				"mysql:host:".self::HOST."", self::USERNAME, self::PASSWORD 
			);
		};
		# selectiona um banco de dados
		$this->connection->exec ( "use {$this->database}" );
		# configura o Charset para UTF-8
		$this->connection->exec ("set names utf8");
		# habilita o o error de exceção
		$this->connection->setAttribute ( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

		return $this->connection;
	}

	# inicia um acesso  ao bacno de dados
	public function query ( string $sql = "", array $data = Array ( ) )
	{
		$stmt = $this->connection->prepare ( $sql );
		$stmt->execute ( $data );
		return $stmt; 
	}

	# obtém a string de fields e modela para uma array de fields
	public function getFields ( string $fields = ""  ): array
	{
		$fields = explode ( ",", $fields );
		$fields = array_map ( function ( $item  ) {
			return trim ( $item );
		}, $fields );
		return $fields;
	}

	# obtém a string de fields e modela para uma array de params
	public function getParams ( string $fields = ""  ): array
	{
		$params = explode ( ",", $fields );
		$params = array_map ( function ( $item  ) {
			return  ":".trim ( $item );
		}, $params );
		return $params;
	}

	# obtém uma array de params e uma string de values e modela para uma array de data
	public function getData ( array $params = Array ( ), string $values = "" ): array
	{
		preg_match_all ( '/\'([^\']*)\'/', $values, $result );
		$values  = $result [ 1 ];

		$data = Array ( );
		foreach ( $params as $key => $field ) {
			$data = array_merge ( $data, array ( $field => $values [ $key ] ) );
		};
		return $data;
	}

	# obtém as arays de params e fields e modela para uma cosulta Update 
	public function getConsult ( array $params = Array ( ), array $fields = Array ( ) ): string
	{
		$consult = "";
		foreach ( $fields as $key => $field ) {
			$consult .= ", ".$field." = ".$params [ $key ];
		};
		return substr ( $consult, 2 );
	}

	# insere conteúdo no banco de dados
	public function insert ( string $table = "", string $fields = "*", string $values = "" ): bool
	{
		$params = $this->getParams ( $fields );
		$paramsStr = implode ( ", ", $params );
		$data = $this->getData ( $params, $values );

		$sql = "INSERT INTO {$table} ({$fields}) VALUES({$paramsStr})";
		$insert = $this->query ( $sql, $data );
		return  ( $insert->rowCount ( ) > 0 ) ? TRUE : FALSE;
	}

	# selectiona conteúdo no banco de dados
	public function select ( string  $table = "", string $fields = "", string $condition = "" ): array
	{
		$condition = ( !empty ( $condition ) ) ? " WHERE {$condition}" : "";
		$sql = "SELECT {$fields} FROM {$table } {$condition}";
		return $this->query ( $sql )->fetchAll( PDO::FETCH_ASSOC );
	}

	# atualiza caonteúdo no banco de dados
	public function update ( string $table = "", string $fields = "" , string $values = "", string $condition = "" ): bool
	{	
		$params = $this->getParams ( $fields );
		$fields = $this->getFields ( $fields );
		$consult = $this->getConsult ( $params, $fields );
		$data = $this->getData ( $params, $values );

		$sql = "UPDATE {$table} SET {$consult} WHERE {$condition}";
		$update = $this->query ( $sql, $data );
		return  ( $update->rowCount ( ) > 0 ) ? TRUE : FALSE;
	}

	# deleta consteúdo no banco de dados
	public function delete ( string $table = "", string $condition = "" ): bool
	{
		$sql = "DELETE FROM {$table} WHERE {$condition}";
		$delete = $this->query ( $sql );
		return  ( $delete->rowCount ( ) > 0 ) ? TRUE : FALSE;
	}

	# Protetor Singletom na Construção da classe
	private function __construct ( ) { }

	# Protetor Simgleton na colnagem da classe
	private function __clone ( ) { }

	# Protetor Simgleton contra o despertar da classe
	private function __wakeup ( ) { }
};

$conn = Connect::on ( "callcommunity" );
#echo $conn->insert ( "registers", "user, email", "'userinsert', 'emailinsert , teste: email.'" );
#$data = $conn->select ( "registers", "id, user, email, country", "user='root' AND password='root1234'" );
#echo json_encode ( $data );
#echo $conn->update ( "registers", "user, email", "'userupdate', 'emailupdate'", "id='6'" );
#echo $conn->delete ( "registers", "id=6" );