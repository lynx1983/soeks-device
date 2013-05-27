define(["backbone", "event/EventBus-event"], function(Backbone, EventBus) {	
	var EventDrivenView;
	EventDrivenView = Backbone.View.extend({
		constructor: function(options) {
			this.eventBus = (options && options.eventBus) || EventBus;
			Backbone.View.call(this, options);
			return this;
		},
	});
	return EventDrivenView;
});