$("document").ready(
    function(){
        $('input').keyup(
            function(){
                //if(event.keyCode != 32 && event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 37 && event.keyCode != 39 && event.keyCode != 0){
                if(event.keyCode != 0){
                    calcSPL();
                }
            }
        );
    }
);

function calcSPL(){
    var spl = $("input[name='s1']").val();
    var splArray = spl.split("+");
    var n = splArray.length;
    var calcSPL = 0;
    var cel =[];
    var point = []
    for(var i = 0; i < n; i++){
            calcSPL = sumSPL(calcSPL, splArray[i]);
            cel[i] = (i + 1);
            point[i] = calcSPL;
    }
    calcSPL = calcSPL.toFixed(4);
    $("body em").html("SPL total = "+calcSPL);
    $("body span").html("Numero de Celulas = "+n);
    lineChart(60, cel, point);
}

function sumSPL(spl, add){
    var a = 0;
    var s = 0;
    if(spl >= add){
            a = (add - spl);
            s = spl;
    } else{
            a = (spl - add)
            s = add;
    }
    var sum = 20 * Math.log10(Math.sqrt(Math.pow(10,(a / 10)) + 1));
    return Math.abs(sum) + Math.abs(s);
}


function lineChart(set, label, point){
	
	var randomnb = function(){ return Math.round(Math.random()*360)};
	
	var options = {
		responsive:true,
        /*scaleShowGridLines : true, // linas de grade
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
        datasetFill : true, // preencher o conjunto dad e dados com uma  cor
        
        // MODELO DE LEGENDA
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        */
        
        
    };

	var data = {
        labels: ["-1", "0"],
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
	var ctx = document.getElementById("spl").getContext("2d");
	var LineChart = new Chart(ctx).Line(data, options);
		LineChart.datasets[0].points[0].value = set;
    LineChart.datasets[0].points[1].value = set;
    
    var gate = label.length;
    for(var i = 0; i <= gate; i++){
    		if(label[i]){
    				LineChart.addData([point[i].toFixed(2)], label[i]);
    		} else{
    				breack;
    		}
    }
    
    LineChart.update();
}
