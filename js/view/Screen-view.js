define(["backbone"], function(Backbone) {	
	var ScreenView;
	ScreenView = Backbone.View.extend({
		el: $('#main-view'),
		constructor: function(options) {
			this.fullScreen = null;
			this.eventBus = options.eventBus;
			Backbone.View.call(this, options);
			return this;
		},
	});
	return ScreenView;
});