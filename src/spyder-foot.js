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

  // performance timing metrics  
  Spyder.addPerfTimingTag  ('navigation-start', 'navigationStart');
  Spyder.addPerfTimingRange('redirect', 'redirectStart', 'redirectEnd');
  Spyder.addPerfTimingRange('domain-lookup', 'domainLookupStart', 'domainLookupEnd');
  Spyder.addPerfTimingRange('connect', 'connectStart', 'connectEnd');
  Spyder.addPerfTimingRange('secure-connection', 'connectEnd', 'secureConnectionStart');
  Spyder.addPerfTimingRange('request', 'requestStart', 'responseEnd');

  Spyder.tag('page-start', Spyder.PAGE_START_TIME);
  Spyder.tag('page-load');

  // output data to console
  console.log(Spyder.data);

  // output data to chart
  if (Spyder.chart) {
    Spyder.chart();
  }
});