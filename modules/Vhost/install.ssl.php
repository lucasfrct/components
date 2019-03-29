<?php 

# Instalando SSL no Xampp
# HABILITAR O OPEN SSL NO PHP
# criar um cópia do php.ini e renomear para _php.ini
# Abrir php.ini 
# xampp/php/php.ini
# find ";extension=php_openssl.dll"  e retirar o ";" que faz comentário >> "extension=php_openssl.dll"
# 
# HABILITAR TIMEZONE NO PHP
# "America/Bahia"
# "America/Campo_Grande"
# "America/Porto_Velho"
# "America/Rio_Branco"
# "America/Sao_Paulo"
# "America/Cuiaba"
# "America/Fortaleza"
# "America/Noronha"
# "America/Recife"
# ""
# Abrir php.ini 
# xampp/php/php.ini
# find "; http://php.net/date.timezone\n\r;date.timezone =" e retirar o ";" que faz o comentário >> "date.timezone ="
# add >> "date.timezone=America/Sao_Paulo" 
# find "[Date]\n\rdate.timezone=Europe/Berlin" e replace "[Date]\n\rdate.timezone=America/Sao_Paulo"
#
# ALTERAR LIMITE DE MEMÓRIA
# Abrir php.ini 
# xampp/php/php.ini
# find "memory_limit=128M" e replace "memory_limit=512M" 
#
# HABILITAR REWRITE (SOBREESCRIÇÃO)
# criar um cópia do httpd.conf e renomear para _httpd.conf
# Abrir httpd.conf
# xampp/apache/conf/httpd.conf
#  find "#LoadModule rewrite_module modules/mod_rewrite.so" replace "LoadModule rewrite_module modules/mod_rewrite.so"
# find "User daemon" replace "User Tec" (usuário do PC)
# 
# CRIAR CETIFICADO SSL
# abrir cmd
# navegar até a pasta que aramazenará o certificado
# comando >> "cert -a sha512"
# digitar uma senha



$timezones = array (
	'AC' => 'America/Rio_branco', 
	'AL' => 'America/Maceio',
	'AP' => 'America/Belem', 
	'AM' => 'America/Manaus',
	'BA' => 'America/Bahia',
	'CE' => 'America/Fortaleza',
	'DF' => 'America/Sao_Paulo',
	'ES' => 'America/Sao_Paulo',
	'GO' => 'America/Sao_Paulo', 
	'MA' => 'America/Fortaleza',
	'MT' => 'America/Cuiaba', 
	'MS' => 'America/Campo_Grande',
	'MG' => 'America/Sao_Paulo', 
	'PR' => 'America/Sao_Paulo',
	'PB' => 'America/Fortaleza', 
	'PA' => 'America/Belem',
	'PE' => 'America/Recife', 
	'PI' => 'America/Fortaleza',
	'RJ' => 'America/Sao_Paulo', 
	'RN' => 'America/Fortaleza',
	'RS' => 'America/Sao_Paulo', 
	'RO' => 'America/Porto_Velho',
	'RR' => 'America/Boa_Vista', 
	'SC' => 'America/Sao_Paulo',
	'SE' => 'America/Maceio', 
	'SP' => 'America/Sao_Paulo',
	'TO' => 'America/Araguaia'     
);