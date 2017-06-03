//****************************************************
//Progress Bar


    let totalCals = $("#totalCalories").val();
    let bar = new ProgressBar.Line(progressBar, {
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: 1500,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: {width: '100%', height: '100%'},

        from: {color: '#FF8C00'},
        to: {color: '#228B22'},
        step: (state, bar) => {
            bar.path.setAttribute('stroke', state.color);

        }
    });

    bar.animate(12/14);  // Number from 0.0 to 1.0"

//****************************************************
// Date
    currentDate =  new Date();
    year = currentDate.getFullYear();
    month = currentDate.getMonth() + 1;
    date = currentDate.getDate();
    day =currentDate.getDay();

    var weekday=new Array(7);
    weekday[0]="Sunday";
    weekday[1]="Monday";
    weekday[2]="Tuesday";
    weekday[3]="Wednesday";
    weekday[4]="Thursday";
    weekday[5]="Friday";
    weekday[6]="Saturday";

    var dayofweek=weekday[day];


    document.getElementById("currentDate").innerHTML = dayofweek+" "+ month + "/" + date + "/" +year;


//****************************************************
// Graph

Highcharts.chart('graphy', {
    chart: {
        backgroundColor: '#505393',
        polar: true,
        type: 'line',
        width: 800,


    },
    title: {
        text: '7 Day Calorie History',
        style: {
            color: '#ffffff',
            font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
        }

    },
    xAxis: {
        categories: ['-6 days', '-5', '-4', '-3','-2','-1' ,'Current'],
        color:'#ffffff',
        labels: {
            style: {
                color: '#ffffff',
                font: '11px Trebuchet MS, Verdana, sans-serif'
            }
        },
        title: {

            style: {
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '12px',
                fontFamily: 'Trebuchet MS, Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        text: 'Calories',
        labels: {
            style: {
                color: '#ffffff',
                font: '11px Trebuchet MS, Verdana, sans-serif'
            }
        },
        title: {
            style: {
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '12px',
                fontFamily: 'Trebuchet MS, Verdana, sans-serif'
            }
        }
    },
    labels: {

    },

    series: [{

        type: 'column',
        name: 'Calories Eaten',
        data: [1400, 1419, 1650, 1419, 1500, 1419, 1300],
        color:'#21b2a6',
    }, {
        type: 'spline',
        name: 'Target Calories',
        data: [1419, 1419, 1419,1419, 1419, 1419, 1319],
        color:'#ed4933',
        marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: 'white'
        }

    }]
});