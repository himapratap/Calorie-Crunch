
$(document).ready(function() {


    //****************************************************
    //Progress Bar
    
    let caloriesPerDay = $(".caloriesPerDay ").html();
    let caloriesRequired = $("#caloriesRequired").text();
    console.log(caloriesRequired)
    console.log(caloriesPerDay)
    let bar = new ProgressBar.Line(progressBar, {
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: 1500,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: {width: '100%', height: '100%'},

        from: {color: '#00ffcc'},
        to: {color: '#00ffcc'},
        step: (state, bar) => {
            bar.path.setAttribute('stroke', state.color);

        }
    });

    bar.animate(caloriesPerDay/caloriesRequired);  // Number from 0.0 to 1.0"

    //****************************************************

    //****************************************************
    // Graph

    Highcharts.chart('graphy', {
        chart: {
            backgroundColor: '#505393',
            polar: true,
            type: 'line',
            // width: 500,
            style: {
                fontFamily: "Open Sans",
            },

        },
        title: {
            text: "",
            color:'#ffffff',
        },
        xAxis: {
            categories: ['-6 days', '-5', '-4', '-3','-2','-1' ,'Current'],
            labels: {
                style: {
                    color: "#ffffff",
                    font: "Open Sans"
                }
            },
            title: {
                style: {
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: "bold",
                    fontFamily: "Open Sans"
                }
            }
        },
        yAxis: {
            labels: {
                style: {
                    color: "#ffffff",
                    font: "fontAwesome"
                }
            },
            title: {
                text: "Calories",
                style: {
                    color: "#ffffff",
                    fontSize: "12px",
                    // fontWeight: "bold",
                    fontFamily: "Open Sans"
                }
            }
        },
        labels: {

        },
        series: [{

            type: 'column',
            name: 'Calories Eaten',
            data: [1400, 1419, 1650, 1419, 1500, 1419, parseInt(caloriesPerDay)],
            color:'#21b2a6',
        }, {
            type: 'spline',
            name: 'Target Calorie',
            data: [parseInt(caloriesRequired), parseInt(caloriesRequired), parseInt(caloriesRequired),parseInt(caloriesRequired), parseInt(caloriesRequired), parseInt(caloriesRequired), parseInt(caloriesRequired)],
            color:'#ed4933',
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            }

        }]
    });

});