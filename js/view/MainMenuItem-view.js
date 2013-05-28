define(["view/ViewMenuItem-view"], function(ViewMenuItemView) {	
	var MainMenuItem;
	MainMenuItem = ViewMenuItemView.extend({
		template: _.template($('#mainmenu-item-template').html()),
	});
	return MainMenuItem;
});