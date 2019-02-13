// JavaScript Document
$(document).ready(
    function(){
        $("input").keyup(
            function(){
                eqVelocity();
                waveLength();
                wavePeriod();
                frequencyAngular();
                delayFonts();
                freqCancel();
                fase();
                delayHass();
                frequencyEstatic();
                dBWatts();
                raioDiagonal();
            }
        );
        
       	$("button[name='bark']").click(
       			function(){
       					barkBand();
       			}
       	);
       	
       	$("button[name='eq']").click(
       			function(){
       					eqBand();
       			}
       	);
       	
       	$("button[name='fase180']").click(
       			function(){
       					fase180();
       			}
       	);
    }
);

function eqVelocity(){
    if(event.keyCode != 8 || event.keyCode != 46){
        var TC = $("input[name='TC']").val();
        var TK = Math.abs(TC) + 273;
        var v = 20.1 * Math.sqrt(TK)
        $("input[name='v']").val(v)
        
        return v;
    }
};

function waveLength(){  
    if(event.keyCode != 8 || event.keyCode != 46){
        var f = $("input[name='f']").val();
        var v = $("input[name='v']").val();
        var l = v / f;
        $("input[name='l']").val(l) 
    }
    return l;
};

function wavePeriod(){  
    if(event.keyCode != 8 || event.keyCode != 46){
        var f = $("input[name='f']").val();
        var T = 1 / f;
        $("input[name='T']").val(T) 
    }
    return T;
};

function frequencyAngular(){  
    if(event.keyCode != 8 || event.keyCode != 46){
        var f = $("input[name='f']").val();
        var o = (2 * Math.PI) * Math.abs(f);
        $("input[name='o']").val(o) 
    }
    return o;
};

function delayFonts(){
    var p1 = $("input[name='p1']").val();
    var p2 = $("input[name='p2']").val();
    var v = $("input[name='v']").val();
    var d = Math.abs(p1 - p2);
    var w = d / v;  
    $("input[name='w']").val(w);
    $("input[name='d']").val(d);
    return w;
}

function freqCancel(){
    var w = $("input[name='w']").val();
    var fw = 1 / (2 * w);
    $("input[name='fw']").val(fw);    
    return fw;
}

function fase(){
   	var v = $("input[name='v']").val();
   	var d = $("input[name='d']").val();
   	var f = $("input[name='f']").val();
   	var T = $("input[name='T']").val();
		var O = ((d / v) % T) / (T / 360);
    $("input[name='O']").val(O);
    return O;
}

function delayHass(){
    var v = $("input[name='v']").val();
    var d = $("input[name='d']").val();
    dh = (d / v ) + 0.020;
    $("input[name='dh']").val(dh);
}

function frequencyEstatic(){
		var v = $("input[name='v']").val();
		var d = $("input[name='d']").val();
		
		var fE = v / d;
		$("input[name='fE']").val(fE);
}

function faseCalc(f){
   	var v = $("input[name='v']").val();
   	var d = $("input[name='d']").val();
		var O = ((d / v) % (1 / f)) / ((1 / f) / 360);
    return Math.floor(O);
}

function barkBand(){
		var frequency = [20,100,200,300,400,510,630,770,920,1080,1270,1480,1720,2000,2320,2700,3150,3700,4400,5300,6400,7700,9500,12000,15500];
		var combo = "";
		var count = 0;
		
		while(count <= 24){
				combo = combo+frequency[count]+" -"+faseCalc(frequency[count])+"\n";
				count++;
		}
		$("textarea[name='freq']").val(combo);
}

function eqBand(){
		var frequency = [20,25,31.5,40,50,63,80,100,125,160,200,250,315,400,500,630,800,1000,1250,1600,2000,2500,3150,400,5000,6300,8000,10000,12500,16000,20000];
		var combo = "";
		var count = 0;
		
		while(count <= 30){
				combo = combo+frequency[count]+" -"+faseCalc(frequency[count])+"\n";
				count++;
		}
		$("textarea[name='freq']").val(combo);
}



function dBWatts(){
		var W = $("input[name='W']").val();
		var dB = (-60 * W) / (1 / 1000);
		$("input[name='dB']").val(dB);
}



function fase180(){
		var frequency = 20;
		var combo = 0;
		var count = 1;
		while(frequency < 20000){
				if(faseCalc(frequency) > 179 && faseCalc(frequency) < 181){
						combo = combo+"\n"+frequency+" - "+faseCalc(frequency);
				}
				frequency = Math.abs(frequency) + 1;
				count++;
		}
		$("textarea[name='freq']").val(combo);
}

function raioDiagonal(){

		var v = $("input[name='v']").val();
		var z = $("input[name='z']").val();
		var x = $("input[name='x']").val();
		var y = $("input[name='y']").val();
		
		var cz = z / 2;
		var cx = x / 2;
		var cy = y / 2;
		
		var fEt = v / (2 * z);
		
		var zdg = Math.sqrt((Math.pow(cx,2) + Math.pow(z,2)));
		var zfE = v / (2 * zdg);
		
		var xdg = Math.sqrt((Math.pow(x,2) + Math.pow(cz,2)));
		var xfE = v / (2 * xdg);
		
		var ydg = Math.sqrt((Math.pow(cy,2) + Math.pow(z,2)));
		var yfE = v / (2 * ydg);
		
		$("input[name='cz']").val(cz);
		$("input[name='cx']").val(cx);
		$("input[name='cy']").val(cy);
		$("input[name='fEt']").val(fEt);
		$("input[name='zdg']").val(zdg);
		$("input[name='zfE']").val(zfE);
		$("input[name='xdg']").val(xdg);
		$("input[name='xfE']").val(xfE);
		$("input[name='ydg']").val(ydg);
		$("input[name='yfE']").val(yfE);
}





