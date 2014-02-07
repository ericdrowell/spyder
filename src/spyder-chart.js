(function() {
  var container, wrapper;

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
    bar.setAttribute('data-start', start);
    bar.setAttribute('data-stop', stop);
    bar.setAttribute('data-type', type);
    bar.setAttribute('data-diff', diff);
    wrapper.appendChild(bar);
  }

  function addTag(key) {
    var obj = Spyder.data[key],
        bar = document.createElement('div'),
        start = obj.start,
        className = key === 'dom-ready' || key === 'page-load' ? 'tag page' : 'tag';

    bar.className = className;
    bar.style.marginLeft = obj.start + 'px';
    bar.setAttribute('data-id', key);
    bar.setAttribute('data-start', start);
    bar.setAttribute('data-type', 'tag');
    wrapper.appendChild(bar);
  }

  Spyder.chart = function() {
    var data = this.data,
        obj, key;
        
    container = document.getElementById('spyder-chart');
    wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    container.appendChild(wrapper);

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