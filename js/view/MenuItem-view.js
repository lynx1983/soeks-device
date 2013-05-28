define(["view/EventDriven-view"], function(EventDrivenView) {	
	var MenuItem;
	MenuItem = EventDrivenView.extend({
		constructor: function(options) {
			EventDrivenView.call(this, options);
			this.title = options.title;
			return this;
		},
	});
	return MenuItem;
});