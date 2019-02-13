window.onload = function(){
		$("input").keyup(
				function(){
						decaySPL();
				}
		);
}

function lineChart(set, label, point, pointa){
	
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
        labels: ["0m", "1m"],
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
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(100,100,255,0.1)",
                strokeColor: "rgba(100,100,255,0.2)",
                pointColor: "rgba(100,100,255,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(100,100,255,1)",
                data: [0, 0]
            },
        ]
    };             
	var ctx = document.getElementById("Grafic").getContext("2d");
	var LineChart = new Chart(ctx).Line(data, options);
		LineChart.datasets[0].points[0].value = 60;
    LineChart.datasets[0].points[1].value = set;
    LineChart.datasets[1].points[0].value = 60;
    LineChart.datasets[1].points[1].value = set;
    
    var gate = label.length;
    for(var i = 0; i <= gate; i++){
    		if(label[i]){
    				LineChart.addData([point[i], pointa[i]], label[i]+"m");
    		} else{
    				breack;
    		}
    }
    
    LineChart.update();
} 

function mt(){
		return [2,3,4,5,6,7,8,9,10,12,14,16,18,20,25,30,35,40];
}


function decaySPL(){
		var spl = Math.abs($("input[name='spl']").val());
		var m = mt();
		var dc = []
		var dcy = [];
		var gate = m.length;
		for(var i = 0; i <= gate; i++){
				var dec = spl + 20 * Math.log10(1 / m[i]);
				var dy = spl + 10 * Math.log10(1 / m[i]);
				dec = dec.toFixed(2);
				dy = dy.toFixed(2);
				dc[i] = dec;
				dcy[i] = dy;
		}
		lineChart(spl, mt(), dcy, dc);
}