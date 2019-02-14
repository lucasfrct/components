<?php

error_reporting(E_ALL ^ E_NOTICE);
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
ini_set('display_startup_errors', TRUE);
ini_set("display_errors", TRUE);
ini_set("default_charset", TRUE);

#mailer.php // Dispatcher/despachador
class Mailer{

	private static $instance = null;

	protected $server   = 'smtp.googlemail.com';
	protected $user     = 'lucasfrct@gmail.com';
	protected $password = 'lucasfrct@2017';
	protected $port     = 587;

	protected $emitter = 'lucasfrct@gmail.com'; // emitente
	protected $name = "Lucas Costa"; // nome do emissor

	protected $receiver = null; // destinatário
	protected $topic    = null; // assunto
	protected $message  = null; // mensagem
	protected $annex    = null; // anexo

	public $state = false;
	public $error = "";

	private function __construct(){ }
	
	private function __clone(){ }
    
    private function __wakeup(){ }

    private static function callClass(){
		if(!self::$instance){ self::$instance = new Mailer; };
		
		return self::$instance;
	}

	public static function clean(){
		self::$instance = null;
		self::callClass();

		return self::$instance;
	}

	private function load($receiver , $topic, $message){
		$this->receiver = (!empty($receiver)) ? $receiver : $this->receiver;
		$this->topic    = (!empty($topic))    ? $topic    : $this->topic;
		$this->message  = (!empty($message))  ? $message  : $this->message;

		if(!empty($this->topic) && empty($this->message)){
			$this->message = $this->topic;
			$this->topic = "";
		};


		$this->error .= (empty($this->emitter))  ? "empty field emitter "  : "";
		$this->error .= (empty($this->receiver)) ? "empty field receiver " : "";
		$this->error .= (empty($this->message))  ? "empty field message "  : "";

		$this->state = (empty($this->error)) ? true : false;

		return self::$instance;
	}

	public static function config(string $server = null, string $user = null, string $password = null, $port = 587){
		self::callClass();
		self::$instance->server   = (!empty($server))   ? $server   : self::$instance->server;
		self::$instance->user     = (!empty($user))     ? $user     : self::$instance->user;
		self::$instance->password = (!empty($password)) ? $password : self::$instance->password;
		self::$instance->port     = (!empty($port))     ? $port     : self::$instance->port;

		return self::$instance;
	}

	public static function emitter(string $emitter = null, string $name = null){
		self::callClass();
		self::$instance->emitter = (!empty($emitter)) ? $emitter : self::$instance->emitter;
		self::$instance->name    = (!empty($name))    ? $name    : self::$instance->name;
		
		return self::$instance;
	}

	public static function receiver(string $receiver = null){
		self::callClass();
		self::$instance->receiver = (!empty($receiver)) ? $receiver : self::$instance->receiver;

		return self::$instance;
	}

	public static function message(string $topic = null, string $message = null){
		self::callClass();
		self::$instance->topic   = (!empty($topic))   ? $topic   : self::$instance->topic;
		self::$instance->message = (!empty($message)) ? $message : self::$instance->message;

		return self::$instance;
	}

	public static function annex(string $file = null){
		self::callClass();
		self::$instance->annex = (!empty($file)) ? $file : self::$instance->annex;

		return self::$instance;
	}

	public static function send(string $receiver = null, string $topic = null, string $message = null){
		self::callClass();
		self::$instance->load($receiver, $topic, $message);
		
		if(self::$instance->state){
			include_once('auxiliary.mailer.php');

			$state = auxiliaryMailer(
				self::$instance->server, 
				self::$instance->user, 
				self::$instance->password, 
				self::$instance->port, 
				self::$instance->emitter, 
				self::$instance->name, 
				self::$instance->topic,
				self::$instance->message,
				self::$instance->receiver,
				self::$instance->annex
			);

			if($state === true){
				self::$instance->state = true;
			} else{
				self::$instance->state = false;
				self::$instance->error .= $state;
			};

		};

		return self::$instance;
	}

	public function macro(){
		echo '<div style="border:solid 1px #000; padding:10px 25px;">';
		echo "<br> <b>server:</b> ".self::$instance->server;
		echo "<br> <b>user:</b> ".self::$instance->user;
		echo "<br> <b>password:</b> ".self::$instance->password;
		echo "<br> <b>port:</b> ".self::$instance->port;
		echo "<br>";
		echo "<br> <b>emitter:</b> ".self::$instance->emitter;
		echo "<br> <b>name:</b> ".self::$instance->name;
		echo "<br>";
		echo "<br> <b>receiver:</b> ".self::$instance->receiver;
		echo "<br> <b>topic:</b> ".self::$instance->topic;
		echo "<br> <b>message:</b> ".self::$instance->message;
		echo "<br> <b>annex:</b> ".self::$instance->annex;
		echo "<br><br><b>Error:</b>".self::$instance->error;
		echo '</div>';
	}
};

// Mailer::clean();
// Mailer::config($server, $user, $password, $port);
// Mailer::emtter($email, $name)::receiver($email)::message($topic, $msg)::annex($file)::send();
// Mailer::receiver($email)::message($topic, $msg)::annex($file)::send();
// Maler::send($receiver. $topic, $msg);
//$m = Mailer::annex('../Connect.php')::send('lucasfrct@outlook.com', "000", "msg teste");
//$m->macro();
//echo $m->error;
//echo $m->state;