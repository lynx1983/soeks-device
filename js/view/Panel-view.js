define(["backbone"], function(Backbone) {	
	var PanelView;
	PanelView = Backbone.View.extend({
		constructor: function(options) {
			this.fullScreen = null;
			this.eventBus = options.eventBus;
			Backbone.View.call(this, options);
			return this;
		},
	});

	return PanelView;
});