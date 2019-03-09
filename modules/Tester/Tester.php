<?php
#Tester.php 
namespace Tester;

# Dependência: arquivo de configuração de Tester
include_once ( "config/tester.config.php" );

class Tester 
{
    # Técnica de singleton - carrega a insta^ncia da classe na variável $instance
    private static $instance = NULL;

    private $name = ""; # Nome do teste
    private $fn = NULL; # Closure - função de teste
    private $repeat = 1; # Número de vezes que o teste é rodado

    private $time = NULL; # Pilha com os tempos de teste
    private $bool = FALSE; # teste bolleano executado no método ::ok ( )
    private $msg = ""; # messagem que descreve o teste
    
    # Cores para sucesso e erros
    private static $success = 'rgba( 0, 121, 107, 1 )';
    private static $error = 'rgba( 183, 28, 28, 1 )';

    # Método para limpar as variáveis e iniciar um novo teste
    private function clear ( ): void
    {   
        $this->time = array ( "init"=> 0, "end"=> 0, "functions"=>0 );
    }

    # Método para executar os blocos de teste
    private function exeBlock ( ): void
    {
        # Laço que executa o teste repetidas vezes
        for ( $i = 0; $i < $this->repeat; $i++ ) {
            # Captura o tempo atual
            $time = microtime ( TRUE );
            # Executa a função de Closure e passa a classe para o contexto do teste;
            if ( NULL != $this->fn ) {
                call_user_func ( $this->fn, $this );
            };
            # Calcula o tempo do teste e soma aos tempos anteriores
            $this->time [ 'functions' ] += ( microtime ( TRUE ) - $time );
        };

        # Calcula a média do tempo de cada função
        $this->time [ 'functions' ] = ( $this->time [ 'functions' ] / $this->repeat );
        # Calcula o tempo total de teste
        $this->time [ 'end' ] = ( microtime ( TRUE ) - $this->time [ 'init' ] );
    }

    # Método que testa interações de forma bolleana 
    public static function ok ( bool $bool = FALSE, string $msg = "" ): bool
    {   
        # Carrega as variáveis para a Classe
        self::$instance->msg = $msg;
        return self::$instance->bool = ( $bool ) ? TRUE : FALSE;
    }

    # Método que Imprime uma interface com os dados testados
    private function inner ( ) 
    {   
        $color = ( $this->bool ) ? self::$success : self::$error;
        $end = number_format ( ( $this->time [ "end" ] * 1000 ), 3, "<sup>ms </sup>", "<sup>s </sup>" )."<sup>us</sup>";
        $function = number_format ( ( $this->time [ "functions" ] * 1000 ), 3, "<sup>ms </sup>", "<sup>s </sup>" )."<sup>us</*sup>";
        # rgba( 1, 138, 129, 1 )
        echo '<section style="box-shadow: 0 0 2px 1px rgba( 0, 0, 0, 0.2 ), 1px 1px 1px 1px rgba( 0, 0, 0, 0.2 ); min-height: 40px; box-sizing: border-box; padding:8px 0; margin:6px 2px; border-radius: 2px; display: grid; grid-template-columns: 150px 1fr; align-items: center; background-image: linear-gradient(to right, '.$color.' 150px , #fff 0% ); text-align: center; font-family: Verdana;word-wrap: break-word;"
        >
            <div style="display: inline-block; margin:0; padding:4px 8px; color: #FFF;">
                <span style="font-size: 12px; display:block;">Tempo total:</span> <em style="font-size: 20px;">'.$end.'</em>
            </div>
            <div style="display: inline-block; margin:0; padding:4px 8px; text-align: left;color: #343434; font-size: 12px;word-wrap: break-word">
                <strong style="color: '.$color.'; display: block; font-size: 24px; padding: 2px 0 4px 0">'.$this->name.'</strong>
                <span style="display: inline-block;padding: 0 64px 0 0;">Tempo médio: <b>'.$function.'</b> </span>
                <span style="display: inline-block;">Número de testes: <b>'.$this->repeat.'</b></span>
                <p style="border-top: solid 1px #EEE; padding-top: 8px;word-wrap: break-word; width:100%;word-break: break-all;"><b style="font-size:14px;color: '.$color.';">Descrição:</b><br>'.$this->msg.'</p>
            </div>
        </section>';
    }

    # Método que instancia a classe 
    public static function on ( string $name = "", \Closure $fn = NULL, int $repeat = 1 ): void 
    {
        # Inicia uma nova instância
        if ( NULL == self::$instance ) {
            self::$instance = new self;
        };

        if ( self::$instance ) {
            # carrega as vaiáveis para o teste
            self::$instance->name = $name;
            self::$instance->fn = ( NULL != $fn ) ? \Closure::fromCallable ( $fn ) : NULL;
            self::$instance->repeat = $repeat;

            # Limpa os valores de tempo da classe
            self::$instance->clear ( );
            #inicia uma nova contagem de tempo
            self::$instance->time [ 'init' ] = microtime ( TRUE );
            #executa os block de teste
            self::$instance->exeBlock ( );
        };
        # imprime o teste;
        self::$instance->inner ( );
    }
}

#Tester::on ( "test 1", function ( $assert ) { $assert::ok ( true, "msg" ); }, 1000 );