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
	private $table = "";
	private $email = "root@root.com";
	private $token = "";

	# Método que inicia as dependências e configuração da classe Recover 
	public function __construct ( object $connection = NULL, object $log = NULL )
	{
		$this->connection 	= $connection;
		$this->log 			= $log;
		$this->table 		= $GLOBALS [ "RECOVER" ] [ "TABLE" ];
	}

	# Método que captura uma postagem com email do usuário
	private function getPost ( ): bool 
	{
		# Verifica se houve um a postagem
		$status = ( $_SERVER [ "REQUEST_METHOD" ] == "POST" ) ? TRUE : FALSE;

		# Havendo uma postagem, carrega o email ou token para a recuperação
		if ( $status ) { 
			$this->email = $_POST [ "email" ] ?? "";
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
		$sql .= " WHERE email='".$this->email."' LIMIT 1";
		# Executa a consulta e retorna o usuário existente
		$email = $this->connection->query ( $sql )->fetchAll ( PDO::FETCH_ASSOC );
		# Retorna TRUE para usuário encontrado e FALSE caso ele não exista
		$status = ( count ( $email ) == 1 ) ? TRUE : FALSE;
		return $status;
	}

	# Método que insere o cadastro do usuário no banco de dados
	private function insert ( ): bool
	{
		# consulta SQL para inserir conteúdo no banco de dados
		$sql = "INSERT INTO ".$this->table." ( `recover`, `expire`  )"; 
		$sql .= "VALUES ( :recover, SYSDATE() )";

		# Pilha com os dados para cadastro do usuário
		$data = array ( 
			":user"		=> $this->user, 
			":email"	=> $this->email,
			":country"	=> $this->country,
			":ddd"		=> $this->ddd,
			":telephone"=> $this->telephone,
			":password"	=> $this->password
		);

		#consulta insert no MySqli (PDO)
		$insert = $this->connection->query ( $sql, $data );
		$this->id = $this->connection->instance ( )->lastInsertId ( );
		return  ( $insert->rowCount ( ) > 0 ) ? TRUE : FALSE;
	}

	public function token (  )
	{
		
	}
}
