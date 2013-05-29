define(["view/MenuItem-view"], function(MenuItemView) {	
	var CheckboxMenuItem;
	CheckboxMenuItem = MenuItemView.extend({
		tagName: "li",
		template: _.template($('#checkbox-menu-item-template').html()),
		constructor: function(options) {
			MenuItemView.call(this, options);
			this.on("menu.item.action", this.action);
		},
		initialize: function() {
			this.value = this.options.value;
			if(this.options.afterInit) {
				this.options.afterInit.apply(this);
			}
		},
		action: function() {
			if(this.options.action) {
				this.options.action.apply(this);
				this.render();
			}
		},
	});
	return CheckboxMenuItem;
});