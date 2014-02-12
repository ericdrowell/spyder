Spyder
======

Spyder is a front end performance framework that makes webpage performance analysis a piece of cake.  Spyder allows you to capture:

* navigation start time
* redirect timings
* domain lookup time
* server connection time
* secure connection time
* server response time
* page start time
* dom ready time
* page load time
* static asset loading latencies
* individual image loading times
* HTML rendering times
* tagged points in time, such as the moment that your webpage is fully visible above the fold
* JS execution performance
* iframe load times
* ad performance
* and more

Once you're setup, you can use the Spyder chart plugin to visualize the performance data right in your browser, or you can serialize the data and send it off to a server for analysis and aggregation.

### Examples

you can see a list of live examples here:

http://spyderjs.com/project/examples

You can go straight to the chart example here:

http://spyderjs.com/project/examples/chart.html

### Docs

#### Including Spyder in your page

to capture performance metrics with spyder, your page should look something like this:

    <!DOCTYPE html>
    <html>
      <head>
        <script>var SPYDER_PAGE_START_TIME = new Date().getTime();</script>
        <script src="spyder-head.js"></script>
        
        <!-- include css files -->
      </head>
      <body>
        <!-- do lots of cool stuff here-->
    
        <script src="../lib/jquery-1.11.0.min.js"></script>
        
        <!-- add other external JS files here as well -->
        
        <script src="spyder-foot.js"></script>
      </body>
    </html>
    
Note that there's two parts to Spyder: spyder-head.js and spyder-foot.js.  spyer-head.js contains the bare minimum JavaScript needed to capture metrics.  spyder-foot.js includes everything else that's needed.  Spyder is split up this way in order to keep the JS in the head as light as possible.  I would in fact recommend that spyder-head.js be the only JavaScript file in the head of your document.  It's standard practice, for performance reasons, to include external JS at the bottom of your page.

Also notice that Spyder currently depends on jQuery.  This is because I plan to capture other metrics related to the DOM tree, which jQuery would be great for.  It also provides a cross browser dom ready and page load event.  These things could be written from scratch, but for my use case (my personal websites, and also linkedin.com), jQuery is already available in the page.  If there's enough demand to ditch the jQuery dependency, I would be more than happy to create a jQuery compatible version of Spyder, along with a version of Spyder that has no dependencies at all.
    
To capture performance metrics and render a nifty waterfall chart, do this:

    <!DOCTYPE html>
    <html>
      <head>
        <script>var SPYDER_PAGE_START_TIME = new Date().getTime();</script>
        <script src="spyder-head.js"></script>
        
        <link rel="stylesheet" type="text/css" href="spyder-chart.css"></link>
        
        <!-- include css files -->
      </head>
      <body>
        <!-- do lots of cool stuff here-->
        
        <div id="spyder-chart"></div>
    
        <script src="../lib/jquery-1.11.0.min.js"></script>
        
        <!-- add other external JS files here as well -->
        
        <script src="spyder-chart.js"></script>
        <script src="spyder-foot.js"></script>
      </body>
    </html>

Notice that there's a div with an id of "spyder-chart".  This is required.  The spyder-chart.js file builds the Spyder chart and inserts it into that container.

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
    });
    
#### Images

To measure the loading time of an individual image in your HTML, you can do this:

    <img src="some-image.jpg"/>
    <script>Spyder.image('some-image', 'some-image.jpg');</script>
    
#### Range types

to identify a range, you can pass a type variable, which can be "css" or "js".  That looks something like this:

    <script>Spyder.start('load-execute-jquery', 'js');</script>
    <script src="jquery-1.11.0.min.js"></script>
    <script>Spyder.stop('load-execute-jquery');</script>
    
If you use the Spyder chart plugin, this is required in order to color code the ranges based on type.
    
#### HTML rendering performance

To measure the time it takes for the browser to churn through a lot of HTML, you can do this:

    <script>Spyder.start('page-feed');</script>
    <!-- tons and tons of HTML go here -->
    <script>Spyder.stop('page-feed');</script>
    
    
#### Tagging

To tag a specific point in time, you can do this:

    Spyder.tag('special-moment');
    
To tag when a specific HTML element is rendered, you can do something like this:

    <div id="foo"></div>
   
    <div id="bar"></div>
    <script>Spyder.tag('bar-rendered');</script>
    
#### Waterfall Chart

To render a water fall chart right in the browser, you can create a spyder-chart container, and include spyder-chart.js at the bottom of your page.  You can use the default styling found in spyder-chart.css, or you can create your own.

    <link rel="stylesheet" type="text/css" href="spyder-chart.css"></link>
    <script src="spyder-head.js"></script>
    
    <div id="spyder-chart"></div>
    
    <script src="spyder-chart.js"></script>
    <script src="spyder-foot.js"></script>
    
#### Serialization

To serialize the data into a string, you can do this for modern browsers:

    var json = JSON.stringify(Spyder.data);
    
If you're targeting IE7 or older, you'll need to use a JSON polyfill such as http://bestiejs.github.io/json3/

    

