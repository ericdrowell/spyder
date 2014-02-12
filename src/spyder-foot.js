/* NOTE: spyder-foot requires jQuery */

$(function() {
  Spyder.tag('dom-ready');
});

$(window).load(function() {
  Spyder.addPerfTimingTag = function() {
    var pt = performance && performance.timing,
        key = arguments[0],
        start = pt && pt[arguments[1]];

    if (start) {
      Spyder.tag(key, start);
    }
  };

  Spyder.addPerfTimingRange = function() {
    var pt = performance && performance.timing,
        key = arguments[0],
        start = pt && pt[arguments[1]];
        end = pt && pt[arguments[2]];

    if (start && end) {
      Spyder.range(key, start, end);
    }
  };

  Spyder.addDomCounts = function(arr) {
    var length = arr.length,
        n=0, el;

    for (n=0; n<arr.length; n++) {
      el = arr[n];
      Spyder.data.dom[el] = $(el).length;
    }
    return arr;
  }

  // performance timing metrics  
  Spyder.addPerfTimingTag  ('navigation-start', 'navigationStart');
  Spyder.addPerfTimingRange('redirect', 'redirectStart', 'redirectEnd');
  Spyder.addPerfTimingRange('domain-lookup', 'domainLookupStart', 'domainLookupEnd');
  Spyder.addPerfTimingRange('connect', 'connectStart', 'connectEnd');
  Spyder.addPerfTimingRange('secure-connection', 'connectEnd', 'secureConnectionStart');
  Spyder.addPerfTimingRange('server-response', 'requestStart', 'responseEnd');

  // page start and page load
  Spyder.tag('page-start', SPYDER_PAGE_START_TIME);
  Spyder.tag('page-load');

  // dom counts
  Spyder.addDomCounts(['div', 'span', 'a', 'p', 'button', 'img', 'script', 'link', 'h1', 'h2', 'h3', 'h4']);
  Spyder.data.dom.all = $('*').length;

  // output data to console
  console.log(Spyder.data);
  console.log(JSON.stringify(Spyder.data));



  // output data to chart
  if (Spyder.chart) {
    Spyder.chart.init();
  }
});