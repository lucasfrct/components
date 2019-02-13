//FRAMEWORK GSS (GO SIMPLE SOLUTIONS)
// function = __functionCamelCase 
// object = objectCamelCase
// variavel = $varCamelCase
// contanst $CONSTANT
var gss = { };
( function ( ) { 
	"use strict";
	
	gss = $.extend ( gss, {
		browser: __browser ( ),
		navigator: __browser ( ),
		cronStart: __cronometroStart,
		cronStap: __cronometroStap,
		cronStop: __cronometroStop,
		cronList: __cronometroList,
		cronClear: __cronometroClear,
		imprime: __imprime,
		imprima: __imprime,
		ipm: __imprime,
		p: __imprime,
		toText: __toText,
		toString: __toText,
		stamp: __stamp,
		template: __template,
		tpl: __template,
		sleep: __sleep,
		isJSON: __isJSON,
		clone: __clone,
		copy: __clone,
		count: __count,
		delay: __delay,
		loop: __loop,
		cycles: __loop,
		scroll: __scroll,
		autoScroll: __autoScroll,
		consult: __consult,
		request: __consult,
		cep: __cep,
		zipcode: __cep,
		include: __include,
	} );

	var $CRONOMETRO = [ ];
	var $NAVIGATOR = __browser ( );

	function __browser ( ) {

		function __isChrome ( ) {
			return ( !!window.chrome && !!window.chrome.webstore ) ? true : false;
		};

		function __isSafari ( ) {
			return (
				Object.prototype.toString.call ( window.HTMLElement ).indexOf ('Constructor') > 0
			) ? true : false;
		};

		function __isFirefox ( ) {
			return ( typeof InstallTrigger !== 'undefined' ) ? true : false;
		};

		function __isIE ( ) {
			return ( false || !!document.documentMode ) ? true : false;
		};

		function __isEdge ( ) { 
			return ( !__isIE && !!window.StyleMedia ) ? true : false;
		};


		function __isOpera ( ) {
			return (
				( !!window.opr && !!opr.addons ) || 
				( !!window.opera || navigator.userAgent.indexOf ( ' OPR/' ) >= 0 )
			) ? true : false;
		};
		
		function __isOther ( ) {
			return ( ( !__isChrome ( ) || !__isOpera ( ) ) && !window.CSS) ? true : false;
		};

		function __detectBrowser ( ) {
			var $browser = ( __isChrome ( ) ) ? String ( "chrome" ) : "";
			$browser = ( __isSafari ( ) ) ? String ( "safari" ) : $browser;
			$browser = ( __isFirefox ( ) ) ? String ( "firefox" ) : $browser;
			$browser = ( __isIE ( ) ) ? String ( "ie" ) : $browser;
			$browser = ( __isEdge ( ) ) ? String ( "edge" ) : $browser;
			$browser = ( __isOpera ( ) ) ? String ( "opera" ) : $browser;
			$browser = ( __isOther ( ) ) ? String ( "other" ) : $browser;
			return $browser;
		};

		return __detectBrowser ( );
	};

	function __cronometroStart ( $position = null ) {
		var $start = new Date ( ).getTime ( );
		if ( $position ) {
			$CRONOMETRO [ $position ].start = { init: $start, stap: [ ], stop: null, };
		} else {
			$CRONOMETRO [ 0 ] = { init: $start, stap: [ ], stop: null, } ;
			console.log ( $CRONOMETRO );
		};
		return $start;
	};

	function __cronometroStap ( $position  = 0 ) {
		var $cron = $CRONOMETRO [ $position ];
		var $stap = Math.abs ( new Date ( ).getTime ( ) - $cron.init );
		$cron.stap.push ( $stap );
		return $cron.stap;
	};

	function __cronometroStop ( $position = 0 ) {
		var $cron = $CRONOMETRO [ $position ];
		$cron.stop = ( Math.abs ( new Date ( ).getTime ( ) - $cron.init ) );
		return $cron.stop;
	};

	function __cronometroList ( ) {
		return $CRONOMETRO;
	};

	function __cronometroClear ( $position = null ) {
		if ( $position ) {
			$CRONOMETRO [ $position ] = { };	
		} else {
			$CRONOMETRO = [ ];
		};
		return $CRONOMETRO;
	};

	function __imprime ( $obj = null ) { 
		console.log ( $obj );
		alert ( String ( JSON.stringify ( $obj ) ) );
	}; 
	
	function __toText ( $obj = null ) { 
		console.log ( $obj );
		return String ( JSON.stringify ( $obj ) );
	}; 
	
	function __stamp ( $element, $obj = null ) {
		console.log ( $obj );
		$( $element ).text ( String ( JSON.stringify ( $obj ) ) );
	};

	function __template ( $element, $code = "" ) {
		$( $element ).html ( $code );
	};

	function __sleep ( $ms = 200 ) {
	    var $start = new Date ( ) .getTime ( );

	    for ( var $i = 0; $i < 1e7; $i++ ) { 
	        if( ( new Date ( ) .getTime ( ) - $start ) > ( $ms - 2 ) ) { 
	            break;
	        };
	    };
	};

	function __isJSON ( $json = null ) {
		var $isJSON = null;
		try { 
			var $obj = JSON.parse( $json );
        	if ( $obj && typeof $obj === "object" && $obj !== null) {
        		$isJSON = true;	
        	};
		} catch ( $Excception ) { 
			$isJSON = false; 
		};
		return $isJSON;
	};

	function __clone ( $obj = null ) { 
		return JSON.parse ( JSON.stringify ( $obj ) ); 
	};

	function __count ( $obj = null ) { 
		return ( $obj.length ) ? $obj.length : null;
	};

	function __delay ( $time = 200, $fn = null ) {
		if( $.isFunction ( $fn ) ) {
			setTimeout ( function ( ) { 
				$fn ( Number ( $time ) ); 
			}, Number ( $time ) );
		};
	};

	function __loop ( $fn = null, $time = 200, $cycles = null ) {
		if ( $.isFunction ( $fn ) ) {
			var $cycle = 0;
			var $loopInterval = setInterval ( function ( ) {
				$cycle++;
				var $return = $fn ( Number ( $cycle ), Number ( $time ) );
				if ( $cycles && $cycle >= Number ( $cycles ) || $return === false ) {
					clearInterval ( $loopInterval );
				};
			}, Number ( $time ) );
		};
	};

	function __scroll ( $px = null , $velocity = 800 ) {
		var $body = $( 'body' );
		if ( $px ) {
			$.easing.softScroll = __softScroll;
			$body.animate ( { scrollTop: $px }, { duration: $velocity, easing:'softScroll', } );
		} else {
			return Number ( $body.scrollTop ( ) )
		};

		function __softScroll ( $x, $t, $b, $c, $d ) {
            var $expo = false;
            if ( !$expo && $t == 0 ) { 
            	$expo = $b; 
            };
            if ( !$expo && $t == $d ) { 
            	$expo = ( $b + $c ); 
            };
            if ( !$expo && ( $t /= $d / 2 ) < 1 ) { 
            	$expo = ( $c / 2 * Math.pow ( 2, 10 * ( $t - 1 ) ) + $b ); 
            };
            if ( !$expo ) { 
            	$expo = ( $c / 2 * ( - Math.pow ( 2, -10 * --$t ) + 2 ) + $b ); 
            };
            return $expo; 
        };
	};

	function __autoScroll ( $velocity = 800 ) {
		$( "a"  ).on ( "click", function ( $event ) {
			$event.preventDefault ( );
			var $px = Math.abs ( $( $.attr ( this, 'href' ) ).offset ( ).top );
			__scroll ( $px , $velocity );
			return false;
    	} );
    	return this;
	};

	function __rollScreen ( ) {
		var $defaults = { position: null, width: null, pile: [ ], number: 0 };
		$defaults.width = $( document ).width ( );

		function __nextPile ( ) {
			$defaults.position = pile [ $defaults.number++ ];
		};

		function __previusPile ( ) {
			$defaults.position = pile [ $defaults.number-- ];
		};

	};

	//__consult ( { url:"", send: { ... }, receive: function ( $data, $consult ) { ... }, } );
	function __consult ( $query ) {
	    var $defaults = { 
	    	url: null, 
	    	send: null, 
	    	receive: null, 
	    	data: null, 
	    	error: null,
	    	method: "POST",
	    	timeout: 300,
	    	type: 'html',
	    };
	    var $options = $.extend ( $defaults, $query );

	    if ( $options.url ) {
	    	var $request = $.ajax( {
		      url: $options.url,
		      timeout: $options.timeout,
		      context: document.body,
		      method: $options.method,
		      data: $options.send,
		      dataType: $options.type,
		    } );

		    $request.done ( function ( $data ) {
		        $options.data = ( __isJSON ( $data ) ) ? JSON.parse ( $data.trim ( ) ) : $data.trim ( );
		    } );

		    $request.fail ( function ( $jqXHR, $textStatus ) { 
		        $options.data = "";
		        $options.error = $textStatus;
		    } );

		    $request.always ( function ( ) { 
		        if ( $.isFunction ( $options.receive ) ) {
		            $options.receive ( $options.data, $options );
		        };
		    } );
		};
	};

	//  SEARTCH CEP - cep(number,callback) // SUPORT CALLBACK
	// cep(number,function(data){ ... });
	function __cep ( $zipcode, $callback ) { 
	    var $defaults = { url: null, data: null, server: null, index: 0, zipcode: null, callback: null };
	    
	    var $cepServers = [
	        "https://viacep.com.br/ws/_CEP_/json/",
	        "http://api.postmon.com.br/v1/cep/_CEP_",
	        "http://cep.republicavirtual.com.br/web_cep.php?cep=_CEP_&formato=json",
	        "http://maps.google.com/maps/api/geocode/json?address=_CEP_&sensor=false",
	        "http://maps.googleapis.com/maps/api/geocode/json?address=_CEP_",
	        "http://correiosapi.apphb.com/cep/_CEP_",
	    ];
	    
	    var $address = { 
			url: null, 
			zipcode: null, 
			street: null, 
			district: null, 
			city: null, 
			state: null, 
			country: null, 
			codeibge: null,
			codegia: null,
			complementary: null,
			united: null,
		};

		if ( $.isFunction ( $callback ) ) {
			$defaults.zipcode = String ( $zipcode.trim ( ) );
			__gather ( $defaults, $cepServers, $callback );
		};
		
		function __gather ( $defaults, $cepServers, $callback ) {
			$defaults.url = __digestURL ( $cepServers, $defaults.zipcode, $defaults.index ) ;
			__consult ( { 
				method:"GET", 
				url: $defaults.url, 
				receive: function ( $data ) {
					if ( !$data && $defaults.index < 5) {
						$defaults.index++;
						__gather ( $defaults, $cepServers, $callback );
					} else {
						__setAddress ( $callback, __selectServiceDigest ( $defaults.index, $data ) );
					};
				}, 
			} );
		};
	    
	    function __digestURL ( $servers, $zipcode, $index = 0 ) { 
	    	return String ( $servers [ $index ].replace ( '_CEP_', $zipcode ) ); 
	    };

	    function __setAddress ( $calback, $data ) {
	    	if ( $.isFunction ( $callback ) ) {
				$address = $.extend ( $address, $data );
				$address.url = $defaults.url;
				$address.zipcode = $defaults.zipcode;
				$callback ( $address );
			};
	    };

	    function __selectServiceDigest ( $index, $data ) {
	    	switch ( $index ) {
	    		case 0:
	    			return __loadViacep ( $data );
	    			break;
	    		case 1:
	    			return __loadPostmon (  $data );
	    			break;
	    		case 2:
	    			return __loadRepublicaVirtual ( $data );
	    			break;
	    		case 3:
	    			return __loadGoogle ( $data );
	    			break;
	    		case 4:
	    			return __loadGoogle ( $data );
	    			break;
	    		default:
	    			return $data;
	    	};
	    };

		function __loadViacep ( $data ) {
			var $cep = { };
			$cep.street = $data.logradouro;
			$cep.district = $data.bairro;
			$cep.city = $data.localidade;
			$cep.state = $data.uf;
			$cep.codeibge = $data.ibge;
			$cep.codegia = $data.gia;
			$cep.complementary = $data.complemento;
			$cep.united = $data.unidade;
			return $cep;
		};

		function __loadPostmon ( $data ) {
			var $cep = { };
			$cep.street = $data.logradouro;
			$cep.district = $data.bairro;
			$cep.city = $data.cidade;
			$cep.state = $data.estado;
			$cep.codeibge = $data.cidade_info.codigo_ibge;
			return $cep;
		}

		function __loadRepublicaVirtual ( $data ) {
			var $cep = { };
			$cep.street = $data.logradouro;
			$cep.district = $data.bairro;
			$cep.city = $data.cidade;
			$cep.state = $data.uf;
			return $cep;	
		};

		function __loadGoogle ( $data ) {
			var $cep = { };
			$cep.cep = $data.results[0].address_components[0].long_name;
			$cep.district = $data.results[0].address_components[1].long_name;
			$cep.city = $data.results[0].address_components[2].long_name;
			$cep.state = $data.results[0].address_components[3].short_name;
			$cep.country = $data.results[0].address_components[4].short_name;
			$cep.latitude = $data.results[0].geometry.location.lat;
			$cep.longitude = $data.results[0].geometry.location.lng; 	
			return $cep;
		};
	};

	function __include ( $element = null, $url = null ) {
		if ( $element && $url ) {
			__consult ( { 
				url: $url,
				method: "GET",
				receive: function ( $data ) {
					if ( $data ) {
						$( $element ).html ( $data );
					};
				},
			} );
		};
	};

} ) ( );





/*
var rollFullScreen = function(element){
    var defaults = {
        status:false,
        state:false,
        width:false,
        heigth:false,
        sreenX:false,
        screenY:false,
        count:false,
        observer:false,
        position:false,
        posY:false,
        index:false,
        orientaion:false,
        direction:false
    };
    
    var that = $(element);
    
    var getScreen = function(){
        var getSize = function(){
            defaults.screenX = screen.width;
            defaults.screenY = screen.height;
            defaults.width = window.innerWidth;
            defaults.height = window.innerHeight;
            
            var tela = '<br> tela X : '+defaults.screenX+' <br> tela Y : '+defaults.screenY;
            var doc = '<br> documento X : '+defaults.width+' <br> documentyo Y : '+defaults.height;
            that.html(tela+doc);
            
            return (defaults.screenX && defaults.screenY && defaults.width && defaults.height) ? true : false
        }
        
        defaults.state = getSize();
        
        if(defaults.state){
            $(window).on('resize', function(){ defaults.state = getSize(); });
            $(window).on("orientationchange", function(){ 
                defaults.state = getSize();
                defaults.orientation = window.orientation;
            });
        }
        return defaults.state;
    }

    var pilePosition = function(){
        if(defaults.state){
            defaults.count = that.length;
            defaults.position = new Array();
            if(defaults.count > 0){
                that.each(function(){
                    defaults.position.push(Number($(this).offset().top));
                });
            } else{
                defaults.position.push(Number(that.offset().top))
            }
            
            defaults.state = (defaults.position.length > 0) ? true : false;
        } else{
            defaults.count = false;
            defaults.position = false;
        }
        return defaults.state;
    }
    
    
    var rollBlock = function(index){
        
        
        var menuBlock = function(){
        
            var n = defaults.position.length;
            var a = '';
            for(var i = 0; i < n; i++){
                if(i == defaults.index){ active = 'activeBlock' } else{ active = ''};
                a += '<a class="icon-menu '+active+'" data-number="'+i+'"></a>'; 
            }
            $('#menu-rollBlock').html(a);
            //if($('#menu-rollBlock').hasId()){ $('#menu-rollBlock').remove();} 
            //$('body').prepend('<span id="menu-rollBlock">'+a+'</span>');     
        }
        
        $('body').prepend('<span id="menu-rollBlock"></span>');
        rollAnchor(index);
        defaults.state = false;
        $(window).scroll(function(){
            menuBlock();
            var z = Number(defaults.position[defaults.index]);
            var p = Number($(window).scrollTop());
            if(p == z){ defaults.state = true; }
            if(defaults.state){
                if(p > z){
                    var i = defaults.position.length;
                    defaults.index = (defaults.index < (i - 1)) ? (defaults.index + 1) : defaults.index ;
                    rollAnchor(defaults.index);
                    defaults.state = false;
                }
                
                if(p < z){
                    defaults.index = (defaults.index > 0) ? (defaults.index - 1) : defaults.index;
                    rollAnchor(defaults.index);
                    defaults.state = false;
                }
            }
            
            $('.icon-menu').on('click', function(){
                rollAnchor(Number($(this).attr('data-number')));
                defaults.state = false;
            });
            
        });
    }
 
    getScreen();
    pilePosition();
    rollBlock(0);  
}
//rollFullScreen('.rollFull');

/*


*
function medir(){
    var imageAddr = "test/img/img1.jpg" + "?n=" + Math.random();
    var tempoInicio; 
    var tempoTermino; 
    var downloadSize = 47600;
    var download = new Image(); 
    download.onload = function() { 
        tempoTermino = (new Date()).getTime(); mostrarResultado();
    };
    tempoInicio = (new Date()).getTime(); 
    download.src = imageAddr;
    function mostrarResultado() { 
        var duration = Math.round((tempoTermino - tempoInicio) / 1000); 
        var bitsLoaded = downloadSize * 8; 
        var speedBps = Math.round(bitsLoaded / duration); 
        var speedKbps = (speedBps / 1024).toFixed(2); 
        var speedMbps = (speedKbps / 1024).toFixed(2); 
        alert ("Sua velocidade é de: \n" + speedBps + " bps\n" + speedKbps + " kbps\n" + speedMbps + " Mbps\n"); 
    };
};
medir();*/