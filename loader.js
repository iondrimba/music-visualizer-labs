function Loader() {
  this.callback = null;
  this.load = function (file) {
    var request = new XMLHttpRequest();
    request.open('GET', file, true);
    request.onprogress = function (evt) {
      var percent = Math.floor((evt.loaded / evt.total) * 100);

      this.callback(percent);
    }.bind(this);

    request.onload = function () {
      this.complete(file);
    }.bind(this);
    
    request.send();
  }

  this.progress = function (callback) {
    this.callback = callback;
  }

  this.complete = function () {}
}

