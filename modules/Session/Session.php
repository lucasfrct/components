<?php
#Session.php
namespace Session;

include_once ( "config/session.config.php" );

#Class singleton: Session::on ( $token, $time );
class Session 
{
	private static $instance = NULL;
	private $time = 60;

	# Método que constrói a classe
	public static function on ( string $time = "60" ): Session
	{
		# Inicia um nova instância
		if ( NULL == self::$instance ) {
			self::$instance = new self;
		};
		
		# Carreaga o tempo de expiração da sessão
		self::$instance->time = $time;

		return self::$instance;
	}

	# Método para abrir uma nova sessão
	public function open ( string $token = "" ): Session
	{
		# Verifica se existe sessão ativa
		if ( session_status ( ) !== PHP_SESSION_ACTIVE ) {
			# Gera uma nova id de sessão
			session_id ( $token );
			# O cache da sessão é mantido pelos minutos descritos na variável $time
			session_cache_expire ( $this->time );
			# Inicia a sessão com os parâmetors definidos
			session_start ( );
		};
		return $this;
	}

	# Método para carregar um usuário
	public function user ( array $user = Array ( ) ): array
	{
		# Carrega um novo usuário na sessão
		return $_SESSION [ "user" ] = $user;
	}

	public function status ( )
	{
		return ( !empty ( session_id ( ) ) ) ? TRUE : FALSE;
	}
	
	# Encerra doas as variáveis de sessão
	public function destroy ( ): Session
	{	
		if ( session_status ( ) == PHP_SESSION_ACTIVE ) {
			# Apaga todas as variáveis na sessão
			session_unset ( );
			# Destroy a sessão atual
			session_destroy ( );
		};
		return $this;
	}

	# Protetor Singletom na construção da classe
	private function __construct ( ) { }

	# Protetor Simgleton na clonagem da classe
	private function __clone ( ) { $this->destroy ( ); }

	# Protetor Simgleton contra o despertar da classe
	private function __wakeup ( ) { $this->destroy ( ); }
};