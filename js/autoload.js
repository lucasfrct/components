( function ( ) {
    'use stric';

    gss = $.extend ( gss, 
        {
            script: __createScript,
            require: __require,
            autoload: __Autoload,
        } 
    );

    function __createScript ( $src ) {
        var $script = document.createElement ( 'script' );
        $script.src = $src; 
        document.body.appendChild ( $script );
    };

    function __require ( $url ) {
        if ( $url ) { 
            setTimeout ( function ( ) {
                __createScript ( $url ); 
            }, 10 );
        };
    };

    function __Autoload ( $array ) {    
        if ( $.isArray ( $array ) ) {
            $array.forEach ( function ( $item ) {
                if ( $item ) { 
                    __require ( $item ); 
                };
            });
        };
    };
} ) ( );