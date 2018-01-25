( function ( ) {
	"use strict";
	var $SHORTKEY {
		shortkey : __shortCut;
	};
	gss = $.extend ( gss, $SHORTKEY );

	function __shortCut ( $shotcut = null , $fn = null ) {
		var $defaults = { keys: null, timeout: 300, focus:false, };
		//.altKey | .ctrlKey | .shiftKey | .metaKey == WIN
		
		$defaults.keys = __normalizeString ( $shotcut );
		__keyObserver ( $defaults );
		
		console.log ( $defaults.keys );
		
		function __keyObserver ( $defaults ) {
			$( document ).on ( "keydown", function ( $event ) {
				
				//console.log ( __parseToKey ( "a" ) );
				//console.log ( __ctrlKey ( $event, __parseToKey ( "a" ) ) );
				// __ctrlKey ( "a", function ( ) { .. } );

			} ).on ( "keyup", function ( $event ) {
				
				//console.log ( __getKeycode ( $event ) );

			} );
		};

		function __keyCodeToCharatere ( $keyCode ) {
			return String ( String.fromCharCode ( $keyCode ).toLowerCase ( ) );
		};

		function __parseToKey ( $char ) {
			var $key = $char.charCodeAt ( 0 );
			return ( $key >= 97 && $key <= 122 ) ? ( $key - 32 ) : $key;
		};

		function __ctrlKey ( $event, $key = null ) {
			return ( $event.ctrlKey && !$event.shiftKey && !$event.altKey && !$event.metaKey && $key == __getKeycode ( $event ) ) ? "true" : "false";
		};

		function __altKey ( $event, $key = null ) {
			return ( !$event.ctrlKey && !$event.shiftKey && $event.altKey && !$event.metaKey && $key == __getKeycode ( $event ) ) ? "true" : "false";
		};

		function __shiftKey ( $event, $key = null ) {
			return ( !$event.ctrlKey && $event.shiftKey && !$event.altKey && !$event.metaKey && $key == __getKeycode ( $event ) ) ? "true" : "false";
		};

		function __metaKey ( $event, $key = null ) {
			return ( !$event.ctrlKey && !$event.shiftKey && !$event.altKey && $event.metaKey && $key == __getKeycode ( $event ) ) ? "true" : "false";
		};

		function __ctrShiftKey ( $event, $key = null ) {
			return ( $event.ctrlKey && $event.shiftKey && !$event.altKey && !$event.metaKey && $key == __getKeycode ( $event ) ) ? "true" : "false";
		};

		function __ctrAltKey ( $event, $key = null ) {
			return ( $event.ctrlKey && !$event.shiftKey && $event.altKey && !$event.metaKey && $key == __getKeycode ( $event ) ) ? "true" : "false";
		};

		function __ctrMetaKey ( $event, $key = null ) {
			return ( $event.ctrlKey && !$event.shiftKey && !$event.altKey && $event.metaKey && $key == __getKeycode ( $event ) ) ? "true" : "false";
		};

		function __normalizeString ( $string ) {
			return $string.split ( "+" ).map ( function ( $item ) {
				return  $item.toLowerCase ( );
			} );
		};
		
		function __getKeycode ( $event ) {
			return ( $event.keyCode || $event.which );
		};

		function __keyDigest ( $code ) {
			switch ( $code ) {
				case 8:
					return "backspace";
					break;
				case 9:
					return "tab";
					break;
				case 13:
					return "enter";
					break;
				case 17:
					return "ctrl";
					break;
				case 18:
					return "alt"
					break;
				case 16:
					return "shift";
					break;
				case 20:
					return "fixa";
					break;
				case 37:
					return "left";
					break;
				case 38:
					return "up";
					break;
				case 39:
					return "right";
					break;
				case 40:
					return "down";
					break;
				case 46:
					return "del";
					break;
				case 91:
					return "win"
					break;
				case 107:
					return "+";
					break;
				case 109:
					return "-";
					break;
				case 112:
					return "f1"
					break;
				case 113:
					return "f2"
					break;
				case 114:
					return "f3"
					break;
				case 115:
					return "f4"
					break;
				case 116:
					return "f5"
					break;
				case 117:
					return "f6"
					break;
				case 118:
					return "f7"
					break;
				case 119:
					return "f8"
					break;
				case 120:
					return "f9"
					break;
				case 121:
					return "f10"
					break;
				case 122:
					return "f11"
					break;
				case 123:
					return "f12"
					break;
				case 187:
					return "=";
					break;
				case 189:
					return "-";
					break;
				default:  
					return $code;
			};
		};
	};

} ) ( );