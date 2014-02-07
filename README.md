Spyder
======

Spyder is a front end performance framework that makes webpage performance analysis a piece of cake.  Spyder allows you to capture:

* dom ready time
* page load time
* static asset loading latencies
* individual image loading times
* HTML rendering performance
* tagged points in time, such as the moment that your webpage is fully visible above the fold
* JS execution performance
* and more

Once you're setup, you can use the Spyder chart plugin to visualize the performance data right in your browser, or you can serialize the data and send it off to a server for analysis and aggregation.

### Examples

#### Accessing Spyder data

    var data = Spyder.data;
  
and the data structure looks like this:

    {
      'dom-ready': {
        start: 300,
        type: 'tag'
      },
      'page-load': {
        start: 600,
        type: 'tag'
      },
      'page-visible-above-fold': {
        start: 210,
        type: 'tag'
      },
      'jquery.min.js': {
        start: 5,
        end: 180,
        type: 'js'
      },
      'graphics-function': {
        start: 300,
        end: 380,
        type: 'func'
      }
    };



