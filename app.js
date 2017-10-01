class App {
  constructor() {
    var d = [];
    var audioElement = document.getElementById('audioElement');
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = audioCtx.createAnalyser();

    var file = 'demo.mp3';
    var playing = false;
    var canvasWidth = document.body.clientWidth;
    audioElement.volume = .1;

    audioElement.addEventListener('playing', function () {
      playing = true;
    });
    audioElement.addEventListener('pause', function () {
      playing = false;
    });
    audioElement.addEventListener('ended', function () {
      playing = true;
    });

    var request = new XMLHttpRequest();
    request.open('GET', file, true);
    request.onprogress = function (evt) {
      var percent = Math.floor((evt.loaded / evt.total) * 100);
      var loading = document.getElementsByClassName('loading')[0];
      loading.innerHTML = 'loading... ' + percent + ' %';

      if(percent==100) {
        loading.remove();
      }
    }
    request.onload = function () {
      audioElement.src = file;
      audioElement.load();
    }
    request.send();

    window.onresize = function () {
      canvasWidth = document.body.clientWidth;
      drawCanvasWidth();
    };

    function nearestPow2(aSize) {
      return Math.pow(2, Math.round(Math.log(aSize) / Math.log(2)));
    }

    var source = audioCtx.createMediaElementSource(audioElement);
    source.connect(analyser);
    source.connect(audioCtx.destination);
    var bufferLength = analyser.frequencyBinCount;
    var frequencyData = new Uint8Array(bufferLength);
    var frequencyDataFloat = new Float32Array(bufferLength);
    analyser.smoothingTimeConstant = .5;

    var canvas = document.getElementById('wave');
    drawCanvasWidth();
    drawCanvasHeight();

    var ctx = canvas.getContext('2d');
    ctx.lineWidth = 1;

    function drawCanvasWidth() {
      canvas.style.width = (document.getElementsByTagName('section')[0].getBoundingClientRect().width - 100) + 'px';
      canvas.width = parseInt(canvas.style.width);
    }

    function drawCanvasHeight() {
      canvas.style.height = '200px';
      canvas.height = parseInt(canvas.style.height);
    }

    function drawBar(left, top, width, height, color) {
      ctx.fillStyle = color;
      ctx.fillRect(left, top, width, height);
    }

    function drawWave() {
      if (playing) {
        analyser.getByteFrequencyData(frequencyData)

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var width = 5;
        var h = 0;
        for (var j = 0; j < canvas.width; j++) {
          var w = width;
          var left = (w + 1) * j;
          var topByte = (frequencyData[j]);

          var y = (topByte);

          if ((y > 80) && (y < 200)) {
            drawBar(left, y + y, width, +5, '#d2f3ff');
          }

          if ((y > 55) && (y < 80)) {
            drawBar(left, y + y, width, +5, '#275cf4');
          }

          if ((y > 50) && (y < 55)) {
            drawBar(left, y + y, width, +5, '#4e75c2');
          }

          if ((y > 45) && (y < 50)) {
            drawBar(left, y + y, width, +5, '#edfef6');
          }

          drawBar(left, 0, width, y, '#cd0126');

          drawBar(left, 0, width, y - 50, '#860018');
        }
      }

      setTimeout(function () {
        requestAnimationFrame(drawWave);
      }, 30);
    }

    drawWave();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  window.app = new App();
})
