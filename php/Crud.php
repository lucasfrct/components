<?php
#Crud.php

class Crud 
{
	private $connection = null; #instância do objeto de connexão

	# injeção da dependência do Objecto Connect
	public function __construct ( Connect $connect ) 
	{
		$this->connection = $connect;
	}

	# obtém a string de fields e modela para uma array de fields
	private function getFields ( string $fields = ""  ): array
	{
		$fields = explode ( ",", $fields );
		$fields = array_map ( function ( $item  ) {
			return trim ( $item );
		}, $fields );
		return $fields;
	}

	# obtém a string de fields e modela para uma array de params
	private function getParams ( string $fields = ""  ): array
	{
		$params = explode ( ",", $fields );
		$params = array_map ( function ( $item  ) {
			return  ":".trim ( $item );
		}, $params );
		return $params;
	}

	# obtém uma array de params e uma string de values e modela para uma array de data
	private function getData ( array $params = Array ( ), string $values = "" ): array
	{
		preg_match_all ( '/\'([^\']*)\'/', $values, $result );
		$values  = $result [ 1 ];

		$data = Array ( );
		foreach ( $params as $key => $field ) {
			$data = array_merge ( $data, array ( $field => $values [ $key ] ) );
		};
		return $data;
	}

	# obtém as arays de params e fields e modela para uma cosulta Update 
	private function getConsult ( array $params = Array ( ), array $fields = Array ( ) ): string
	{
		$consult = "";
		foreach ( $fields as $key => $field ) {
			$consult .= ", ".$field." = ".$params [ $key ];
		};
		return substr ( $consult, 2 );
	}

	# Cria um novo conteúdo no banco de dados
	public function create ( string $table = "", string $fields = "*", string $values = "" ): bool
	{
		$params = $this->getParams ( $fields );
		$paramsStr = implode ( ", ", $params );
		$data = $this->getData ( $params, $values );

		$sql = "INSERT INTO {$table} ({$fields}) VALUES({$paramsStr})";
		$insert = $this->connection->query ( $sql, $data );
		return  ( $insert->rowCount ( ) > 0 ) ? TRUE : FALSE;
	}

	# faz a leitura de conteúdo no banco de dados
	public function read ( string  $table = "", string $fields = "", string $condition = "" ): array
	{
		$condition = ( !empty ( $condition ) ) ? " WHERE {$condition}" : "";
		$sql = "SELECT {$fields} FROM {$table } {$condition}";
		return $this->connection->query ( $sql )->fetchAll( PDO::FETCH_ASSOC );
	}

	# atualiza conteúdo no banco de dados
	public function update ( string $table = "", string $fields = "" , string $values = "", string $condition = "" ): bool
	{	
		$params = $this->getParams ( $fields );
		$fields = $this->getFields ( $fields );
		$consult = $this->getConsult ( $params, $fields );
		$data = $this->getData ( $params, $values );

		$sql = "UPDATE {$table} SET {$consult} WHERE {$condition}";
		$update = $this->connection->query ( $sql, $data );
		return  ( $update->rowCount ( ) > 0 ) ? TRUE : FALSE;
	}

	# deleta conteúdo no banco de dados
	public function delete ( string $table = "", string $condition = "" ): bool
	{
		$sql = "DELETE FROM {$table} WHERE {$condition}";
		$delete = $this->connection->query ( $sql );
		return  ( $delete->rowCount ( ) > 0 ) ? TRUE : FALSE;
	}
};

$crud = new Crud ( Connect::on ( ) );
#echo $crud->create ( "registers", "user, email", "'userinsert', 'emailinsert , teste: email.'" );
#$data = $crud->read ( "registers", "id, user, email, country", "user='root' AND password='root1234'" );
#echo json_encode ( $data );
#echo $crud->update ( "registers", "user, email", "'userupdate', 'emailupdate'", "id='43'" );
#echo $crud->delete ( "registers", "id>=6" );