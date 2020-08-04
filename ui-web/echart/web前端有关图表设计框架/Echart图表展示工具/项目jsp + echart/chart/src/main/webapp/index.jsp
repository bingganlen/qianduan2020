<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>动态图表展示</title>
<script src="js/jquery.js"></script>
<script src="js/highcharts.src.js"></script>
</head>
<body>
	<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
</body>
<script type="text/javascript">
	var data = [];
	var time = (new Date()).getTime();
	$(function () {
	    $(document).ready(function () {
	        Highcharts.setOptions({
	            global: {
	                useUTC: false
	            }
	        });
	
	        $('#container').highcharts({
	            chart: {
	                type: 'spline',
	                animation: Highcharts.svg, // don't animate in old IE
	                marginRight: 10,
	                events: {
	                    load: function () {
	
	                        // set up the updating of the chart each second
	                        var series = this.series[0];
	                        setInterval(function () {
	                        	$.get("${pageContext.request.contextPath}/chart/getRealInfo",function(data){
	                        		var json = eval('(' + data + ')');
	                        		console.log(json.data.date);
	                        		//传入的横纵坐标值
		                            var x = (new Date()).getTime(), // current time
		                                y = Math.random();
		                            series.addPoint([json.data.date, json.data.num], true, true);
	                        	});
	                        }, 5000);//每隔5秒查询一次后台
	                    }
	                }
	            },
	            title: {
	                text: '实时监控'
	            },
	            xAxis: {
	                type: 'datetime',
	                tickPixelInterval: 250
	            },
	            yAxis: {
	                title: {
	                    text: 'Value'
	                },
	                plotLines: [{
	                    value: 0,
	                    width: 1,
	                    color: '#808080'
	                }]
	            },
	            tooltip: {
	                formatter: function () {
	                    return '<b>' + this.series.name + '</b><br/>' +
	                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
	                        Highcharts.numberFormat(this.y, 2);
	                }
	            },
	            legend: {
	                enabled: false
	            },
	            exporting: {
	                enabled: false
	            },
	            series: [{
	                name: 'Random data',
	                data: (function () {
	                    // generate an array of random data
	                    var data = [],
	                        time = (new Date()).getTime(),
	                        i;
						//i的值为x轴刻度数，每过完一个整循环，刻度往左移
	                    for (i = -15; i <= 0; i += 1) {
	                        data.push({
	                            x: time,
	                            y: 0
	                        });
	                    }
	                    return data;
	                }())
	            }]
	        });
	    });
	});
</script>
</html>