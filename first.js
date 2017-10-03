function FirstDrawer() {

  function drawBar(ctx, left, top, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(left, top, width, height);
  }

  this.render = function (props) {
    props.analyser.getByteFrequencyData(props.frequencyData);

    props.ctx.clearRect(0, 0, props.canvas.width, props.canvas.height);
    var width = 5;
    for (var j = 0; j < props.canvas.width; j++) {
      var left = (width + 1) * j;
      var topByte = (props.frequencyData[j]);

      var y = (topByte);

      if ((y > 80) && (y < 200)) {
        drawBar(props.ctx, left, y + y, width, +5, '#d2f3ff');
      }

      if ((y > 55) && (y < 80)) {
        drawBar(props.ctx, left, y + y, width, +5, '#275cf4');
      }

      if ((y > 50) && (y < 55)) {
        drawBar(props.ctx, left, y + y, width, +5, '#4e75c2');
      }

      if ((y > 45) && (y < 50)) {
        drawBar(props.ctx, left, y + y, width, +5, '#edfef6');
      }

      drawBar(props.ctx, left, 0, width, y, '#cd0126');

      drawBar(props.ctx, left, 0, width, y - 50, '#860018');
    }
  }.bind(this);
}