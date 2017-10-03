function CanvasDraw(drawer) {

  this.draw = drawer;

  function drawCanvasWidth(canvas) {
    canvas.style.width = document.body.clientWidth + 'px';
    canvas.width = parseInt(canvas.style.width);
  }

  function drawCanvasHeight(canvas) {
    var style = window.getComputedStyle(canvas);
    var height = style.getPropertyValue('height');
    canvas.height = parseInt(height);
  }

  this.init = function (selector) {
    this.canvas = document.querySelector(selector);
    drawCanvasWidth(this.canvas);
    drawCanvasHeight(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = 1;
  }.bind(this)

  this.resize = function () {
    drawCanvasWidth(this.canvas);
  }
}