<?php
# Cript.php
namespace Crypt;

# 
include_once ( "config/crypt.config.php" );

class Crypt 
{
	private $key = "";
	private $salt = "";
	private $hash = "";

	public function __construct ( )
	{
		$this->key = $this->encode ( $GLOBALS [ "CRYPT" ] [ "KEY" ] );
	}

	private function salt ( $width = 16 ): string
	{
		return $this->salt = substr ( sha1 ( mt_rand ( ).$this->key ), 0, $width );
	}

	private function hash ( string $string = "" )
	{
		$this->hash = md5 ( $this->salt.$string );

		for ( $i = 0; $i < 1000; $i++ ) {
			$this->hash = md5 ( $this->hash );
		};
	}

	public function encode ( string $string = "" )
	{
		return base64_encode ( $string );
	}

	public function decode ( string $string = "" )
	{
		return base64_decode ( $string );
	} 
}

