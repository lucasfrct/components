( function ( ) { 
    "use strict";

function __media ( $source = '' ) {

    var $metaData = {
        src: String ( $source );
        id: __idReduce ( $source ),
        title: __title ( $source ),
        volume: 0,
        duration: 0,
        current: 0,
        played: null,
        repeat: 0,
        currentRepeat: 0,
    };
    
    var $time = {
        duration: 0,
        current: 0,
        init: 0, 
        end: 0,
        spent: 0, //tempo percorrido
        left: 0, //tempo restante
    };

    var $audio = __create ( );
    $audio.onloadstart = __onLoadStart;
    $audio.onprogress = __onProgress;
    $audio.onseeking = __onSeeking;
    $audio.onplay = __onPlay;
    $audio.onpause = __onPause;
    $audio.onvolumechange = __onVolumeChange;
    $audio.ondurationchange = __onDurationChange;
    $audio.ontimeupdate = __onTimeUpdate;
    $audio.onsuspend = __onSuspend;

    var $controls = { 
        play: __play,
        pause: __pause,
        stop: __stop,
        init: __init,
        end: __end,
        repeat: __repeat,
        volume: __volume,
        exe: __exe,
    };

    return $controls;

    function __idReduce ( $string  = '' ) {
        var $reduce = String ( $string ).split ( ' ' ).join ( '' ).split ( '.mp3' )[ 0 ].split ( '/' ).join ( '' );
        return String ( "media-" + String ( $reduce ) + "md" );
    };

    function __title ( $string = '' ) {
        return String ( String ( $string ).slice ( 0, -4 ) );
    };

    function __onLoadStart ( ) { }

    function __onProgress ( ) { };

    function __onSeeking ( ) { };

    function __onPlay ( ) {
        $metaData.played = true;
        $metaData.volume = Number ( $audio.volume );
    };

    function __onPause ( ) {
        $metaData.played = false;
        $metaData.volume = Number ( $audio.volume );
    };

    function __onVolumeChange ( ) { 
        $metaData.volume = Number ( $audio.volume );
    };

    function __onDurationChange ( ) {
        $metaData.volume = Number ( $audio.volume );
        $metaData.duration = Number ( $audio.duration ); 
        $time.duration = __durationCalc ( $metaData.duration, $time.init, $time.end );
        $time.end = ( $time.end > 0 ) ? $time.end : $time.duration;
        
        if ( $metaData.repeat > 0 ) {
            $metaData.currentRepeat = 1;
        };
    };

    function __onTimeUpdate ( ) {
        
        $metaData.current = $audio.currentTime;
        $time.current = $metaData.current;
        $time.spent = __spent ( $time.current, $time.init );
        $time.left = __left ( $time.current, $time.end );

        if ( __checkStop ( $time.current, $time.end ) ) {
            if ( __endRepeat ( $metaData.repeat, $metaData.currentRepeat ) ) {
                __stop ( );
            } else {
                $metaData.currentRepeat = ( Number ( $metaData.currentRepeat ) + 1 );
            };
        };

        $controls.exe ( $metaData, $controls, $time, $audio );
    };

    function __onSuspend ( ) {
        __clear ( );
    };

    function __play ( $init = 0, $end = 0 ) {
        
        if ( $init > 0 ) {  
            __init ( $init );
        };

        if ( $end > 0 ) {  
            __end ( $end );
        };

        $audio.load ( );
        $audio.play ( );
        return $controls;
    };
    
    function __pause (  $end = 0 ) {

        if ( $end > 0 ) {
            __end ( $end );
        };

        $audio.load ( );
        $audio.pause ( );
        return $controls;
    };
    
    function __stop ( $end = 0 ) {
        
        if ( $end > 0 ) {
            __end ( $end );
        };

        $audio.load ( );
        $audio.pause ( );
        return $controls;
    };
    
    function __time ( $setTime = null; ) {
        if ( $setTime ) {
            $audio.currentTime = $setTime;
        };     
        return $time.current;
    };

    function __init ( $init = 0 ) {
        $time.init = $init;
        $audio.currentTime = $time.init;
        return $controls;
    };

    function __end ( $end = 0 ) {
        $time.end = $end;
        return $controls;
    };

    function __repeat ( $number = 0 ) {
        $metaData.repeat = Number ( $number );
        return $controls;
    };
    
    function __volume ( $percent = 0 ) {
        $audio.volume = ( Number ( $percent ) / 100 );
        return $controls;
    };

    function __exe ( $fn ) {
        return $fn;
    };

    function __durationCalc ( $duration = 0, $init = 0, $end = 0 ) {
        $duration = ( $end > 0 ) ? Number ( $end ) : Number ( $duration ); 
        return Number ( Number ( $duration ) - Number ( $init ) );
    };

    function __checkStop ( $current = 0, $end = 0 ) {
        return ( $current > 0 && $current >= $end ) ? true : false;
    };

    function __endRepeat ( $repeat = 0, $currentRepeat = 0 ) {
        return ( $currentRepeat >= $repeat ) ? true : false;
    };
    
    function __clear ( ) {
        var $el = document.getElementById ( $metaData.id );
        $el.remove ( );
    };

    // tempo percorrido
    function __spent ( $current = 0 , $init = 0 ) {
        return ( Number ( $current ) - Number ( $init ) );
    };

    // tempo restante 
    function  __left ( $init, $end ) {
        return ( Number ( $end ) - Number ( $init ) );
    };

    function __create ( ) {
        var $au = null;
        var $objAu = document.createElement ( 'audio' );
        $objAu.id = String ( $metaData.id );
        $objAu.src = String ( $metaData.src );
        $objAu.style = "display: none";
        document.body.appendChild ( $objAu );
        $au = document.getElementById ( $id );
        $au.preload = "metadata";
        $au.load ( );
        return $au;
    };
};

//  media('quero te louvar.mp3').init(37).end(47).volume(10.5).repeat(10).play();


function __multimedia ( $array ) {
    
    var $controls = {
    };


    function __labelTitle ( $title = "" ) {
    };

    function __labelTime ( $time = 0 ) {
    };

    function __labelDuration ( $duration = 0 ) {
    };

    function __labelVolume ( $volume = 0 ) {
    };

    function __next ( $index ) {
    };

    function __load ( $source = null ) {
    };

    function __ play ( ) {
    };

    return $that;
};

var $musics = [
    'Águas Profundas.mp3',
    'Não Tenho Medo.mp3',
    'Quero te Louvar.mp3',
    'Vou te alegrar.mp3',
];

var $m = __multimedia ( $musics );
$m.play ( );
function __effectFadeIn ( $fadeTime, $currentTime, $init, $controlVolume ) {
    
    var $factor = ( 100 / Number ( $fadeTime ) );

    if ( Math.floor ( $currentTime ) <= $init ) {
        $controlVolume ( 0 );
    };

    if ( Math.floor ( $currentTime ) > $init ) {
        $controlVolume ( $factor );
    };
};

function __parseToHours ( $seconds = 0 ) {
    var $time = [];
    var $format = [];
    
    var pad = function($number){ return ($number < 10) ? "0"+$number : $number; };
    
    $time.push(Math.floor($seconds / (3600 * 24)));  // days
    $time.push(Math.floor($seconds % (3600 * 24) / 3600)); // hours
    $time.push(Math.floor(($seconds % 3600) / 60)); // minutes
    $time.push(Math.floor($seconds % 60)); // seconds
    
    $format = $time
        .filter(function($item, $index){ return ($index > 1 || $item > 0); })
        .map(function($item, $index){ return pad($item); })
        .join(':');
    
    return $format;
};
    
function __parseToSeconds ( $time = 0 ) {
    $seconds = 0;
    
    if(isNaN($time)){
        $timeArray = $time.split(':').reverse();
        $sec = ($timeArray[0]) ? $timeArray[0] : 0;
        $minutes = ($timeArray[1]) ? $timeArray[1] : 0;
        $hours = ($timeArray[2]) ? $timeArray[2] : 0;
        $day = ($timeArray[3]) ? $timeArray[3] : 0;
        $seconds = Math.floor(Number($day * 24 * 3600) + Number($hours * 3600) + Number($minutes * 60) + Number($sec));
    } else{
        $seconds = $time;
    };
    
    
    return $seconds;
};





} ) ( );
*/