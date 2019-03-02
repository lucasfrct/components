<?php
#Log.php
namespace Log;

include_once ( "config/log.config.php" );

class Log 
{
	private $connection = NULL; # Classe de conecxaõ ao banco de dados 
	private $table = ""; # Tabela dos registros de log
	private $id = ""; # [ru] capaturado na sessão corrente
	private $user = ""; # [name] capaturado na sessão corrente

	# Método que carrega as dependências e parâmeros da classe
	public function __construct ( object $connection = NULL )
	{
		# Objeto de connexão ao banco de dados
		$this->connection = $connection; 
		# Carrega a tabela referida em configurações
		$this->table = $GLOBALS [ "LOG" ] [ "TABLE" ];
	}

	# Método que insere o comentário no banco de dados
	private function insert ( string $id = "", string $user = "", string $comment = "" ): bool
	{
		# SQL de inserção
		$sql = "INSERT INTO log ( `idUser`, `user`, `commet`, `date` )";
		$sql .= " VALUES ( :id, :user, :comment,  SYSDATE()  )";
		# Dados que serão armazenados
		$data = array ( ":id"=>$id, ":user"=>$user, ":comment"=>$comment );
		#consulta insert no MySqli (PDO)
		$insert = $this->connection->query ( $sql, $data );
		return  ( $insert->rowCount ( ) > 0 ) ? TRUE : FALSE;
	}

	# Método responsável por carregar as informações para registrar os dados
	public function register ( string $comment = "" ): bool
	{
		# Verifica se existe uma sessão
		if ( isset ( $_SESSION [ "user" ] ) ) {
			#carrega os dados da sessão
			$this->id = $_SESSION [ "ru" ];
			$this->user = $_SESSION [ "name" ];
		};
		# Registra um Log no banco de dados
		return $this->insert ( $this->id, $this->user, $comment );
	}
}