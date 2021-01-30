<?php
#Session.php
namespace Session;

$GLOBALS [ "SESSION" ] = Array ( );

class Session 
{
	private static $instance = NULL; # Instância Singleton
	private $id = 0; # ID da sessão
	private $time = 60; # tempo em minutos da duração de daca sessão
	private $user = Array ( ); # usuário da sessão

	# Método que constrói a classe e configura o tempo da sessão
	public static function on ( string $time = "60" ): Session
	{
		# Inicia um nova instância Session
		if ( NULL == self::$instance ) {
			self::$instance = new self;
		};
		
		# Carreaga o tempo de expiração da sessão
		self::$instance->time = $time;
		$GLOBALS [ "SESSION" ] [ "TIME" ] = self::$instance->time;

		# Inicia uma nova sessão
		self::$instance->open ( );

		return self::$instance;
	}

	# Método para abrir uma nova sessão
	private function open ( ): void
	{
		# Verifica se existe sessão ativa
		if ( !( PHP_SESSION_ACTIVE == session_status ( ) ) ) {
			ini_set ( 'session.use_strict_mode', 0 );
			ini_set( 'session.gc_maxlifetime', ( int ) ( $this->time * 60 ) );
			ini_set( 'session.cookie_lifetime', ( int ) ( $this->time * 60 ) );
			ini_set( 'session.use_trans_sid', 0 );
			session_set_cookie_params ( ( int ) ( $this->time * 60 ) );
			# Cache expire: tempo em minutos
			session_cache_expire ( $this->time );	
			# Inicia a sessão
			session_start ( );
			# Captura a ID da sessão
			$this->id = session_id ( );
			$GLOBALS [ "SESSION" ] [ "ID" ] = $this->id;
		};
	}

	# Método que retorna a id da sessão atual
	public function id ( ): string
	{
		return session_id ( );
	}

	# Método que verifica o status da sessão
	public function status ( ): bool
	{
		return ( !empty ( session_id ( ) ) ) ? TRUE : FALSE;
	}

	# Método para carregar um usuário
	public function user ( array $user = Array ( ) ): array
	{
		# Carrega um novo usuário na sessão
		if ( count ( $user ) > 0 ) {
			$this->user = $user;
			$_SESSION [ "user" ] = $this->user;
			$GLOBALS [ "SESSION" ] [ "USER" ] = $_SESSION [ "user" ];
		};
		return $_SESSION [ "user" ];
	}
	
	# Encerra todas as variáveis de sessão
	public function destroy ( ): Session
	{	
		if ( session_status ( ) == PHP_SESSION_ACTIVE ) {
			# Limpa o tempo de expiração
			$_SESSION [ "sessiontime" ] = time ( );
			$_SESSION [ "deleted_time" ] = time ( );
			# Limpa a variável session
			$_SESSION = array( );
			# Reseta os cabeçálhos da sessão
			session_reset ( );
			# Apaga todas as variáveis na sessão
			session_unset ( );
			# Destroy a sessão atual
			session_destroy ( );
			# Finaliza as configuraçãoes de sessão
			session_commit ( );
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

# $session = Session::on ( 60, token );
# $session->id ( );
# $session->status ( );
# $session->user ( array );
# $session->destroy ( );