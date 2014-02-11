var Spyder = {};

(function() {
  function time(t) {
    if (t === undefined) {
      t = new Date().getTime();
    }
    return t - Spyder.PAGE_START_TIME;
  }

  Spyder = {
    PAGE_START_TIME: new Date().getTime(),

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
        func.apply(this, arguments);  
        that.stop(id);
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

    image: function(url) {
      var that = this,
          img = new Image();

      this.start(url, 'image');

      img.onload = function() {
        that.stop(url);
      };
      img.src = url; 
    }
  };
})();