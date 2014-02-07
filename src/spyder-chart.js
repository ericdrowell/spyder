(function() {
  var container = document.getElementById('spyder-chart');

  function addBar(key) {
    var obj = Spyder.data[key],
        bar = document.createElement('div'),
        start = obj.start,
        stop = obj.stop,
        diff = stop - start,
        type = obj.type || '';

    bar.className = type + ' bar';
    bar.style.marginLeft = obj.start + 'px';
    bar.style.width = diff + 'px';
    bar.setAttribute('data-id', key);
    container.appendChild(bar);
  }

  function addTag(key) {
    var obj = Spyder.data[key],
        bar = document.createElement('div'),
        start = obj.start,
        type = obj.type || '';

    bar.className = type + ' tag';
    bar.style.marginLeft = obj.start + 'px';
    bar.setAttribute('data-id', key);
    container.appendChild(bar);
  }

  Spyder.chart = function() {
    var data = this.data,
        obj, key;

    for (key in data) {
      obj = data[key];
      if (obj.type === 'tag') {
        addTag(key);
      }
      else {
        addBar(key);
      }
    }

  };
})();