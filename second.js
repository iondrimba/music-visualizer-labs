function SecondDrawer() {

  function drawBar(ctx, left, top, width, height, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(left, height, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }

  this.render = function (props) {
    props.analyser.getByteFrequencyData(props.frequencyData)

    props.ctx.clearRect(0, 0, props.canvas.width, props.canvas.height);
    var width = 5;
    for (var j = 0; j < props.canvas.width; j++) {
      var left = (width + 10) * j;
      var topByte = (props.frequencyData[j]);

      var y = (topByte);

      if ((y > 80) && (y < 200)) {
        drawBar(props.ctx, left, y + y, width, y + 25, '#8dd835');
      }

      if ((y > 55) && (y <= 80)) {
        drawBar(props.ctx, left, y + y, width, +80, '#d5881a');
      }

      if ((y > 50) && (y <= 55)) {
        drawBar(props.ctx, left, y + y, width, +60, '#d24742');
      }

      if ((y > 45) && (y <= 50)) {
        drawBar(props.ctx, left, y + y, width, +40, '#f3161b');
      }


      if ((y > 10) && (y <= 45)) {
        drawBar(props.ctx, left, y + y, width, 20, '#cff670');
      }

      drawBar(props.ctx, left, 0, width, y - 50, '#fff');
    }
  }.bind(this);
}