// JavaScript Document
var y0 = 1;
var x0 = 0;
var xn = 0.01;
var xf = 1;
var A = 1;
var f = 5;
var zoom = (f * 2 * Math.PI ) / 1;
var passo = 0.01;
var sena = "";

while(xn <= xf){
    var y = y0 + (y0 * Math.sin(xn  * zoom) * A);
    xn = xn + passo;
    var fs = 0;
    var fs1 = A + y0 ;
    var fs2 = y0 - A;//270
    var fs3 = y0 + (A /2);
    var fs4 = y0 - (A / 2);
     
    
    if(y == fs1){
        fs = 90;
    }
    
    sena += fs+" -- "+y+"\n";
    
}

//alert(sena);



