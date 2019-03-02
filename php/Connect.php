<?php
#Connect.php

include_once ( "config/connect.config.php" );
class Connect 
{
	# Singleton Instance
	private static $instance = null; # Instância única
	private $database = ""; # nome do banco de dados
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

	# método estático para iniciar a classe em sigleton
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
		# habilita o error de exceção
		$this->connection->setAttribute ( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

		return $this->connection;
	}

	# inicia uma consulta ao bacno de dados
	public function query ( string $sql = "", array $data = Array ( ) )
	{
		$stmt = $this->connection->prepare ( $sql );
		$stmt->execute ( $data );
		return $stmt; 
	}

	# Protetor Singletom na construção da classe
	private function __construct ( ) { }

	# Protetor Simgleton na clonagem da classe
	private function __clone ( ) { }

	# Protetor Simgleton contra o despertar da classe
	private function __wakeup ( ) { }
};

$conn = Connect::on ( "callcommunity" );