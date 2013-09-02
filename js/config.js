requirejs.config({
	baseUrl: 'js',
	paths: {
		'underscore': 'lib/underscore',
		'backbone': 'lib/backbone',
		'jquery': 'lib/jquery-1.9.1.min',
		'underi18n': 'lib/underi18n',
		'domReady': 'lib/domReady'
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
		'underi18n': {
			exports: 'underi18n'
		},
		'domReady': {
			exports: 'domReady'
		}
	}
});