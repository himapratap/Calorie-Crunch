document.querySelector('#button1').onclick = function() {

    function on() {
        var audio = document.getElementById("on");
        audio.play();
    }


    function off() {
        var audio = document.getElementById("off");
        audio.play();
    }


    fetch('/api/speech-to-text/token')
        .then(function(response) {
            return response.text();
        }).then(function(token) {

            on()
            $(".wrapper.style1 .icon.major").css("border", "#00ffcc solid 1.5px");
            var stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
                token: token,
                outputElement: '#item'
            });

            stream.on('error', function(err) {
                console.log(err);
            });

            document.querySelector('#stop1').onclick = function() {
                stream.stop();
                off()
                $(".wrapper.style1 .icon.major").css("border", "#1d9c91 solid 1.5px");
            };

        }).catch(function(error) {
            console.log(error);
        });
};
