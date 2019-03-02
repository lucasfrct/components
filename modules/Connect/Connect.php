<?php
#Connect.php
namespace Connect;

# dependência: Classes PDO será uniciada no método ->getConnection ( )
use PDO; 

# Dependência: arquivo de configuração de Connect 
include_once ( "config/connect.config.php" );

class Connect 
{
	# Singleton Instance
	private static $instance = NULL; # Instância única
	private $database = ""; # Nome do banco de dados
	private $connection = NULL; # Instância do PDO connect

	private $host = ""; # Servidor mysql
	private $username = ""; # Usuário de acesso
	private $password = ""; # Senha passe de acesso

	# Método que faz um pingo no servidor 
	private function ping ( string $host = "127.0.0.1:80" ): bool 
	{
		$server = @fsockopen ( $host, -1, $errCode, $errStr, 1 );
		@fclose ( $server );
		return ( $server ) ? TRUE : FALSE;
	}

	# Método estático para iniciar a classe em sigleton
	public static function on ( string $database = "" ): Connect
	{
		# Cria uma nova instância
		if ( null == self::$instance && !empty ( $database ) ) {
			self::$instance = new Connect;
		};
		
		if ( !empty ( $database ) ) {
			# Carrega o Ip da Máquina com o Database
			self::$instance->host = $GLOBALS [ "CONNECT" ] [ "HOST" ];
			# Usuário do Database
			self::$instance->username = $GLOBALS [ "CONNECT" ] [ "USERNAME" ];
			# Senha passse para acessa o database
			self::$instance->password = $GLOBALS [ "CONNECT" ] [ "PASSWORD" ];
			# Carrega o nome do banco de dados
			self::$instance->database = $database;

			# Inicia a conexão PDO
			if ( self::$instance->ping ( self::$instance->host ) ) {
				self::$instance->getConnection ( );
			};
		};
		
		# Retorna um objeto tipo Connect
		return self::$instance;
	}

	# Método que faz a connexão com o banco de dados PDO
	private function getConnection ( ): PDO
	{
		if ( null == $this->connection ) {
			$this->connection = @new PDO ( 
				"mysql:host:".$this->host."", $this->username, $this->password 
			);
		};
		# Selectiona um banco de dados
		$this->connection->exec ( "use {$this->database}" );
		# Configura o Charset para UTF-8
		$this->connection->exec ("set names utf8");
		# Habilita o error de exceção
		$this->connection->setAttribute ( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

		return $this->connection;
	}

	# Inicia uma consulta ao bacno de dados
	public function query ( string $sql = "", array $data = Array ( ) ): object
	{
		$stmt = $this->connection->prepare ( $sql );
		$stmt->execute ( $data );
		return $stmt; 
	}

	# Método que retorna a onstancia direta do PDO
	public function instance ( )
	{
		return $this->connection;
	}

	# Protetor Singletom na construção da classe
	private function __construct ( ) { }

	# Protetor Simgleton na clonagem da classe
	private function __clone ( ) { }

	# Protetor Simgleton contra o despertar da classe
	private function __wakeup ( ) { }
};

#$conn = Connect::on ( "callcommunity" );
#$result = $conn->query ( "SELECT id, user FROM registers WHERE id>1" );
#$conn->instance ( );
#var_dump ( $result->fetchAll( PDO::FETCH_ASSOC ));