<?php
# Sigin.php
namespace Sigin;

use PDO;

# Dependência: arquivo de configuração de Sigin
include_once ( "config/sigin.config.php" );

class Sigin
{
	private $connect = NULL;  # Classe de conecxaõ ao banco de dados 
	private $log = NULL; # Classe que insere log no banco de dados
	private $table = ""; # Tabela no banco de dados que armazenará o registro do usuário
	private $direct = FALSE; # Armazena o comando para acesso direto os save
	# Campos com conteúdo para inserir no banco de dados
	private $user = "";
	private $email = "";
	private $country = "";
	private $ddd = "";
	private $telephone = "";
	private $password = "";

	private $id;

	# Método que inicia as dependências e configuração da classe Sigin 
	public function __construct ( object $connection = NULL, object $log = NULL )
	{
		$this->connection 	= $connection;
		$this->log 			= $log;
		$this->table 		= $GLOBALS [ "SIGIN" ] [ "TABLE" ];
	}

	# Método que captura uma postagem com o conteúdo do usuário 
	private function getPost ( ): bool 
	{

		# Verifica se houve um a postagem e se contém alguma senha nela
		$status = ( $_SERVER [ "REQUEST_METHOD" ] == "POST" && !empty ( $_SERVER [ "HTTP_AUTHENTICATION" ] ) ) ? TRUE : FALSE;

		# Havendo uma postagem, carrega as variáveis para a classe
		if ( $status == TRUE ) { 
			$this->user = $_POST [ "user" ] ?? "";
			$this->email = $_POST [ "email" ]  ?? "";
			$this->country = $_POST [ "country" ]  ?? "";
			$this->ddd = $_POST [ "ddd" ]  ?? "";
			$this->telephone = $_POST [ "telephone" ]  ?? "";
			$this->password = $_SERVER [ "HTTP_AUTHENTICATION" ]  ?? "";
		};
		return $status;
	}

	# Método que insere o cadastro do usuário no banco de dados
	private function insert ( ): bool
	{
		# consulta SQL para inserir conteúdo no banco de dados
		$sql = "INSERT INTO ".$this->table." ( `user`, `email`, `country`, `ddd`, `telephone`, `password`, `date` )"; 
		$sql .= "VALUES ( :user, :email, :country, :ddd, :telephone, :password, SYSDATE() )";

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

	public function data ( 
		string $user = "", 
		string $email = "", 
		string $country = "", 
		string $ddd = "", 
		string $telephone = "", 
		string $password = "" 
	): void
	{
		# Carrega dados dos para inserção no banco de dados
		$this->user = $user;
		$this->email = $email;
		$this->country = $country;
		$this->ddd = $ddd;
		$this->telephone = $telephone;
		$this->password = $password;
		$this->direct = TRUE;
	}

	# Método que verifica a postagem do cadastro e insere os dados
	public function save ( ) : bool
	{
		$status = FALSE;
		# Verifica se houve um apostagem
		if ( $this->getPost ( ) || $this->direct ) { 
			# Insere os conteúdo postado no banco de dados
			$status = $this->insert ( ); 
			# Verifica se houve uma inserção no banco de dados 
			if ( $status == TRUE && $this->id  ) {
				# Prepara um commit para o log
				$commit = $this->id." - Cadastro de novo usuário: "; 
				$commit .= "registro: ".$this->id." >> tabela: ".$this->table;
				# Inserre um registro no log do banco de dados
				$this->log->register ( $commit );
			};
		};
		# retorna o estado da consulta ao banco de dados
		return $status;
	}
}

# $sigin = new Sigin ( Connect::on ( "modules" ), new Log ( Connect::on ( "modules" ) ) );
# $sigin->data ( user, email, country, ddd, telephone, password );
# $sigin->save ( );