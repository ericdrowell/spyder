var Fastly = {};

(function() {
  var PAGE_START_TIME = new Date().getTime();

  function time() {
    return new Date().getTime() - PAGE_START_TIME;
  }

  Fastly = {
    data: {},
    func: function(id, func) {
      Fastly.start(id, 'func');
      return function() {
        func.apply(this, arguments);  
        Fastly.stop(id);
      };
    },
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

    tag: function(id) {
      var data = this.data;

      if (!data[id]) {
        data[id] = {
          start: time(),
          type: 'tag'
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

  // automatic timings
  contentLoaded(window, function() {
    Fastly.tag('dom-ready');
  });

  ready(function() {
    Fastly.tag('page-load');

    if (Fastly.chart) {
      Fastly.chart();
    }
  });


})();

/*============================ LIB ============================*/

// jquery ready function for page load
function ready(fn) {
  if (document.readyState == "complete")
      return fn();

  if (window.addEventListener)
      window.addEventListener("load", fn, false);
  else if (window.attachEvent)
      window.attachEvent("onload", fn);
  else
      window.onload = fn;
}

/*!
 * contentloaded.js
 *
 * Author: Diego Perini (diego.perini at gmail.com)
 * Summary: cross-browser wrapper for DOMContentLoaded
 * Updated: 20101020
 * License: MIT
 * Version: 1.2
 *
 * URL:
 * http://javascript.nwbox.com/ContentLoaded/
 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
 *
 */

// @win window reference
// @fn function reference
function contentLoaded(win, fn) {

  var done = false, top = true,

  doc = win.document, root = doc.documentElement,

  add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
  rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
  pre = doc.addEventListener ? '' : 'on',

  init = function(e) {
    if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
    (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
    if (!done && (done = true)) fn.call(win, e.type || e);
  },

  poll = function() {
    try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
    init('poll');
  };

  if (doc.readyState == 'complete') fn.call(win, 'lazy');
  else {
    if (doc.createEventObject && root.doScroll) {
      try { top = !win.frameElement; } catch(e) { }
      if (top) poll();
    }
    doc[add](pre + 'DOMContentLoaded', init, false);
    doc[add](pre + 'readystatechange', init, false);
    win[add](pre + 'load', init, false);
  }

}