<?php
function auxiliaryMailer(
	string $server = null, 
	string $user = null, 
	string $password = null, 
	$port = null,
	string $emitter = null,
	string $name = null,
	string $topic = null,
	string $message = null,
	string $receiver = null,
	string $annex = null
){
	require_once('lib/PHPMailer-5.2.22/PHPMailerAutoload.php');

	$mail = new PHPMailer;

	$mail->isSMTP();

	$mail->SMTPAuth = true;
	$mail->SMTPSecure = 'tls';// ssl - tls
	$mail->Host = $server;
	$mail->Username = $user;
	$mail->Password = $password;
	$mail->Port = $port; // 465 - 587

	//$mail->SetFrom('lucasfrct@gmail.com',"Lucas Costa"); // remetente
	$mail->From = $emitter;
	$mail->FromName = $name;

	$mail->isHTML(true);

	$mail->Subject = $topic;
	$mail->Body = $message;
	$mail->AddAddress($receiver);

	$mail->addAttachment($annex);
	//$mail->addAttachment($path, $name, $encoding, $type);
	//$mail->addStringAttachment(file_get_contents($url), 'myfile.pdf');

	return ($mail->send()) ? true : $mail->ErrorInfo;
};
//echo auxMailer('smtp.googlemail.com', 'lucasfrct@gmail.com', 'lucasfrct@2017', '587', 'lucasfrct@gmail.com', "lucas", "assunto", "msg", "lucasfrct@outlook.com");