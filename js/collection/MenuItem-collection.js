define(["backbone", "model/MenuItem-model"], function(Backbone, MenuItemModel) {
	var MenuItemCollection
	MenuItemCollection = Backbone.Collection.extend({
		model: MenuItemModel
	});
	return MenuItemCollection;
});