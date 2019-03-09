<?php
# Crypt.php
namespace Crypt;

# Dependência: arquivo de configuração de Crypt
include_once ( "config/crypt.config.php" );

class Crypt 
{
	private $key = ""; # Chave única do arquivo
	private $hash = ""; # Encriptação MD5

	# Método que inicia as dependências e configuração da classe Crypt 
	public function __construct ( )
	{
		# Chave única do arquivo em base64
		$this->key = $this->encode ( $GLOBALS [ "CRYPT" ] [ "KEY" ] );
	}

	# Método que gera um string hash  dinâmicamente em SHA1 com largura determinada
	public function salt ( $width = 16 ): string
	{
		return substr ( sha1 ( mt_rand ( ).$this->key ), 0, $width );
	}

	# Método que gera uma string hash em MD5 apartir de uma string
	public function hash ( string $string = "" )
	{
		$hash = md5 ( $this->salt ( ).$string );
 
		for ( $i = 0; $i < 1000; $i++ ) {
			$hash = md5 ( $hash );
		};

		return $hash;
	}

	# Método que trasforma uma string em hash Base64
	public function encode ( string $string = "" )
	{
		return base64_encode ( $string );
	}

	# Método que transforma uma hash Base64 em uma string
	public function decode ( string $string = "" )
	{
		return base64_decode ( $string );
	} 
};

# $crypt = new Crypt;
# $crypt->salt ( 32 );
# $crypt->hash ( string );
# $crypt->encode ( string );
# $crypt->decode ( string );