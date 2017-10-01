function App() {
  var d = [];
  var audioElement = document.getElementById('audioElement');
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var analyser = audioCtx.createAnalyser();

  var file = 'second-demo.mp3';
  var playing = false;
  var canvasWidth = document.body.clientWidth;
  audioElement.volume = .1;

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

  audioElement.addEventListener('playing', function () {
    playing = true;
  });
  audioElement.addEventListener('pause', function () {
    playing = false;
  });
  audioElement.addEventListener('ended', function () {
    playing = false;
  });

  window.onresize = function () {
    canvasWidth = document.body.clientWidth;
    drawCanvasWidth();
  };

  this.loadSound = function () {
    var request = new XMLHttpRequest();
    request.open('GET', file, true);
    request.onprogress = function (evt) {
      var percent = Math.floor((evt.loaded / evt.total) * 100);
      var loading = document.getElementsByClassName('loading')[0];
      loading.innerHTML = 'loading... ' + percent + ' %';

      if (percent == 100) {
        loading.remove();
      }
    }
    request.onload = function () {
      audioElement.src = file;
      audioElement.load();
    }
    request.send();
  }

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
    ctx.beginPath();
    ctx.arc(left, height, 5, 0,2*Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }

  function drawWave() {
    if (playing) {
      analyser.getByteFrequencyData(frequencyData)

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var width = 5;
      for (var j = 0; j < canvas.width; j++) {
        var left = (width +10 ) * j;
        var topByte = (frequencyData[j]);

        var y = (topByte);

        if ((y > 80) && (y < 200)) {
          drawBar(left, y + y, width, y+25, '#d2f3ff');
        }

        if ((y > 55) && (y <= 80)) {
          drawBar(left, y + y, width, +80, '#275cf4');
        }

        if ((y > 50) && (y <= 55)) {
          drawBar(left, y + y, width, +60, '#4e75c2');
        }

        if ((y > 45) && (y <= 50)) {
          drawBar(left, y + y, width, +40, '#edfef6');
        }


        if ((y > 10) && (y <= 45)) {
          drawBar(left, y + y, width, 20, '#275cf4');
        }

        drawBar(left, 0, width, y - 50, '#cd0126');
      }
    }

    setTimeout(function () {
      requestAnimationFrame(drawWave);
    }, 30);
  }

  drawWave();
}

document.addEventListener('DOMContentLoaded', function () {
  var app = new App();
  app.loadSound();
})
