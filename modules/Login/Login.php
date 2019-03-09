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
	private $email = "root@root.com"; # Email do usuário que tenta logar
	private $password = "root1234"; # Senha do usuário que tenta logar
	private $table = ""; # Tabela no banco de dados que contém o registro do usuário
	private $user = Array ( ); # Pilha com informações do usuário logado

	# Método que inicia as dependências e configuração da classe Login 
	public function __construct ( object $connection = NULL, object $session = NULL, object $log = NULL )
	{
		$this->connection = $connection; # Classe de conexaõ ao banco de cadosd
		$this->session    = $session; # Classe que carrega as sessãoes
		$this->log        = $log; # Classe que registra os logs
		$this->table      = $GLOBALS [ "LOGIN" ] [ "TABLE" ]; # tabela login no database
	}

	# Método que captura uma postagem com nome e senha do usuário 
	private function getPost ( ): bool 
	{
		# Verifica se houve um a postagem e se contém alguma senha nela
		$status = ( $_SERVER [ "REQUEST_METHOD" ] == "POST"  && !empty ( $_SERVER [ "HTTP_AUTHENTICATION" ] ) ) ? TRUE : FALSE;

		# Havendo uma postagem, carrega as variáveis para a classe
		if ( $status ) { 
			$this->email = $_POST [ "email" ] ?? "";
			$this->password = $_SERVER [ "HTTP_AUTHENTICATION" ] ?? "";
		};

		return $status;
	}

	# Método que verifica a existência do usuário no banco de dados
	private function validate ( ): bool
	{
		# Seleciona a tabela
		$sql = "SELECT id, user, email FROM ".$this->table;
		# Consulta a existência do usuário
		$sql .= " WHERE email='".$this->email."' AND password='".$this->password."' LIMIT 1";
		# Executa a consulta e retorna o usuário existente
		$user = $this->connection->query ( $sql )->fetchAll ( PDO::FETCH_ASSOC );
		# Retorna TRUE para usuário encontrado e FALSE caso ele não exista
		$status = ( count ( $user ) == 1 ) ? TRUE : FALSE;
		# Carrega dadfos do usuário para a classe
		if ( $status ) {  
			$data = array ( 
				"date"=> date ( "c" ), 
				"token"=>$this->session->id ( ) 
			);
			$this->user = array_merge ( $user [ 0 ], $data );
		};
		return $status;
	}

	# Método que carrega uma sessao no servidor 
	private function loadSession ( ): void
	{
		$this->session->user ( $this->user );
	}

	# Método que verifica o status da sessão
	private function checkSession ( ): bool
	{
		return $this->session->status ( );
	}

	# Método que destrói a sessão atual
	private function denySession ( ): void
	{
		$this->session->destroy ( );
	}

	# Método que concede acesso ao usuário
	public function access ( string $email = "", string $password = "" )
	{	
		# Vairável de status no método
		$access = FALSE;

		# Verifica se o usuário estã se logango diretamente 
		if ( !empty ( $email ) && !empty ( $password ) ) {
			$this->email = $email; # Carrega o email
			$this->password = $password; # Carrega o password
			
			# Verifica a existência no usuário no database
			if ( $this->validate ( ) ) {
				# Carrega um sessão de usuário
				$this->loadSession ( );
				# Registra um log de acesso
				$this->log->register ( "Action: init login and session || User: ".json_encode ( $this->user ) );
			};
		};

		# Verifica se houve uma postagem, coleta os dados e consulta o database 
		if ( $this->getPost ( ) && $this->validate ( ) ) { 
			# Carrega um sessão de usuário
			$this->loadSession ( );
			# Registra um log de acesso
			$this->log->register ( "Action: init login and session || User: ".json_encode ( $this->user ) );
		};

		# Verifica se a sessão está ativa
		$access = $this->checkSession ( );

		return $access;
	}

	# Método que nega o acesso e destrói a sessãos
	public function deny ( string $redirect = "" )
	{	
		# Apaga a sessão atual do usuário
		$this->denySession ( );
		# Registra a cação no Log
		$this->log->register ( "Action: deny login and session || User: ".json_encode ( $this->user ) );
		# Retorna o stados da sessão
		return $this->checkSession ( );
	}

	# Método que verifica a validade o acesso
	public function check ( string $redirect = "" )
	{
		# Retorna o estado da sessão
		return $this->checkSession ( );
	}
};

# $login = new Login ( Connect::on ( database ), Session::on ( 1 ), new Log ( Connect::on ( database ) ) );
# $login->access ( email, password );
# $login->check ( );
#  $login->deny( );