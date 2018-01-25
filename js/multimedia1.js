let media = function($source) {
    let $that = this;
    let $audio = null;
    let $time = { init:null, end:null, time:null, duration:null, stop:null, loop:null, count:1, };
    let $fade = { input:3, output:3, init:null, end:null, modInput:null, modOutput:null, };
    
    $that.id = 'audio-'+String($source.split(' ').join('').split('.mp3')[0].split('/').join(''))+'au';
    $that.status = false;
    $that.title = $source.slice(0, -4);
    $that.volume = 1;
    $that.idTitle = null;
    $that.idTime = null;
    $that.idDuration = null;
    $that.idVolume = null;
    $that.idRepeat = null;
    $that.idfade = null;
    $that.gain = null;
    $that.executing = null;
    
    let __clear = function(){
        let $el = document.getElementById($that.id);
        $el.remove();
        
        /*let $elems = document.getElementsByTagName("audio");
        let $n = $elems.length;
        for (let $i = 0; $i < $n; $i++){
            let $el = document.getElementById($elems[i].id);
            $el.remove();
        };*/
    };

    let __create = function($id = null, $src = null) {
        let $aud = null;
        let $obj = document.createElement('audio');
        $obj.id = $id;
        $obj.src = $src;
        $obj.style = 'display: none';
        document.body.appendChild($obj);
        $aud = document.getElementById($id);
        $aud.preload = 'metadata';
        $aud.load();
        return $aud;
    };

    $audio = __create($that.id, $source);
    
    $that.parseToHours = function($seconds = 0){
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
    
    $that.parseToSeconds = function($time = 0){
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
    
    $that.parseToVolumeLog = function($percent = 0){
        $volume = 0;
        $volume = Math.log10($percent / 10);
        $volume = ($volume < 0) ? 0 : $volume;
        
        return $volume.toFixed(2);
    };
    
    $that.parseToPercentLog = function($volume = 0){
        var $percent = 0;
        $percent = (Math.pow(10, $volume)) * 10;
        $percent = ($percent < 0) ? 0 : $percent;
        
        return $percent.toFixed(2);
    };
    
    $that.fadeCalculator = function($time = 3){
        return (1 / ($time * 3.5));
    };
    
    $audio.onloadstart = function() { };
    
    $audio.onprogress = function() { };
    
    $audio.onplay = function() {
        $that.status = true;
        $audio.volume = $that.volume;
    };
    
    $audio.onpause = function() {
        $that.status = false;
        $that.volume = $audio.volume;
    };
    
    $audio.onseeking = function() { };

    $audio.onvolumechange = function() { 
        $that.volume = $audio.volume;
        
        if($that.idVolume){ 
            document.getElementById($that.idVolume).innerHTML = $that.parseToPercentLog($that.volume);
        };
    };
    
    $audio.ondurationchange = function(){
        $time.duration = ($time.duration) ? $time.duration : $audio.duration;
        $time.end = ($time.end) ? $time.end : $time.duration;
        $time.init = ($time.init) ? $time.init : 0;
        
        if($fade.modInput){
            $fade.init = $time.init;
        };
        
        if($fade.modOutput){
            $fade.end = ($time.end - $fade.output);
        };
        
        if($that.idTitle){
            document.getElementById($that.idTitle).innerHTML = $that.title;
        };

        if($that.idTime){
            document.getElementById($that.idTime).innerHTML = $that.parseToHours($time.time);
        };

        if($that.idDuration){
            document.getElementById($that.idDuration).innerHTML = $that.parseToHours($time.duration);
        };

        if($that.idVolume){
            document.getElementById($that.idVolume).innerHTML = $that.parseToPercentLog($that.volume);
        };

        if($that.idRepeat){
            document.getElementById($that.idRepeat).innerHTML = $time.loop;
        };

        if($that.idFade){
            document.getElementById($that.idFade).innerHTML = String($fade.input+", "+$fade,output);
        };
    };
    
    $audio.ontimeupdate = function(){
        
        $time.time = $audio.currentTime;
        $audio.volume = $that.volume;
        $that.gain = $audio.volume;
        
        // loop
        if($time.time >= $time.end){
            if($time.count < $time.loop){ 
                $audio.currentTime = $time.init;
                $time.count++;
            } else{
                $audio.pause();
                if($time.stop){ $audio.currentTime = $time.init; };
            };
        };
        
        // fadein
        if($fade.modInput && $that.gain < 1){
            if($that.gain < (1 - $fade.modInput)){ 
                $audio.volume += $fade.modInput;
            } else{
                $audio.volume = 1;
            };
        };
        
        // fadeout
        if($fade.modOutput && $time.time > $fade.end){
            if($that.gain > $fade.modOutput){
                $audio.volume =  ($that.gain - $fade.modOutput);
            } else{
                $audio.volume =  0;
            };
        };

        if($that.executing){
            $that.executing({time:$time.time, volume:$that.gain, duration:$time.duration, init:$time.init, end:$time.end});
        };
        
        if($that.idTime){ 
            document.getElementById($that.idTime).innerHTML = $that.parseToHours($time.time);
        };
    };

    $audio.onsuspend = function(){
        //__clear();
    };

    $that.play = function($init = 0){
        ($init) ? $that.init($that.parseToSeconds($init)): '';
        $audio.load();
        $audio.play();
        
        return $that;
    };
    
    $that.pause = function($end = null){
        ($end) ? $that.end($that.parseToSeconds($end)) : $audio.pause();
        
        return $that;
    };
    
    $that.stop = function($end= null){
        if($end){
            $that.end($that.parseToSeconds($end));
            $time.stop = true; 
        } else{ $audio.pause();
            $that.init($time.init);
        }; 

            return $that;
    };
    
    $that.time = function($setTime = null){
        var $return = null;
        
        if($setTime){
            $set = $that.parseToSeconds($setTime);
            $time.time = ($set) ? $set : $time.end;
            $audio.currentTime = $time.time;
            $return = $that;
        } else{
            $time.time = $audio.currentTime;
            $return = $that.parseToHours($time.time);
        };
    };
    
    $that.duration = function($duration = null){
        var $return = null;
        
        if($duration){
            $duration = $that.parseToSeconds($duration);
            $time.duration = ($time.init < $duration && $time.end < $duration) ? $duration : $audio.duration;
            $time.end = $time.duration;
            $return = $that;
        } else{
            $time.duration = $audio.duration;
            $return = $that.parseToHours($time.duration); 
        };
        
        return $return;
    };
    
    $that.init = function($init = 0){
        
        if($init || $init === 0){
            $time.init = $that.parseToSeconds($init);
            $time.time = $time.init;
            $audio.currentTime = $time.init;
        };
        
        return $that;
    };
    
    $that.end = function($end = null) {    
        ($end) ? $time.end = $that.parseToSeconds($end) : '';
        
        return $that;
    }
    
    $that.vol = function($percent = 0) {
        var $return = null;
        
        if($percent) {
            $that.volume = $that.parseToVolumeLog($percent);
            $audio.volume = $that.volume;
            $return = $that;
        } else{
            $that.volume = $audio.volume;
            $return = $that.parseToPercentLog($that.volume);
        };
        
        return $return;
    };
    
    $that.repeat = function($number = 0){
        $time.loop = ($number) ? $number : 10000;
        
        return $that;
    };

    $that.showTitle = function($idTitle = null){
        $that.idTitle = $idTitle;

        return $that;
    };
    
    $that.showTime = function($idTime = null){
        $that.idTime = $idTime
        
        return $that;
    };
    
    $that.showDuration = function($idDuration = null){
        $that.idDuration = $idDuration;
        
        return $that;
    };
    
    $that.showVolume = function($idVolume = null){
        $that.idVolume = $idVolume;
        
        if($that.idVolume){ 
            document.getElementById($that.idVolume).innerHTML = $that.parseToPercentLog($that.volume);
        };
        
        return $that;
    };
    
    $that.fadeIn = function($time = 3){
        $fade.input = $time;
        $that.volume = 0;
        $fade.modInput =  $that.fadeCalculator($fade.input);

        return $that;
    };
    
    $that.fadeOut = function($time = 3){
        $fade.output = $time;
        $fade.modOutput =  $that.fadeCalculator($fade.output);

        return $that;
    };

    $that.execute = function($exec){
        $that.executing = $exec;

        return $that;
    };
    
    return $that;
};

/*media('quero te louvar.mp3')
.showTitle('title')
.showTime('time')
.showDuration('duration')
.showVolume('volume')
.init(37).end(47)
.vol(10.5)
.repeat(10)
.execute(function($au){
    imprimeDoc('doc', $au);
})
.play();*/

//media('2.mp3').play().vol(11);
//$m = media('quero te louvar.mp3');
//$t = $m.id;
//$t = $m.status;
//$t = $m.title;
//$t = $m.volume;
//$t = $m.idTitle;
//$t = $m.idTime;
//$t = $m.idDuration;
//$t = $m.idVolume;
//$t = $m.gain;
//$t = $m.parseToHours(100);
//$t = $m.parseToSeconds('00:01:40');
//$t = $m.parseToVolumeLog(100); // input in percent
//$t = $m.parseToPercentLog(1); // input in voume
//$m.execute(function($au){ imprimeDoc('doc', $au); });
//$m.play('5'); // inicia play em 35 segundos
//$m.pause('00:00:40'); // pausa em 40 segundos
//$m.stop('00:00:40'); // stop e clear tempo
//$m.time('00:00:37'); // set e get o tempo da mídia
//$m.duration('00:00:40'); // set e get duration max
//$m.init('00:00:37') // inicio da reprodução
//$m.end('00:00:45') // fim da reprodução
//$m.vol(10.2) // set e get do volume | 0 - 100
//$m.repeat(2) // set loop
//$m.showTitle('title');
//$m.showTime('time'); // mostra tempo correndo
//$m.showDuration('duration') // mostra duração
//$m.showVolume('volume'); // mostra o volume
//$m.fadeIn(0.8);
//$m.fadeOut(0.8);

let __multimedia = function($array){
    
    let $that = this;
    $that.n = $array.length;
    $that.state = false;
    $that.number = 0;
    $that.count = 0;
    $that.Media = null;
    $that.played = false;
    $that.idLTitle = null;
    $that.idLTime = null;
    $that.idLDuration = null;
    $that.idLVolume = null;
    $that.controlVol = 100;

    $that.labelTitle = function($title = null){
        $that.idLTitle = $title;
    };

    $that.labelTime = function($time = null){
        $that.idLTime = $time;
    };

    $that.labelDuration = function($duration = null){
        $that.idLDuration = $duration;
    };

    $that.labelVolume = function($volume = null){
        $that.idLVolume = $volume;
    };

    $that.control = function($vol = 100){
        $that.controlVol = $vol;
    };

    $that.next = function($index){
        $that.number = ($index) ? $index : ($that.number + 1);
        $that.stateNext = true;
    };

    $that.load = function($source = null, $state){

        $that.stateNext = false;
        $that.Media = media($source);
        
        $that.Media
        .showTitle($that.idLTitle)
        .showTime($that.idLTime)
        .showDuration($that.idLDuration)
        .showVolume($that.idLVolume)
        .vol($that.controlVol)
        .execute(function($au){
            
            if(!$that.state && $au.time > ($au.end - 0.1)){ 
                $that.count = $that.number + 1;
                $that.state = true;
                $that.stateNext = false;
            };

            if($that.stateNext){
                $that.Media.stop();
                setTimeout(function(){
                    load($array[$that.number]);
                }, 5);
            };

        })
        .play();

        return $that;
    };

    $that.play = function(){

        setTimeout(function(){
            
            load($array[$that.number]);

            setInterval(function(){
                if($that.state && $that.count == ($that.number + 1) && $that.count < $that.n){
                    $that.number = $that.count;
                    $that.state = false;
                    $that.stateNext = false;
                    load($array[$that.number]);
                };

            }, 100);
        
        }, 5);

        return $that;
    };

    return $that;
};

var $musics = [
    'Águas Profundas.mp3',
    'Não Tenho Medo.mp3',
    'Quero te Louvar.mp3',
    'Vou te alegrar.mp3',
];

var $m = __multimedia($musics);
$m.play();
$m.labelTitle('title'); 
$m.labelTime('time'); 
$m.labelDuration('duration');
$m.labelVolume('volume'); 
$m.control(50);
$m.next();