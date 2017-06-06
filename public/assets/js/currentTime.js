// Moment JS Current Time

function update() {
    $('#clock').html(moment().format("dddd MMMM Do YYYY, h:mm:ss a"));
}
setInterval(update, 1000);
