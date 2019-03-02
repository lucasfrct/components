<?php

include_once ( "autoload.php" );

use Connect\Connect as Connect;
use Session\Session as Session;
use Log\Log 		as Log;
use Crypt\Crypt 	as Crypt;
use Login\Login 	as Login;
use Sigin\Sigin 	as Sigin;
use Recover\Recover as Recover;

$conn = Connect::on ( "modules" );
$log = new Log ( $conn );
$crypt = new Crypt;
$session = Session::on ( "1" );

#$login = new Login ( $conn, $session, $log );
#$login->access ( );
#$login->check ( "http://home/" );
#$login->deny ( "http://home/" );

#$sigin = new Sigin ( $conn, $log );
#$sigin->save ( );

$recover = new Recover ( $conn, $log, $crypt );
echo $recover->get ( );


#var_dump ( "" );