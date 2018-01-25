( function ( ) {
    "use strict";
    
    gss = $.extend ( gss, {
        log: __log,
        velocitySound: __velocitySound,
        waveLength: __waveLength,
        wavePeriod: __wavePeriod,
        delay: __delayTime,
        sumWatts: __sumWatts,
        decaySPLSpherical: __decaySPLSpherical,
        decaySPLCilindric: __decaySPLCilindric,
        sumSPL: __sumSPL,
        wattsToSPL: __wattsToSPL,
        voltTodBu: __voltTodBu,
        dBuToVolt: __dBuToVolt,
        reverberation: __reverberation,
    } );

    //__log ( 10, 5 ) = log of $number = 10 in $base = 5
    function __log ( $number = 10, $base = 10) {
        return Math.log ( Number ( $number ) ) / Math.log ( Number ( $base ) );
    };

    function __velocitySound ( $celcius = 23 ) {
        var $defaults = { velocity0: 331.45000, kelvin0: 273.15000, kelvin: 0, celcius: 23, };
        $defaults.celcius = Number ( $celcius );
        $defaults.kelvin = ( $defaults.kelvin0 + $defaults.celcius );
        $defaults.velocity = __velocityCalc ( $defaults.velocity0, $defaults.kelvin0, $defaults.kelvin ); 
        
        return $defaults.velocity.toFixed ( 8 ); // return in m/s

        function __velocityCalc ( $velocity0 = 331.45000, $kelvin0 = 273.15000, $kelvin = 0 ) {
            return Number ( $velocity0 ) * ( Math.sqrt ( Number ( $kelvin ) / Number ( $kelvin0 ) ) );
        };
    };

    function __waveLength ( $frequency = 1000, $velocity = 345 ) {
        var $defaults = { length: 0,  $frequency: 1000, velocity: 345, };
        $defaults.frequency = Number ( $frequency );
        $defaults.velocity = Number ( $velocity );
        $defaults.length = __lengthCalc ( $defaults.velocity , $defaults.frequency ); // return in m
        
        return $defaults.length.toFixed ( 8 );

        function __lengthCalc ( $velocity = 345, $frequency = 1000 ) {
            return Number( $velocity ) / Number ( $frequency );
        };
    };

    function __wavePeriod ( $frequency = 1000 ) {
        var $defaults = { period: 0, frequency : 1000, };
        $defaults.frequency = $frequency;
        $defaults.period = __periodCalc ( $defaults.frequency ); // return in s
        return $defaults.period.toFixed ( 8 );

        function __periodCalc ( $frequency = 1000 ) {
            return ( 1 / Number ( $frequency ) );
        };
    };

    function __delayTime ( $distance = 10, $temperature = 23 ) {
        var $defaults = { time: 0, distance: 10, temperature: 23, velocity : 0, };
        $defaults.distance = $distance;
        $defaults.temperature = $temperature;
        $defaults.velocity = __velocitySound ( $defaults.temperature );
        $defaults.time = __timeCalc ( $defaults.distance, $defaults.velocity ); // return in s
        return $defaults.time.toFixed ( 8 );

        function __timeCalc ( $distance = 10, $velocity = 23 ) {
            return ( ( Number ( $distance ) / Number ( $velocity ) ) * 1000 );
        };
    };

    function __sumWatts ( $arr = [ ] ) {
        var $defaults = { arr: [ ], sum: 0, };
        $defaults.arr = ( $.isArray ( $arr ) ) ? $arr : [ ].slice.call ( arguments, 0 );
        $defaults.sum = __sumCalc ( $defaults.arr ); // return Watts
        return $defaults.sum.toFixed ( 8 );
        
        function __sumWattsSquared ( $arr = [ ] ) {
            return $arr.reduce ( function ( $previus, $item, $index ) {
                return Number ( $previus ) + Math.pow ( Number ( $item ), 2 );
            } );
        };

        function __rootSumWatts ( $sumWatts = 100 ) {
            return Math.sqrt ( Number ( $sumWatts ) );
        };

        function __sumCalc ( $arr = [ ] ) {
            return __rootSumWatts ( __sumWattsSquared ( $arr ) );
        };
    };

    // lei dos inversos dos quadrados
    function __decaySPLSpherical ( $spl = 100, $distance = 50 ) {
        var $defaults = { spl: 100, distance: 50, decay: 0, };
        $defaults.spl = $spl;
        $defaults.distance = $distance;
        $defaults.decay = __decayCalc ( $defaults.spl, $defaults.distance );
        return $defaults.decay.toFixed ( 8 );

        function __decayCalc ( $spl = 100, $distance = 50 ) {
            return Number ( $spl ) + ( 20 * Math.log10 ( 1 / Number ( $distance ) ) );
        };
    };

    function __decaySPLCilindric ($spl = 100, $distance = 50 ) {
        var $defaults = { spl: 100, distance: 50, decay: 0, };
        $defaults.spl = $defaults.spl;
        $defaults.distance = $distance;
        $defaults.decay = __decayCalc ( $defaults.spl, $defaults.distance );
        return $defaults.decay.toFixed ( 8 );

        function __decayCalc ( $spl = 100, $distance = 50 ) {
            return Number ( $spl ) + ( 10 * Math.log10 ( 1 / Number ( $distance ) ) );
        };
    };

    function __sumSPL ( $arr = [ ] ) {
        var $defaults = { arr: [ ], sum: 0, };
        $defaults.arr = ( $.isArray ( $arr ) ) ? $arr : [ ].slice.call ( arguments, 0 );
        $defaults.sum = __sumCalc( $defaults.arr );
        return $defaults.sum.toFixed ( 8 );

        function __sumSPLTenth ( $array = [ ] ) {
            return $array.reduce ( function ( $previus, $item, $index, $arr ) {
                return Number ( $previus ) + Math.pow ( 10, ( Number ( $item ) / 10 ) );
            } );
        };

        function __logOfSumSPL ( $sumSPL = 100 ) {
            return ( 10 * Math.log10 ( Number ( $sumSPL ) ) );
        };

        function __sumCalc ( $arr =  [ ] ) {
            return __logOfSumSPL ( __sumSPLTenth ( $arr ) );
        };
    };

    function __wattsToSPL ( $sensibility = 87, $watts = 100 ) {
        var $defaults = { sensibility: 87, watts: 100, spl:0, };
        $defaults.sensibility = $sensibility;
        $defaults.watts = $watts;
        $defaults.spl = __SPLCalc ( $defaults.sensibility, $defaults.watts );
        return $defaults.spl.toFixed ( 8 );

        function __SPLCalc ( $sensibility = 87, $watts = 100 ) {
            return Number ( $sensibility ) + ( 10 * Math.log10 ( Number ( $watts ) ) );
        };
    };

    function __voltTodBu ( $voltage = 0.7745 ) {
        var $defaults = { volt0: 0.774596669, volt: 2.5, dBU: 0, };
        $defaults.volt = $voltage;
        $defaults.dBu = __dBUCalc ( $defaults.volt, $defaults.volt0 );
        return $defaults.dBu.toFixed ( 8 );

        function __dBUCalc ( $volt0, $voltRMS ) {
            return 20 * Math.log ( Number ( $voltRMS ) / Number ( $volt0 ) );
        };
    };

    function __dBuToVolt ( $dBu = 0 ) {
        var $defaults = { dBu: 0, volt0: 0.7745, volt: 0, };
        $defaults.dBu = $dBu;
        $defaults.volt = __voltCalc ( $defaults.v0, $defaults.dBu );
        return $defaults.volt.toFixed ( 8 );

        function __voltCalc ( $volt0 = 0.7745 , $dBu = 0 ) {
            return Number ( $v0 ) * Math.pow ( 10, ( Number ( $dBu ) / 20 ) ); 
        };
    };

    function __reverberation ( $volume = 100, $superficie = 100 , $absortion = 0.5 ) {
        var $defaults = { reverb: 0, volume: 100, superficie: 100, absortion: 0.5, area: 0, k: 0.161, };
        $defaults.volume = $volume; //m^3
        $defaults.superficie = $superficie; //m^2
        $defaults.absortion = $absortion;
        $defaults.area = __area ( $defaults.absortion, $defaults.superficie ); //m^2
        $defaults.reverb = __reverb ( $defaults.k, $defaults.volume, $defaults.area ); //segundos
        
        return $defaults.reverb.toFixed ( 8 );

        function __area ( $absortion = 0.5, $superficie = 100 ) {
            return Number ( $absortion ) * Number ( $superficie );
        };

        function __reverb ( $k, $volume, $area ) {
            return Nukmber ( $k ) * ( Number ( $volume ) / Number ( $area ) );
        };
    };

    function __mapdBuToSPL ( $dBu = 0, $map ) {
        var $defults = { 
            map: [
                { dBu: 0, spl: 80, }, 
                { dBu: -10, spl: 70 },
                { dBu: -20, spl: 60 },
                { dBu: -30, spl: 50 },
                { dBu: -40, spl: 40 },
                { dBu: -50, spl: 30 },
                { dBu: -60, spl: 20 },
            ], 
            noiseFloor: 20, //SPL
        };

        function rootCalc ( $dbu, $spl ) {
            return ( Number ( $num ) / Number ( $num ) );
        };

    };

} ) ( );