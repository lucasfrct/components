var mathEletric = { };
( function ( ) {
	"use strict";

	var $FACTOR = 0.6;
	var $DECIMAL = 2;
	var $DEDUCEKVA = ( 1000 * $FACTOR );

	mathEletric = $.extend ( mathEletric, {

		tension: {
			ar: __tensionAR,
			ap: __tensionAP,
			kv: __parseKvToTension,
			akva: __tensionAKva,
			rp: __tensionRP,
			rkva: __tensionAKva,
		},

		amperage: {
			tr: __amperageTR,
			tp: __amperageTP,
			tkva: __amperageTKva,
			rp: __amperageRP,
			rk: __amperageRK,
			rkva: __amperageRKva,
			pk: __amperagePK,
			kkva: __amperageKKva,
		},

		resistance: {
			ta: __resistanceTA,
			tp: __resistanceTP,
			tkva: __resistanceTKva,
			ap: __resistanceAP,
			ak: __resistanceAK,
			akva: __resistanceAKva,
			pk: __resistancePK,
			kkva: __resistanceKKva,
		},

		power: {
			ta: __powerTA,
			tr: __powerTR,
			ar: __powerAR,
			ak: __powerAK,
			rk: __powerRK,
			kva: __parseKvaToPower,
		},

		kv: {
			tension: __parseTensionToKv,
			ar: __kvAR,
			ap: __kvAP,
			akva: __kvAKva,
			rp: __kvRP,
			rkva: __kvRKva
		},

		kva: {
			power: __parsePowerToKva,
			ta: __kvaTA,
			tr: __kvaTR,
			ar: __kvaAR,
			ak: __kvaAK,
			rk: __kvaRK,
		},

		nominalToRms: __parseNominalToRMS,
		nominalToPico: __parseNominalToPico,
	} );

	function __parseTensionToKv ( $tension ) {
		return ( Number ( $tension ) / 1000 ).toFixed ( $DECIMAL );
	};

	function __parseKvToTension ( $kv ) {
		return ( Number ( $kv ) * 1000 ).toFixed ( $DECIMAL );
	};

	function __parseKvaToPower ( $kva ) {
		return ( Number ( $kva ) * $DEDUCEKVA ).toFixed ( $DECIMAL );
	};

	function __parsePowerToKva ( $power ) {
		return ( Number ( $power ) / $DEDUCEKVA ).toFixed ( $DECIMAL );
	};

	function __parseNominalToRMS ( $nominal ) {
		return ( Number ( $nominal ) / Math.sqrt ( 2 ) ).toFixed ( $DECIMAL );
	};

	function __parseNominalToPico ( $nominal ) {
		return ( Number ( $nominal ) * Math.sqrt ( 2 ) ).toFixed ( $DECIMAL );
	};

	function __tensionAR ( $amperage, $resistance ) {
		return ( Number ( $amperage ) * Number ( $resistance ) ).toFixed ( $DECIMAL );
	};

	function __tensionAP ( $amperage, $power ) {
		return ( Number ( $power ) / Number ( $amperage ) ).toFixed ( $DECIMAL );
	};

	function __tensionAKva ( $amperage, $kva ) {
		return __tensionAP ( $amperage, __parseKvaToPower( $kva ) );
	};

	function __tensionRP ( $resistance, $power ) {
		return ( Math.sqrt ( Number ( $resistance ) * Number ( $power ) ) ) .toFixed ( $DECIMAL );
	};

	function __tensionRKva ( $resistance, $kva ) {
		return __tensionRP ( $resistance, __parseKvaToPower ( $kva ) );
	};

	function __amperageTR ( $tension, $resistance ) {
		return ( Number ( $tension ) / Number ( $resistance ) ).toFixed ( $DECIMAL );
	};

	function __amperageTP ( $tension, $power ) {
		return ( Number ( $power ) / Number ( $tension) ).toFixed ( $DECIMAL );
	};

	function __amperageTKva ( $tension, $kva ) {
		return __amperageTP ( $tension, __parseKvaToPower ( $kva ) );
	};

	function __amperageRP ( $resistance, $power ) {
		return Math.sqrt ( Number ( $power ) / Number ( $resistance ) ).toFixed ( $DECIMAL );
	};

	function __amperageRK ( $resistance, $kv ) {
		return __amperageTR ( parseKvToTension ( $tension ), $resistance );
	};

	function __amperageRKva ( $resistance, $kva ) {
		return __amperageRP ( $resistance, __parseKvaToPower ( $kva ) );
	};

	function __amperagePK ( $power, $kv ) {
		return __amperageTP ( __parseKvToTension ( $kv ), $power );
	};

	function __amperageKKva ( $kv, $kva ) {
		return __amperageTKva ( __parseKvToTension ( $kv ), $kva );
	};

	function __resistanceTA ( $tension, $amperage ) {
		return ( Number ( $tension ) / Number ( $amperage ) ).toFixed ( $DECIMAL );
	};

	function __resistanceTP ( $tension, $power ) {
		return ( Math.pow ( Number ( $tension ), 2 ) / Number ( $power ) ).toFixed ( $DECIMAL );
	};

	function __resistanceTKva ( $tension, $kva ) {
		return __resistanceTP ( $tension , __parseKvaToPower ( $kva ) );
	};

	function __resistanceAP ( $amperage, $power ) {
		return ( Number ( $power ) / Math.sqrt ( Number ( $amperage ) ) ).toFixed ( $DECIMAL );
	};

	function __resistanceAK ( $amperage, $kv ) {
		return __resistanceTA ( __parseKvToTension ( $kv ), $amperage );
	};

	function __resistanceAKva ( $amperage, $kva ) {
		return __resistanceAP ( $amperage, __parseKvaToPower ( $kva ) );
	};

	function __resistancePK ( $power, $kv ) {
		return __resistanceTP ( __parseKvToTension ( $kv ), $power );
	};

	function __resistanceKKva ( $kv, $kva ) {
		return __resistanceTKva ( __parseKvToTension ( $kv ), $kva );
	};

	function __powerTA ( $tension, $amperage ) {
		return ( Number ( $tension ) * Number ( $amperage ) ).toFixed ( $DECIMAL );
	};

	function __powerTR ( $tension, $resistance ) {
		return ( Math.pow ( Number ( $tension ), 2) / Number ( $resistance ) ).toFixed ( $DECIMAL );
	};

	function __powerAR ( $amperage, $resistance ) {
		return ( Number (  $resistance ) / Math.pow ( Number ( $amperage ), 2 ) ).toFixed ( $DECIMAL );	
	};

	function __powerAK ( $amperage, $kv ) {
		return __powerTA ( __parseKvToTension ( $kv ), $amperage );
	};

	function __powerRK ( $resistance, $kv ) {
		return __powerTR ( __parseKvToTension ( $kv ), $resistance );
	};

	function __kvAR ( $amperage, $resistance ) {
		return __parseTensionToKv( __tensionAR ( $amperage, $resistance ) );
	};

	function __kvAP ( $amperage, $power ) {
		return __parseTensionToKv ( __tensionAP ( $amperage, $power ) );
	};

	function __kvAKva ( $amperage, $kva ) {
		return __parseTensionToKv ( __tensionAKva ( $amperage, $kva ) );
	};

	function __kvRP ( $resistance, $power ) {
		return __parseTensionToKv ( __tensionRP ( $resistance, $power ) );
	};

	function __kvRKva ( $resistance, $kva ) {
		return __parseTensionToKv ( __tensionRKva ( $resistance, $kva ) );
	};

	function __kvaTA ( $tension, $amperage ) {
		return __parsePowerToKva ( __powerTA ( $tension, $amperage ) );
	};

	function __kvaTR ( $tension, $resistance ) {
		return __parsePowerToKva ( __powerTR ( $tension, $resistance ) );
	};

	function __kvaAR ( $amperage, $resistance ) {
		return __parsePowerToKva ( __powerAR ( $amperage, $resistance ) );
	};

	function __kvaAK ( $amperage, $kv ) {
		return __parsePowerToKva ( __powerAK ( $amperage, $kv ) );
	};

	function __kvaRK ( $resistance, $kv ) {
		return __parsePowerToKva ( __powerRK ( $resistance, $kv ) );
	};
 
} ) ( );
var _e = mathEletric;