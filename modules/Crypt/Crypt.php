<?php
# Cript.php
namespace Crypt;

# 
include_once ( "config/crypt.config.php" );

class Crypt 
{
	private $key = "";
	private $hash = "";

	public function __construct ( )
	{
		$this->key = $this->encode ( $GLOBALS [ "CRYPT" ] [ "KEY" ] );
	}

	public function salt ( $width = 16 ): string
	{
		return substr ( sha1 ( mt_rand ( ).$this->key ), 0, $width );
	}

	public function hash ( string $string = "" )
	{
		$hash = md5 ( $this->salt ( ) );
 
		for ( $i = 0; $i < 1000; $i++ ) {
			$hash = md5 ( $hash );
		};

		return $hash;
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

