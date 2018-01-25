<?php
#makeDB
include_once("Connect.php");

$connect = new Connect;
$connect->createDB();

$table = "students";
$connect->eraseTb($table);
$f = "id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,";
$f .= "enable BOOL DEFAULT 1 NOT NULL,";
$f .= "status BOOL DEFAULT 1 NOT NULL,";
$f .= "created DATETIME NOT NULL,";
$f .= "ra VARCHAR(255) NOT NULL,";
$f .= "name VARCHAR(255),";
$f .= "cpf VARCHAR(255),";
$f .= "rg VARCHAR(255),";
$f .= "email VARCHAR(255),";
$f .= "facebook VARCHAR(255),";
$f .= "cel VARCHAR(255),";
$f .= "tel VARCHAR(255),";
$f .= "education VARCHAR(255),";
$f .= "ocupation VARCHAR(255),";
$f .= "gender VARCHAR(255),";
$f .= "marital VARCHAR(255),";
$f .= "paternal VARCHAR(255),";
$f .= "maternal VARCHAR(255),";
$f .= "birthDate VARCHAR(255),";
$f .= "nationality VARCHAR(255),";
$f .= "street VARCHAR(255),";
$f .= "number VARCHAR(255),";
$f .= "district VARCHAR(255),";
$f .= "city VARCHAR(255),";
$f .= "state VARCHAR(255),";
$f .= "zipcode VARCHAR(255),";
$f .= "complement VARCHAR(255)";
echo 'create Tb = students ('.$connect->createTb($table,$f).')<br>';



$table = "views";
$connect->eraseTb($table);
$f = "students VARCHAR(255) NOT NULL";
$obj= "Id:,Ativo:,Status:,Data de Criação:,RA:,Nome:,CPF:,R.G.:,E-mail:,Facebook:,Cel:,Tel:,Escolaridade:,Profissão:,Sexo/Gênero:,Est. Civil:,Filiação Paternal:,Filiaçao Maternal:,Nascimento:,Nacionalidade,Rua:,Nº:,Bairro:,Município:,U.F.:,CEP:,Complemento:";
echo 'create tb = views ('.$connect->createTb($table,$f).')<br>';
echo 'insert data ('.$connect->insert($table, "students", "'".$obj."'").')<br>';

