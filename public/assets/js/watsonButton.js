document.querySelector('#button').onclick = function() {
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
            $(".wrapper.style3 .icon.major").css("border", "#00ffcc solid 1.5px");
            var stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
                token: token,
                outputElement: '#item'
            });

            stream.on('error', function(err) {
                console.log(err);
            });

            document.querySelector('#stop').onclick = function() {
                stream.stop();
                off()
                $(".wrapper.style3 .icon.major").css("border", "#43467c solid 1.5px");
            };

        }).catch(function(error) {
            console.log(error);
        });
};
