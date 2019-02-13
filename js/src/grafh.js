// JavaScript Document
$(document).ready(
    function(){
        $("input[name='f']").keyup(
            function(){
                var f = $("input[name='f']").val()
                var A = 0.6;
                senoide(A,f);
            }
        );
    }
);

function senoide(A,f){
    
    var canvas = document.getElementById("senoide");
	var ctx = canvas.getContext("2d");
    var margem = 0;
    var altura = canvas.height - margem;
    var metadeAltura = altura / 2;
    var comprimentoLinha = canvas.width - margem;
    
	var x = 0;
	var y = 0;

	var amplitude = A;  //0.6; // altura maxima curva
	var frequencia = f ;  //4; // numero de voltas no circulo
	var passo = 0.1;  // unidade de medida
	
	
    function desenhaCurva(){ 
		
        ctx.beginPath();
		ctx.rect(margem, margem, canvas.width - margem, canvas.height - margem); // definindo retangulo
	
		ctx.beginPath();
		ctx.moveTo(margem,margem+metadeAltura);	
		ctx.lineTo(comprimentoLinha,margem+metadeAltura);
		ctx.stroke();
	
		ctx.beginPath();
		var proporcao = (frequencia * 2 * Math.PI ) / 10000;  
		
        // primeiro Y
		y = metadeAltura + (metadeAltura * Math.sin(x * proporcao) * amplitude);
		while( x <= comprimentoLinha ){
			ctx.moveTo(x,y);
			y = metadeAltura + (metadeAltura * Math.sin(x * proporcao) * amplitude);
		
			x = x + passo;
			ctx.lineTo(x,y);
		}
	
		ctx.stroke();
	}
	
	desenhaCurva();
}