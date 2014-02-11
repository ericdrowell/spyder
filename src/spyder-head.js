var Spyder = {};

(function() {
  function time(t) {
    if (t === undefined) {
      t = new Date().getTime();
    }
    return t - SPYDER_PAGE_START_TIME;
  }

  Spyder = {
    data: {},
    start: function(id, type) {
      var data = this.data;

      if (!data[id]) {
        data[id] = {
          start: time()
        };

        if (type) {
          data[id].type = type;
        }
      }
    },
    stop: function(id, type) {
      this.data[id].stop = time();
    },
    range: function(id, start, stop, type) {
      var data = this.data;

      if (!data[id]) {
        data[id] = {
          start: time(start),
          stop: time(stop)
        };

        if (type) {
          data[id].type = type;
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
      var data = this.data;

      if (!data[id]) {
        data[id] = {
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