let Spyder = {};

(function() {
  function time(t?: number): number {
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
    start: function(id: string, type?: string): void {
      const timings = this.data.timings;

      if (!timings[id]) {
        timings[id] = {
          start: time()
        };

        if (type) {
          timings[id].type = type;
        }
      }
    },
    stop: function(id: string, type?: string): void {
      this.data.timings[id].stop = time();
    },
    range: function(id: string, start: number, stop: number, type?: string): void {
      const timings = this.data.timings;

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
    func: function(id: string, func: Function): Function {
      const that = this;
      this.start(id, 'func');
      return function() {
        const ret = func.apply(this, arguments);  
        that.stop(id);
        return ret;
      };
    },
    tag: function(id: string, t: number): void {
      const timings = this.data.timings;

      if (!timings[id]) {
        timings[id] = {
          start: time(t)
        };
      }
    },

    image: function(id: string, url: string): void {
      const that = this;
      const img = new Image();

      this.start(id, 'image');

      img.onload = function() {
        that.stop(id);
      };
      img.src = url; 
    }
  };
})();