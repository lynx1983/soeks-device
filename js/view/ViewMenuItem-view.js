define(["view/MenuItem-view"], function(MenuItemView) {	
	var ViewMenuItem;
	ViewMenuItem = MenuItemView.extend({
		tagName: "li",
		template: _.template($('#view-menu-item-template').html()),
		constructor: function(options) {
			MenuItemView.call(this, options);
			this.on("menu.item.action", this.action);
		},
		action: function() {
			this.eventBus.trigger("device.screen.change", {viewName: this.options.view});
		}
	});
	return ViewMenuItem;
});