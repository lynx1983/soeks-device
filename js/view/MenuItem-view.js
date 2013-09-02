define(["view/EventDriven-view", "i18n/i18n"], function(EventDrivenView, i18n) {	
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
			this.$el.html(this.template({
				t: i18n.t,
				item: this
			}));
			return this;
		},
	});
	return MenuItem;
});