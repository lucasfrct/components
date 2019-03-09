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
	private $table = ""; # Tabela no banco de dados que será atualizada e consuldada 
	private $email = ""; # Email de referência para consulta 
	private $date = ""; # Data de gerção do link
	private $token = ""; # Token de acesso em base64
	private $domain = ""; # Domínio de referência do link

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

	# Método que gera o token de recuperação 
	private function gerateToken (  ): string
	{	
		# Transfoama uma array em JSON e depois encoda para base64
		$token = json_encode ( array ( "email"=> $this->email, "date"=>date ( "c" ) ) );
		return $this->token = $this->crypt->encode ( $token );
	}

	# Método insere o token de recuperação no banco de dados baseado no email
	private function insertToken ( ): bool
	{
		# consulta SQL para atualizar conteúdo do email no banco de dados
		$sql = "UPDATE ".$this->table." SET recover=:recover, expire=SYSDATE() WHERE email=:email";

		# Pilha com o email e o token de recuperação
		$data = array ( 
			":recover" => $this->token,
			":email"=> $this->email
		);
		#consulta update no MySqli (PDO)
		$insert = $this->connection->query ( $sql, $data );
		return  ( $insert->rowCount ( ) > 0 ) ? TRUE : FALSE;
	}

	# Método que solicita a recuperação do email e gera o token
	public function requisition ( string $email = "" ): bool
	{
		$requisition = FALSE;
		
		# Verifica se existe um email e carrega para a classe
		if ( !empty ( $email ) ) {
			$this->email = $email;
		};

		# Veirifica se houve uma postagem ou se existe um email
		if ( $this->requestPost ( ) || !empty ( $this->email ) ) {
			# Verifica se o email existe no banco de dados
			if ( $this->validateEmail ( ) ) {
				# Gerar um Token
				$this->gerateToken ( );
				# Insere o token no banco de dados
				if ( $this->insertToken ( ) ) {
					$requisition = TRUE;
				};
			};
		};

		return $requisition;
	}

	# Método que disponibiliza o token gerado
	public function token ( ): string 
	{
		return $this->token;
	}

	# Método que gera o link para ser enviado ao email de solicitação
	public function link ( ): string
	{
		return $this->domain."?token=".$this->token;
	}

	# Método que captura o token para validar a recuperação
	private function requestGet ( ): bool 
	{
		# Verifica se houve um a postagem do tipo GET
		$status = ( $_SERVER [ "REQUEST_METHOD" ] == "GET" && isset ( $_GET [ "token" ] ) ) ? TRUE : FALSE;

		# Havendo uma postagem, carrega o token para a recuperação
		if ( $status ) { 
			$this->token = $_GET [ "token" ] ?? "";
		};

		return $status;
	}
	
	# Método que lê o link e recupera o email e o token para recuperação
	private function digestToken ( ): bool
	{	
		# Transforma o token em uma array
		$data = json_decode ( $this->crypt->decode ( $this->token ), TRUE );
		$this->email = $data [ "email" ]; # Carrega o email
		$this->date = $data [ "date" ]; # Carrega o data
		# Retorna se os dados foram carregados
		return ( !empty ( $this->email ) && !empty ( $this->date ) ) ? TRUE : FALSE;
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

	# Método que faz a requisição de conferência do token recebido
	public function access ( string $token = "" ): string
	{
		$access = FALSE;

		# Verifica se existe um token
		if ( !empty ( $token ) ) {
			$this->token = $token;
		};

		# Verifica se houve uma requisição GET ou se existe um token
		if ( $this->requestGet ( ) || !empty ( $this->token ) ) {
			# Extria dados do token e comfima a existêcia do tokem no banco de dados
			if ( $this->digestToken ( ) && $this->validateToken ( ) ) {
				$access = TRUE;
			};
		};
		
		return $access;
	}
};

# $recover = new Recover ( Connect::on ( database), new Log ( Connect::on ( database ) ), new Crypt );
# $recover->requisition ( );