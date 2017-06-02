let totalCalories = $("#totalCalories").val();
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

bar.animate(1.0);  // Number from 0.0 to 1.0"
