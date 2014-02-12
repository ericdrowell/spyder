var Spyder = {};

(function() {
  function time(t) {
    if (!t) {
      t = new Date().getTime();
    }
    return t - SPYDER_PAGE_START_TIME;
  }

  Spyder = {
    data: {
      timings: {},
      dom: {}
    },
    start: function(id, type) {
      var timings = this.data.timings;

      if (!timings[id]) {
        timings[id] = {
          start: time()
        };

        if (type) {
          timings[id].type = type;
        }
      }
    },
    stop: function(id, type) {
      this.data.timings[id].stop = time();
    },
    range: function(id, start, stop, type) {
      var timings = this.data.timings;

      if (!timings[id]) {
        timings[id] = {
          start: time(start),
          stop: time(stop)
        };

        if (type) {
          timings[id].type = type;
        }
      }
    },
    func: function(id, func) {
      var that = this;
      this.start(id, 'func');
      return function() {
        var ret = func.apply(this, arguments);  
        that.stop(id);
        return ret;
      };
    },
    tag: function(id, t) {
      var timings = this.data.timings;

      if (!timings[id]) {
        timings[id] = {
          start: time(t)
        };
      }
    },

    image: function(id, url) {
      var that = this,
          img = new Image();

      this.start(id, 'image');

      img.onload = function() {
        that.stop(id);
      };
      img.src = url; 
    }
  };
})();