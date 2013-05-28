define(["view/MenuItem-view"], function(MenuItemView) {	
	var RadioMenuItem;
	RadioMenuItem = MenuItemView.extend({
		tagName: "li",
		template: _.template($('#radio-menu-item-template').html()),
		constructor: function(options) {
			MenuItemView.call(this, options);
			this.on("menu.item.action", this.action);
		},
		initialize: function() {
			this.value = this.options.value;
		},
		action: function() {
			if(this.options.action) {
				this.options.action.apply(this);
				this.render();
			}
		},
	});
	return RadioMenuItem;
});