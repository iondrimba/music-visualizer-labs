function Demo(file, selector) {
  this.file = file;
  this.init = function (audioElement, canvasDraw) {
    this.audioElement = audioElement;
    this.canvasDraw = canvasDraw;

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = audioCtx.createAnalyser();

    this.loader = new Loader();
    this.loader.callback = this.onProgress.bind(this);
    this.loader.complete = this.complete.bind(this);

    this.btnPlay = document.querySelector(selector).querySelector('.play');
    this.btnPause = document.querySelector(selector).querySelector('.pause');

    this.btnPlay.addEventListener('click', function () {
      this.audioElement.play();
    }.bind(this));

    this.btnPause.addEventListener('click', function () {
      this.audioElement.pause();
    }.bind(this));

    this.file = file;
    this.playing = false;

    var source = audioCtx.createMediaElementSource(audioElement);
    source.connect(this.analyser);
    source.connect(audioCtx.destination);
    var bufferLength = this.analyser.frequencyBinCount;
    this.frequencyData = new Uint8Array(bufferLength);
    this.analyser.smoothingTimeConstant = .5;
    audioElement.volume = .5;

    audioElement.addEventListener('playing', function () {
      this.playing = true;
    }.bind(this));
    audioElement.addEventListener('pause', function () {
      this.playing = false;
    }.bind(this));
    audioElement.addEventListener('ended', function () {
      this.playing = true;
    }.bind(this));
  }

  this.resize = function () {
    this.canvasDraw.resize();
  }

  this.drawWave = function () {
    this.canvasDraw.draw.render({ canvas: this.canvasDraw.canvas, ctx: this.canvasDraw.ctx, analyser: this.analyser, frequencyData: this.frequencyData });

    requestAnimationFrame(this.drawWave.bind(this));
  }

  this.onProgress = function (percent) {
    console.log(percent);
  }

  this.complete = function (file) {
    this.audioElement.src = file;
    this.audioElement.load();

    this.drawWave();
  }

  this.loadSound = function () {
    this.loader.load(this.file);
  }
}