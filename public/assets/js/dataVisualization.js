$(document).ready(function() {


    //****************************************************
    //Progress Bar

    let caloriesPerDay = $(".caloriesPerDay").html();

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
        svgStyle: {
            width: '100%',
            height: '100%'
        },

        from: {
            color: '#00ffcc'
        },
        to: {
            color: '#00ffcc'
        },
        step: (state, bar) => {
            bar.path.setAttribute('stroke', state.color);

        }
    });


    bar.animate(caloriesPerDay/caloriesRequired);  // Number from 0.0 to 1.0"

    //****************************************************

    //****************************************************
    // Graph
    $("#history").click(function() {
        var days = $("#daysInAWeek").data('days-data');
        var xDays = days.split(",");
        console.log(xDays);

        var cals = $("#calsInAWeek").data('cals-data');
        var calsEatenStringArr = cals.split(",");
        var calsEatenArr = calsEatenStringArr.map(function(x) {
            return parseInt(x, 10);
        });

        var calRequired = [];
        calsEatenArr.map(x => calRequired.push(parseInt(caloriesRequired)))
        console.log(`calRequired ${calRequired}}`);
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
                color: '#ffffff',
            },
            xAxis: {
                categories: xDays,
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
                data: calsEatenArr,
                color: '#21b2a6',
            }, {
                type: 'spline',
                name: 'Target Calorie',
                data: calRequired,
                color: '#ed4933',
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[3],
                    fillColor: 'white'
                }

             }]
        });

    })


});
