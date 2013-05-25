requirejs.config({
	baseUrl: 'js',
	paths: {
		'underscore': 'lib/underscore',
		'backbone': 'lib/backbone',
		'jquery': 'lib/jquery-1.9.1.min',
	},
	shim: {
		'jquery': {
			exports: 'jQuery'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},
	}
});