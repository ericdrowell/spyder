(function() {
  Spyder.chart = {
    init: function() {
      var data = Spyder.data,
          obj, key;

      this.dataArr = [];
          
      this.container = document.getElementById('spyder-chart');
      this.wrapper = document.createElement('div');
      this.wrapper.className = 'wrapper';
      this.container.appendChild(this.wrapper);

      // create array of data points
      for (key in data) {
        obj = data[key];
        obj.id = key;
        this.dataArr.push(obj);
      }

      // put data points in order by start times
      this.dataArr.sort(function(a,b) {
        if (a.start < b.start)
           return -1;
        if (a.start > b.start)
          return 1;
        return 0;
      });

      this.minStart = this.dataArr[0].start;
      this.drawChart();
      this.bind();
    },
    bind: function() {
      $(this.wrapper).on('mouseover', function(evt) {
        var $target = $(evt.target), 
            str = '';

        if ($target.hasClass('range')) {
          str = 'RANGE: ' + $target.data('id') + ': ' + $target.data('diff') + 'ms';
          console.log(str);
        }
        if ($target.hasClass('tag')) {
          str = 'TAG: ' + $target.data('id') + ': @' + $target.data('start') + 'ms';
          console.log(str);
        }
      });
    },
    drawChart: function() {
      var dataArr = this.dataArr,
          len = dataArr.length,
          n, obj;

      for (n=0; n<len; n++) {
        obj = dataArr[n];
        if (obj.stop) {
          this.addRange(obj);
        }
        else {
          this.addTag(obj);
        }

      }
    },
    addTag: function(obj) {
      var bar = document.createElement('div'),
          id = obj.id,
          start = obj.start,
          type = obj.type;

      bar.className = 'tag';
      bar.style.marginLeft = parseInt(start - this.minStart) + 'px';
      bar.setAttribute('data-id', id);
      bar.setAttribute('data-start', start);
      bar.setAttribute('data-type', type);
      this.wrapper.appendChild(bar);
    },
    addRange: function(obj) {
      var bar = document.createElement('div'),
          id = obj.id,
          start = obj.start,
          stop = obj.stop,
          diff = stop - start,
          type = obj.type || '';

      bar.className = type + ' range';
      bar.style.marginLeft = parseInt(start - this.minStart) + 'px';
      bar.style.width = diff + 'px';
      bar.setAttribute('data-id', id);
      bar.setAttribute('data-start', start);
      bar.setAttribute('data-stop', stop);
      bar.setAttribute('data-type', type);
      bar.setAttribute('data-diff', diff);
      this.wrapper.appendChild(bar);
    }
  };
})();