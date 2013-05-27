define(["backbone"], function(Backbone) {
	var MenuItemModel;

	MenuItemModel = Backbone.Model.extend({
		defaults: function() {
			return {
				title: "Menu item",
				icon: null,
				view: null,
				type: "normal",
				value: null,
			}
		},
		initialize: function() {
			if(this.get("icon")) {
				var img = new Image;
				img.src = this.get("icon")
			}
		}
	});

	return MenuItemModel;
})