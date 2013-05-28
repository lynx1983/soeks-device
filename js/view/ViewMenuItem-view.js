define(["view/MenuItem-view"], function(MenuItemView) {	
	var ViewMenuItem;
	ViewMenuItem = MenuItemView.extend({
		constructor: function(options) {
			MenuItemView.call(this, options);
			if(options.icon) {
				this.icon = new Image;
				this.icon.src = this.options.icon;
			}
			this.on("menu.item.action", this.action);
		},
		action: function() {
			this.eventBus.trigger("device.screen.change", {viewName: this.options.view});
		}
	});
	return ViewMenuItem;
});