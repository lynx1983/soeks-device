define(["view/EventDriven-view"], function(EventDrivenView) {	
	var ScreenView;
	ScreenView = EventDrivenView.extend({
		el: $('#main-view'),
		constructor: function(options) {
			this.fullScreen = null;
			EventDrivenView.call(this, options);
			return this;
		},
	});
	return ScreenView;
});