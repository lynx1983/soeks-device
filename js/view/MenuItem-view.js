define(["view/EventDriven-view"], function(EventDrivenView) {	
	var MenuItem;
	MenuItem = EventDrivenView.extend({
		constructor: function(options) {
			EventDrivenView.call(this, options);
			this.title = options.title;
			if(options.icon) {
				this.icon = new Image;
				this.icon.src = this.options.icon;
			}
		},
		render: function() {
			this.$el.html(this.template({item: this}));
			return this;
		},
	});
	return MenuItem;
});