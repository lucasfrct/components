$("document").ready(
		function(){
		eficiencia();
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



function power(){
		return [50,100,200,300,400,500,750,1000,1500,2000,3000,4000,5000];
}

function eficiencia(){
		var s = Math.abs($("input[name='s']").val());
		var p = power();
		var spl = [];
		var tension = [];
		var tensionA = [];
		var tensionB = [];
		var gate = p.length;
		
		for(var i = 0; i <= gate; i++){
		
				var splSound = Math.abs(s) + (10 * Math.log((p[i] / 1)));
				var u = Math.sqrt((p[i] * 8));
				var uA = Math.sqrt((p[i] * 4));
				var uB = Math.sqrt((p[i] * 2));
				spl[i] = splSound.toFixed(2);
				tension[i] = u.toFixed(2);
				tensionA[i] = uA.toFixed(2);
				tensionB[i] = uB.toFixed(2);
		}
		tensionChart(0, power(), tension, tensionA, tensionB);
}

function lineChart(set, label, point){
	
	var randomnb = function(){ return Math.round(Math.random()*360)};
	
	var options = {
		responsive:true,
        scaleShowGridLines : true, // linas de grade
        scaleGridLineColor : "rgba(0,0,0,.05)", //cor da linha de grade
        scaleGridLineWidth : 1, // largura das linhas de grade
        scaleShowHorizontalLines: true, // linhas horizontais
        scaleShowVerticalLines: true, //linhas verticais
        bezierCurve : true, // desenhar curvas
        bezierCurveTension : 0.4, // tensão da curva
        pointDot : true, // mostrar ponto
        pointDotRadius : 4, // raio de caeda ponto
        pointDotStrokeWidth : 1, // largura da linha de desenho do ponto
        pointHitDetectionRadius : 20, // raio de espaço para ocorrencia fora no ponto
        datasetStroke : true, // barra para  conjuntos de dados
        datasetStrokeWidth : 2, /// largura para  barra de dados
        datasetFill : true, // preenchar o conjunto dad e dados com uma  cor
        
        // MODELO DE LEGENDA
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        
        
    };

	var data = {
        labels: ["0W", "1W"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,0.2)",
                data: [0, 0]
            }
        ]
    };             
	var ctx = document.getElementById("Grafic").getContext("2d");
	var LineChart = new Chart(ctx).Line(data, options);
		LineChart.datasets[0].points[0].value = 0;
    LineChart.datasets[0].points[1].value = set;
    
    var gate = label.length;
    for(var i = 0; i <= gate; i++){
    		if(label[i]){
    				LineChart.addData([point[i]], label[i]+"W");
    		} else{
    				breack;
    		}
    }
    
    LineChart.update();
}

function tensionChart(set, label, point, pointa, pointb){
	
	var randomnb = function(){ return Math.round(Math.random()*360)};
	
	var options = {
		responsive:true,
        scaleShowGridLines : true, // linas de grade
        scaleGridLineColor : "rgba(0,0,0,.05)", //cor da linha de grade
        scaleGridLineWidth : 1, // largura das linhas de grade
        scaleShowHorizontalLines: true, // linhas horizontais
        scaleShowVerticalLines: true, //linhas verticais
        bezierCurve : true, // desenhar curvas
        bezierCurveTension : 0.4, // tensão da curva
        pointDot : true, // mostrar ponto
        pointDotRadius : 4, // raio de caeda ponto
        pointDotStrokeWidth : 1, // largura da linha de desenho do ponto
        pointHitDetectionRadius : 20, // raio de espaço para ocorrencia fora no ponto
        datasetStroke : true, // barra para  conjuntos de dados
        datasetStrokeWidth : 2, /// largura para  barra de dados
        datasetFill : true, // preenchar o conjunto dad e dados com uma  cor
        
        // MODELO DE LEGENDA
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        
        
    };

	var data = {
        labels: ["0W", "1W"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(100,255,100,0.2)",
                strokeColor: "rgba(100,255,100,1)",
                pointColor: "rgba(100,255,100,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(100,255,100,0.2)",
                data: [0, 0]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(100,100,255,0.2)",
                strokeColor: "rgba(100,100,255,1)",
                pointColor: "rgba(100,100,255,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(100,100,255,0.2)",
                data: [0, 0]
            },
            {
                label: "My Third dataset",
                fillColor: "rgba(255,100,100,0.2)",
                strokeColor: "rgba(255,100,100,1)",
                pointColor: "rgba(255,100,100,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(255,100,100,0.2)",
                data: [0, 0]
            }
        ]
    };             
	var ctx = document.getElementById("tension").getContext("2d");
	var tension = new Chart(ctx).Line(data, options);
		tension.datasets[0].points[0].value = 0;
    tension.datasets[0].points[1].value = set;
    tension.datasets[1].points[0].value = 0;
    tension.datasets[1].points[1].value = set;
    tension.datasets[2].points[0].value = 0;
    tension.datasets[2].points[1].value = set;
    
    var gate = label.length;
    for(var i = 0; i <= gate; i++){
    		if(label[i]){
    				tension.addData([point[i],pointa[i],pointb[i]], label[i]+"W");
    		} else{
    				breack;
    		}
    }
    
    tension.update();
}
