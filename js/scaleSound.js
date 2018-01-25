$("document").ready(
		function(){
				$("input").keyup(
            function(){
            		velocitySound();
            		tensionSound();
            		sensibilitySound();
            }
        );
		}
);

function velocitySound(){
    if(event.keyCode != 8 || event.keyCode != 46){
        var TC = $("input[name='t']").val();
        var TK = Math.abs(TC) + 273;
        var v = 20.1 * Math.sqrt(TK);
        var vh = v.toFixed(2);
        $("div[name='v']").html(vh+" m/s")
        return v;
    }
};

function tensionSound(){
    if(event.keyCode != 8 || event.keyCode != 46){
        var p = $("input[name='p']").val();
        var r = $("input[name='r']").val();
        var u = Math.sqrt((p * r))
        var uh = u.toFixed(2);
        $("div[name='u']").html(uh+" V")
        return u;
    }
};

function sensibilitySound(){
    if(event.keyCode != 8 || event.keyCode != 46){
        var s = $("input[name='s']").val();
        var p = $("input[name='p']").val();
        var spl = Math.abs(s) + (10 * Math.log((p / 1)));
        var splh = spl.toFixed(2);
        $("div[name='dBa']").html(splh+" dB")
        return spl;
    }
};
