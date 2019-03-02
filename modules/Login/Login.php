<?php
#Login.php
namespace Login;

use PDO;

# Dependência: arquivo de configuração de Login
include_once ( "config/login.config.php" );


class Login
{
	private $connection = NULL; # Classe de conecxaõ ao banco de dados 
	private $session = NULL; # Classe de sessão no servidor
	private $log = NULL; # Classe que insere log no banco de dados 
	private $name = "root"; # Nome so usuário que tenta logar
	private $password = "root1234"; # Senha do usuário que tenta logar
	private $table = ""; # Tabela no banco de dados que contém o registro do usuário
	private $user = Array ( ); # Pilha com informações do usuário logado

	# Método que inicia as dependências e configuração da classe Login 
	public function __construct ( object $connection = NULL, object $session = NULL, object $log = NULL )
	{
		$this->connection = $connection;
		$this->session    = $session;
		$this->log        = $log;
		$this->table      = $GLOBALS [ "LOGIN" ] [ "TABLE" ];
	}

	# Método que captura uma postagem com nome e senha do usuário 
	private function getPost ( ): bool 
	{
		# Verifica se houve um a postagem e se contém alguma senha nela
		$status = ( $_SERVER [ "REQUEST_METHOD" ] == "POST"  && !empty ( $_SERVER [ "HTTP_AUTHENTICATION" ] ) ) ? TRUE : FALSE;

		# Havendo uma postagem, carrega as variáveis para a classe
		if ( $status ) { 
			$this->name = $_POST [ "name" ];
			$this->password = $_SERVER [ "HTTP_AUTHENTICATION" ];
		};

		return $status;
	}

	# Método que verifica a existência do usuário no banco de dados
	private function validate ( ): bool
	{
		# Seleciona a tabela
		$sql = "SELECT id as ru, user as name FROM ".$this->table;
		# Consulta a existência do usuário
		$sql .= " WHERE user='".$this->name."' AND password='".$this->password."' LIMIT 1";
		# Executa a consulta e retorna o usuário existente
		$user = $this->connection->query ( $sql )->fetchAll ( PDO::FETCH_ASSOC );
		# Retorna TRUE para usuário encontrado e FALSE caso ele não exista
		$status = ( count ( $user ) == 1 ) ? TRUE : FALSE;
		# Se existir um usuário, cria um novo token de acesso 
		if ( $status ) {
			$this->user = array_merge ( $user [ 0 ] , array ( "token"=> $this->token ( $user ) ) );
		};
		return $status;
	}

	# Método para criar um novo token de acesso com base no usuário
	private function token ( array $user = Array ( ) )
	{
		return sha1 ( serialize ( $user ).date ( "c" ) );
	}

	# Método que carrega uma sessao no servidor um base no usuário 
	private function loadSession ( array $user = Array ( ) )
	{
		$this->session->open ( $user [ "token" ] );
		$this->session->user ( $user );
	}

	private function checkSession ( )
	{
		return $this->session->status ( );
	}

	private function denySession ( )
	{
		$this->session->destroy ( );
	}

	public function access ( )
	{
		if ( $this->getPost ( ) && $this->validate ( ) ) { 
			$this->loadSession ( $this->user );
			$this->log->register ( "init login and session" );
		};
		return $this->user;
	}

	public function deny ( string $redirect = "" )
	{
		$this->log->register ( "deny login and session" );
		$this->denySession ( );
		header ( "location: ".$redirect );
	}

	public function check ( string $redirect = "" )
	{
		$check = $this->checkSession ( );
		if ( !$check ) {
			header ( "location: ".$redirect );
			$this->log->register ( "Expire session" );
		} else {
			$this->log->register ( "revalid session" );
		};
		return $check;
	}
}