define(["backbone"], function(Backbone) {
	var MenuItemModel;

	MenuItemModel = Backbone.Model.extend({
		defaults: function() {
			return {
				title: "Menu item",
				icon: null,
				view: null,  
			}
		},
		initialize: function() {
			if(this.get("icon")) {
				this.Image = new Image;
				this.Image.src = this.get("icon")
			}
		}
	});

	return MenuItemModel;
})