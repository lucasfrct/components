<?php 
# Configura tipo de codificação UTF-8 e o texto para se comportar como HTML
header ( 'Content-Type: text/html; charset=utf-8' );
# Tempo máximo em execução de 1 minuto
set_time_limit ( 60 ); 
# Exibir todos os erros do php
error_reporting ( E_ALL );
# Exibir todos os erros do php
ini_set ( 'error_reporting', E_ALL );
# Exibir todos os erros do php
ini_set ( 'display_startup_errors', TRUE );
# Exibir todos os erros do php
ini_set ( "display_errors", TRUE );	