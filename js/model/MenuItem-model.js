define(["backbone"], function(Backbone) {
	var MenuItemModel;

	MenuItemModel = Backbone.Model.extend({
		defaults: function() {
			return {
				title: "Menu item",
				icon: null,
				action: null,
				view: null,
				type: "normal",
				value: null,
			}
		},
		initialize: function() {
			if(this.get("icon")) {
				this.img = new Image;
				this.img.src = this.get("icon")
			}
		}
	});

	return MenuItemModel;
})