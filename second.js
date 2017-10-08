function SecondDrawer() {

  function drawBar(ctx, left, top, width, height, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(left, height, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }

  this.render = function (props) {
    if (props.playing) {
      props.analyser.getByteFrequencyData(props.frequencyData)

      props.ctx.clearRect(0, 0, props.canvas.width, props.canvas.height);
      var width = 5;
      for (var j = 0; j < props.canvas.width; j++) {
        var left = (width + 10) * j;
        var topByte = (props.frequencyData[j]);

        var y = (topByte);

        if ((y > 80) && (y < 200)) {
          drawBar(props.ctx, left, y + y, width, y + 25, '#fc00ff');
        }

        if ((y > 0)) {
          drawBar(props.ctx, left, 0, width, y, '#fff');
        }

        drawBar(props.ctx, left, 0, width, y + 100, '#00dbde');
      }
    }
  }.bind(this);
}