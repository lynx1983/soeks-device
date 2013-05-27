define(["view/EventDriven-view"], function(EventDrivenView) {	
	var ScreenView;
	ScreenView = EventDrivenView.extend({
		el: $('#main-view'),
		constructor: function(options) {
			EventDrivenView.call(this, options);
			this.fullScreen = null;
			return this;
		},
	});
	return ScreenView;
});