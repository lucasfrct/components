$(document).ready(
    function(){
    		$("input").keyup(
						function(){
								delayMean();
								pwl();
								wE();
						}
				);
});

function delayMean(){
		var tmin = $("input[name='tmin'").val();
		var tmax = $("input[name='tmax'").val();
		var z = $("input[name='z'").val();
		var x = $("input[name='x']").val();
						
		var tmed = (Math.abs(tmin) + Math.abs(tmax)) / 2;
		var tK = Math.abs(tmed) + 273;
		var v = 20.1 * Math.sqrt(tK);
						
		var a = Math.sqrt((Math.pow(x,2) + Math.pow(z,2))) - z;
						
		var b = Math.sqrt((Math.pow((x / 2),2) + Math.pow(z,2))) - z;
						
		var dm = (a + b + x) / (v * 3);
		dm = dm.toFixed(5);
						
		$("input[name='v']").val(v);
		$("input[name='dm']").val(dm);
}

function pwl(){
		var wts = $("input[name='wts']").val();
		var pwl = 10 * (Math.log(wts) / Math.log(Math.pow(10,-12)));
		$("input[name='pwl']").val(pwl);
}

function wE(){
	var wts = $("input[name='wts']").val();
	var r = $("input[name='r']").val();	
	var wE = wts / (4 * Math.PI * Math.pow(r,2));
	wE = wE.toFixed(5);
	$("input[name='wE']").val(wE);
}