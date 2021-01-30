<?php 
#SSL.php
namespace SSL;

$GLOBALS [ "SSL" ] = Array ( );

class SSL
{
	private $path = ""; # path do arquivo .pem
	private $cert = null;
	private $key = null;
	private $crt = ""; # path co arquivo .crt
	private $privatekey = ""; # path do arquivo .pem
	private $password = "1234567890";
	private $privkey = "";


	public function __construct ( ) 
	{
		$that = $this;
		#$this->path = ( file_exists ( $path ) ) ? $path : "";
	}

	public function export ( )
	{
		echo "method export";
	}

	# ler arquivo .pem
	public function read ( )
	{
		#$this->cert = openssl_x509_read ( $this->path );
	}

	public function key ( )
	{
		#$crt = file_get_contents ( $this->crt );
		#$pkey = openssl_pkey_get_public ( $crt );
		#$key = openssl_pkey_get_details ( $pkey );
		#$this->key = $key [ "key" ];
	}

	public function privatekey ( )
	{
		#$privatekey = file_get_contents ( $this->privatekey );
		#$this->privkey = openssl_get_privatekey ( $privatekey, $this->password );
	}




}

# $ssl = new SSL ( "patch" )
# $ssl->read ( );
# $ssl->key ( );
#
#
# $ssl->csr->export ( );

$ssl = new SSL;