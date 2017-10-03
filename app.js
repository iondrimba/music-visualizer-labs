function App() {

  this.init = function () {
    var firstCanvas = new CanvasDraw(new FirstDrawer());
    var firstAudio = document.getElementById('first');
    var firstDemo = new Demo('demo.mp3', '.first-demo');

    firstCanvas.init('#first-wave');
    firstDemo.init(firstAudio, firstCanvas);
    firstDemo.loadSound();

    var secondCanvas = new CanvasDraw(new SecondDrawer());
    var secondAudio = document.getElementById('second');
    var secondDemo = new Demo('second-demo.mp3', '.second-demo');

    secondCanvas.init('#second-wave');
    secondDemo.init(secondAudio, secondCanvas);
    secondDemo.loadSound();

    window.onresize = function () {
      firstDemo.resize();
      secondDemo.resize();
    };
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var app = new App();
  app.init();
})
