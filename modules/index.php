<?php
# index.php
include_once ( "autoload.php" );

use Tester\Tester 	as Test;
use Session\Session as Session;
use Connect\Connect as Connect;
use Crypt\Crypt 	as Crypt;
use Log\Log 		as Log;
use Login\Login 	as Login;
use Sigin\Sigin 	as Sigin;
use Recover\Recover as Recover;

Test::on ( "Session::on ( minutes )", function ( $assert ) {
	$session = Session::on ( 1 );
	$assert::ok ( ( session_status ( ) == PHP_SESSION_ACTIVE ), "Testa a inicialização de uma nova sessão e configura o tempo em minutos da expiração" );
}, 1 );

Test::on ( "Session->id ( )", function ( $assert ) {
	$session = Session::on ( 1 );
	$assert::ok ( ( strlen ( $session->id ( ) ) > 1 ), "Testa a inicialização de uma nova sessão e configura o tempo em minutos da expiração" );
}, 1 );


Test::on ( "Session>status ( )", function ( $assert ) {
	$session = Session::on ( 1 );
	$assert::ok ( $session->status ( ), "Testa se existe uma id válida vinculada a sessão" );
}, 1 );

Test::on ( "Session>user ( array )", function ( $assert ) {
	$session = Session::on ( 1 );
	$session->user ( array( "id"=>"001", "user"=>"tester" ) );
	$assert::ok ( ( count ( $_SESSION [ "user" ] ) == 2 ), "Testa e um usuário é carregado para a sessão com sucesso." );
}, 1 );

Test::on ( "Connect::on ( database )", function ( $assert ) {
	$conn = Connect::on ( "phpmyadmin" ); 
	$assert::ok ( ( gettype ( $conn ) == "object" ), "Testa o tempo para iniciar a classe Connect. " );
}, 1 );

Test::on ( "Connect->instance ( )", function ( $assert ) {
	$conn = Connect::on ( "phpmyadmin" );
	$assert::ok ( ( gettype( $conn->instance ( ) ) == "object" ), "Testa o acesso direto a instância da classe Connect." );
} );

Test::on ( "Connect->query ( SQL )", function ( $assert ) {
	$conn = Connect::on ( "mysql" );
	$result = $conn->query ( "SELECT Host, User FROM user WHERE 1" );
	$data = $result->fetchAll ( PDO::FETCH_ASSOC );
	$assert::ok ( TRUE, "Testa o tempo de um consulta simples ao banco de dados. <br>" );
}, 10 );

Test::on ( "Crypt->salt ( width  )", function ( $assert ) {
	$crypt = new Crypt;
	$salt = $crypt->salt ( 32 );
	$assert::ok ( ( strlen ( $salt ) == 32 ), "Testa a geração de um salt dinâmico. Encriptação SHA1" );
} );

Test::on ( "Crypt->hash ( string )", function ( $assert ) {
	$crypt = new Crypt;
	$hash = $crypt->hash ( "string" );
	$assert::ok ( ( strlen ( $hash ) == 32 ), "Testa a geração de uma hash dinâmica. Encriptação MD5" );
} );

Test::on ( "Crypt->encode ( string )", function ( $assert ) {
	$crypt = new Crypt;
	$hash = $crypt->encode ( "string" );
	$assert::ok ( ( $hash == "c3RyaW5n" ), "Testa a geração de uma hash dinâmica. Encriptação Base64" );
} );

Test::on ( "Crypt->decode ( string )", function ( $assert ) {
	$crypt = new Crypt;
	$hash = $crypt->encode ( "string" );
	$string = $crypt->decode ( $hash );
	$assert::ok ( ( $string == "string" ), "Testa a decodificação da encriptação base64." );
} );

Test::on ( "Log ( Connect )", function ( $assert ) {
	$conn = Connect::on ( "modules" );
	$log = new Log ( $conn ); 
	$assert::ok ( ( gettype ( $log ) == "object" ), "Testa o tempo para iniciar a classe Log. " );
}, 1 );

Test::on ( "Log->register ( comment )", function ( $assert ) {
	$conn = Connect::on ( "modules" );
	$log = new Log ( $conn ); 
	$assert::ok ( $log->register ( "teste Unitário" ), "Testa a inserção de um registro Log no banco de dados." );
}, 1 );

Test::on ( "Log->register ( comment )", function ( $assert ) {
	$conn = Connect::on ( "modules" );
	$log = new Log ( $conn ); 
	$assert::ok ( $log->register ( "teste Unitário" ), "Testa a inserção de um registro Log no banco de dados." );
}, 1 );

Test::on ( "Login ( Connect::on ( database ), Session ( minutes ), Log ( Connect::on ( database ) ) )", function ( $assert ) {
	$login = new Login ( Connect::on ( "modules" ), Session::on ( 1 ), new Log ( Connect::on ( "modules" ) ) );
	$assert::ok ( ( gettype ( $login ) == "object" ), "Testa o tempo para iniciar a classe Login e carregar todas as dependências." );
} );

Test::on ( "Login->access ( email, password )", function ( $assert ) {
	$login = new Login ( Connect::on ( "modules" ), Session::on ( 1 ), new Log ( Connect::on ( "modules" ) ) );
	$access = $login->access ( "root@root.com", "root1234" );
	$assert::ok ( $access, "Testa o acesso do usuário por meio de login." );
} );

Test::on ( "Login->check ( )", function ( $assert ) {
	$login = new Login ( Connect::on ( "modules" ), Session::on ( 1 ), new Log ( Connect::on ( "modules" ) ) );
	$check = $login->check ( );
	$assert::ok ( $check, "Testa se existe uma sessão válida para o usuário." );
} );

Test::on ( "Login->deny ( )", function ( $assert ) {
	$login = new Login ( Connect::on ( "modules" ), Session::on ( 1 ), new Log ( Connect::on ( "modules" ) ) );
	$deny = $login->deny ( );
	$assert::ok ( !$deny, "Testa a negação de acesso à sessão de usuário." );
} );

Test::on ( "Sigin ( Connect::on ( database ), Log ( Connect::on ( database ) ) )", function ( $assert ) {
	$sigin = new Sigin ( Connect::on ( "modules" ), new Log ( Connect::on ( "modules" ) ) );
	$assert::ok ( ( gettype ( $sigin ) == "object" ), "Testa o tempo para iniciar a classe Sigin e carregar todas as dependências." );
} );

Test::on ( "Sigin->data ( user, email, country, ddd, telephone, password )", function ( $assert ) {
	$sigin = new Sigin ( Connect::on ( "modules" ), new Log ( Connect::on ( "modules" ) ) );
	$sigin->data ( "tester", "tester@tester.com", "+11", "11", "1111111111", "tester1234" );
	$assert::ok ( ( gettype ( $sigin ) == "object" ), "Testa o tempo para carregar os dados para dentro da classe Sigin." );
} );

Test::on ( "Sigin->save ( )", function ( $assert ) {
	$sigin = new Sigin ( Connect::on ( "modules" ), new Log ( Connect::on ( "modules" ) ) );
	$sigin->data ( "tester", "tester@tester.com", "+11", "11", "1111111111", "tester1234" );
	$assert::ok ( $sigin->save ( ), "Testa o método que salva no banco de dados." );
} );

Test::on ( "Recover ( Connect::on ( database ), Log ( Connect::on ( database ) ), Crypt )", function ( $assert ) {
	$recover = new Recover ( Connect::on ( "modules" ), new Log ( Connect::on ( "modules" ), new Crypt ) );

	$assert::ok ( ( gettype( $recover ) == "object" ), "Testa o tempo para inicar a classe Recove r e carregar as dependências" );
} );


#echo "<br><br>";
#var_dump ( $GLOBALS [ "CLASSES" ] );