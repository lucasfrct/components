<?php

//$name
//$tel
//$email
//$message
include_once('mailer.php');

function model($post){
	$msg = "
		<b>Nome:</b> {$post['name']}
		<br>
		<b>Telefone: </b> {$post['tel']}
		<br>
		<b>E-mail:</b> {$post['email']}
		<br><br>
		<b>Mensagem:</b>{$post['message']}
	";

	return $msg;
};

if($_SERVER['REQUEST_METHOD'] == 'POST'){
	$m = Mailer::send('lucasfrct@gmail.com', "GSS", model($_POST));
	$result = ($m->state) ? "Send!" : $m->error;
	echo $result;
};