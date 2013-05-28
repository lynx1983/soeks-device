define(["view/EventDriven-view"], function(EventDrivenView) {	
	var ScreenView;
	ScreenView = EventDrivenView.extend({
		el: $('#main-view'),
		constructor: function(options) {
			this.fullScreen = null;
			this.active = false;
			EventDrivenView.call(this, options);
			return this;
		},
		setActive: function(flag) {
			this.active = flag;
		}
	});
	return ScreenView;
});