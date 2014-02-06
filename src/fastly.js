var Fastly;

(function() {
	Fastly = function(id, func) {
		Fastly.start(id);
		return function() {
			func.apply(this, arguments);	
			Fastly.stop(id);
		};
	};

	Fastly.data = data = {};

	Fastly.start = function(id) {
		data[id] = {};
		data[id].start = new Date().getTime();
	};

	Fastly.stop = function(id) {
		data[id].stop = new Date().getTime();
	};


})();