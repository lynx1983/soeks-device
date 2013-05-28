define(["view/EventDriven-view"], function(EventDrivenView) {	
	var MenuItem;
	MenuItem = EventDrivenView.extend({
		constructor: function(options) {
			EventDrivenView.call(this, options);
			this.title = options.title;
			if(options.iconPath) {
				this.img = new Image;
				this.img.src = this.options.iconPath;
			}
		},
		render: function() {
			this.$el.html(this.template({item: this}));
			return this;
		},
	});
	return MenuItem;
});