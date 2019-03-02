<?php 
# Recover.php
namespace Recover;

use PDO;

# Dependência: arquivo de configuração de Recover
include_once ( "config/recover.config.php" );

class Recover 
{
	private $connection = NULL;
	private $log = NULL;
	private $crypt = NULL;
	private $table = "";
	private $email = "root@root.com";
	private $token = "";
	private $domain = "";

	# Método que inicia as dependências e configuração da classe Recover 
	public function __construct ( object $connection = NULL, object $log = NULL, object $crypt = NULL )
	{
		$this->connection 	= $connection;
		$this->log 			= $log;
		$this->crypt 		= $crypt;
		$this->table 		= $GLOBALS [ "RECOVER" ] [ "TABLE" ];
		$this->domain 		= $GLOBALS [ "RECOVER" ] [ "DOMAIN" ];
	}

	# Método que captura uma postagem POST
	private function getPost ( ): bool 
	{
		# Verifica se houve um a postagem
		$status = ( $_SERVER [ "REQUEST_METHOD" ] == "POST" ) ? TRUE : FALSE;

		# Havendo uma postagem, carrega o email para a recuperação
		if ( $status ) { 
			$this->email = $_POST [ "email" ] ?? "";
		};

		return $status;
	}

	# Método que captura uma postagem GET
	private function methodGet ( ): bool 
	{
		# Verifica se houve um a postagem do tipo GET
		$status = ( $_SERVER [ "REQUEST_METHOD" ] == "GET" && isset ( $_GET [ "token" ] ) ) ? TRUE : FALSE;

		# Havendo uma postagem, carrega o token para a recuperação
		if ( $status ) { 
			$this->token = $_GET [ "token" ] ?? "";
		};

		return $status;
	}

	# Método que verifica a existência do usuário no banco de dados
	private function validate ( ): bool
	{
		# Seleciona a tabela
		$sql = "SELECT email FROM ".$this->table;
		# Consulta a existência do usuário
		$sql .= " WHERE email=:email LIMIT 1";

		$data = array ( 
			":email"=> $this->email
		);

		# Executa a consulta e retorna o usuário existente
		$email = $this->connection->query ( $sql, $data )->fetchAll ( PDO::FETCH_ASSOC );
		# Retorna TRUE para usuário encontrado e FALSE caso ele não exista
		$status = ( count ( $email ) == 1 ) ? TRUE : FALSE;
		return $status;
	}

	# Método que verifica a existência do usuário no banco de dados
	private function validateToken ( ): bool
	{
		# Seleciona a tabela
		$sql = "SELECT email FROM ".$this->table;
		# Consulta a existência do usuário
		$sql .= " WHERE email=:email AND recover=:recover  LIMIT 1";

		$data = array ( 
			":email"=> $this->email,
			":recover"=> $this->token
		);

		# Executa a consulta e retorna o usuário existente
		$email = $this->connection->query ( $sql, $data )->fetchAll ( PDO::FETCH_ASSOC );
		# Retorna TRUE para usuário encontrado e FALSE caso ele não exista
		$status = ( count ( $email ) == 1 ) ? TRUE : FALSE;
		return $status;
	}

	# Método que atulizada o trecover do usuário no banco de dados
	private function insertToken ( string $token = "" ): bool
	{
		# consulta SQL para atualizar conteúdo no banco de dados
		$sql = "UPDATE ".$this->table." SET recover=:recover, expire=SYSDATE() WHERE email=:email";

		# Pilha com a hash de recuperação
		$data = array ( 
			":recover" => $token,
			":email"=> $this->email
		);
		#consulta update no MySqli (PDO)
		$insert = $this->connection->query ( $sql, $data );
		return  ( $insert->rowCount ( ) > 0 ) ? TRUE : FALSE;
	}

	public function token (  ): string
	{
		$token = $this->email.":&&:".$this->crypt->hash ( $this->email );
		return $this->crypt->encode ( $token );
	}

	public function digest ( string $token = "" ): array
	{
		$data = explode ( ":&&:", $this->crypt->decode ( $token ) );
		return $data;
	}

	public function link ( string $token = "" ): string
	{
		return $this->domain."?token=".$token;
	}

	public function get ( )
	{
		$get = "";
		# Verifica se houve uma postagem tipo POST
		if ( $this->getPost ( ) && !empty ( $this->email ) ) {
			if ( $this->validate ( ) ) {
				$token = $this->token ( );
				if ( $this->insertToken ( $token ) ) {
					$get =  $this->link ( $token );
				};
			};
		};

		# Verifica se houve uma postagem tipo GET
		if ( $this->methodGet ( ) ) {
			if ( $this->validateToken ( ) ) {
				$get = TRUE;
			};
		};

		return $get;
	}
}
