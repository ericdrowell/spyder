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

#### Accessing Spyder Data

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

#### Simple Timer

    Spyder.start('expensive-operation');
    // expensive JavaScript goes here
    Spyder.stop('expensive-operation');

#### Functions

let's say you have a function like this:

    var foo = function() {
      // expensive stuff goes here
    };
    
You can wrap the function with Spyder to capture its performance like this:

    var foo = Spyder.func(function() {
      // expensive stuff goes here
    };
    
#### Images

To measure the loading time of an individual image in your HTML, you can do this:

    <img src="some-image.jpg"/>
    <script>Spyder.image('some-image.jpg');</script>
    
#### HTML rendering performance

To measure the time it takes for the browser to churn through a lot of HTML, you can do this:

    <script>Spyder.start('page-feed');</script>
    <!-- tons and tons of HTML go here -->
    <script>Spyder.stop('page-feed');</script>
    
#### Waterfall Chart

To render a water fall chart right in the browser, you can create a spyder-chart container, and include spyder-chart.js at the bottom of your page.  You can use the default styling found in spyder-chart.css, or you can create your own.

    <link rel="stylesheet" type="text/css" href="spyder-chart.css"></link>
    <script src="spyder.js"></script>
    
    <div id="spyder-chart"></div>
    
    <script src="spyder-chart.js"></script>

    

