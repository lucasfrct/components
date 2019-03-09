<?php 
# Recover.php
namespace Recover;

use PDO;

# Dependência: arquivo de configuração de Recover
include_once ( "config/recover.config.php" );

class Recover 
{
	private $connection = NULL; # Classe de conexão ao banco de dados 
	private $log = NULL; # Classe que registra os logs 
	private $crypt = NULL; # Classe de encriptação
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

	# Método que captura o email para recuperação
	private function requestPost ( ): bool 
	{
		# Verifica se houve um a postagem
		$status = ( $_SERVER [ "REQUEST_METHOD" ] == "POST" ) ? TRUE : FALSE;

		# Havendo uma postagem, carrega o email para a recuperação
		if ( $status ) { 
			$this->email = $_POST [ "email" ] ?? "";
		};

		return $status;
	}

	# Método que verifica a existência do email no banco de dados
	private function validateEmail ( ): bool
	{
		# Seleciona a tabela
		$sql = "SELECT email FROM ".$this->table;
		# Consulta a existência do usuário
		$sql .= " WHERE email=:email LIMIT 1";

		$data = array ( ":email"=> $this->email );

		# Executa a consulta e retorna o usuário existente
		$email = $this->connection->query ( $sql, $data )->fetchAll ( PDO::FETCH_ASSOC );
		# Retorna TRUE para usuário encontrado e FALSE caso ele não exista
		$status = ( count ( $email ) == 1 ) ? TRUE : FALSE;
		return $status;
	}

	# Método que captura o token para validar a recuperação
	private function requestGet ( ): bool 
	{
		# Verifica se houve um a postagem do tipo GET
		$status = ( $_SERVER [ "REQUEST_METHOD" ] == "GET" ) ? TRUE : FALSE;

		# Havendo uma postagem, carrega o token para a recuperação
		if ( $status ) { 
			$this->token = $_GET [ "token" ] ?? "";
		};

		return $status;
	}

	# Método que gera o token de recuperação 
	private function gerateToken (  ): string
	{
		$token = $this->email.":&&:".$this->crypt->hash ( $this->email );
		return $this->token = $this->crypt->encode ( $token );
	}

	# Método insere o token de recuperação no banco de dados baseado no email
	private function insertToken ( ): bool
	{
		# consulta SQL para atualizar conteúdo do email no banco de dados
		#$sql = "UPDATE ".$this->table." SET recover=:recover, expire=SYSDATE() WHERE email=:email";
		$sql = "UPDATE ".$this->table." SET recover=:recover, expire=SYSDATETIME() WHERE email=:email";

		# Pilha com o email e o token de recuperação
		$data = array ( 
			":recover" => $this->token,
			":email"=> $this->email
		);
		#consulta update no MySqli (PDO)
		$insert = $this->connection->query ( $sql, $data );
		return  ( $insert->rowCount ( ) > 0 ) ? TRUE : FALSE;
	}

	# Método que ler o link e recupera o email e o token para recuperação
	private function digestToken ( ): bool
	{
		$data = explode ( ":&&:", $this->crypt->decode ( $this->token ) );
		$this->email = $data [ 0 ];
		$this->token = $data [ 1 ];
		return ( !empty ( $this->email ) && !empty ( $this->token ) ) ? TRUE : FLASE;
	}

	# Método que verifica a existência do email e token no banco de dados
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

	# Método que gera o link para ser enviado ao email de solicitação
	private function gerateLink ( ): string
	{
		return $this->domain."?token=".$this->token;
	}

	# Método que solicita a recuperação do email e gera o token
	public function requisition ( ): string
	{
		$request = "";
		if ( $this->requestPost ( ) && $this->validateEmail ( ) ) {
			if ( !empty ( $this->gerateToken ( ) ) && $this->insertToken ( ) ) {
				$request = $this->gerateLink ( );
			};
		};
		return $request;
	}

	# Método que faz a requisição de conferência do token recebido
	public function access ( ): string
	{
		$requisition = "";
		if ( $this->requestGet ( ) && $this->digestToken ( ) ) {
			if ( $this->validateToken ( ) ) {
				$requisition = $GLOBALS [ "RECOVER" ] [ "REDIRECT" ];
			};
		};
		return $requisition;
	}
};
