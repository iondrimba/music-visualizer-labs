function App() {

  this.init = function () {
    var firstCanvas = new CanvasDraw(new FirstDrawer());
    firstCanvas.init('#first-wave');

    var firstAudio = document.getElementById('first');
    var firstDemo = new Demo('https://iondrimbafilho.me/demo.mp3', '.first-demo');
    firstDemo.init(firstAudio, firstCanvas);
    firstDemo.loadSound();

    var secondCanvas = new CanvasDraw(new SecondDrawer());
    secondCanvas.init('#second-wave');

    var secondAudio = document.getElementById('second');
    var secondDemo = new Demo('https://iondrimbafilho.me/second-demo.mp3', '.second-demo');
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
