define(["view/ViewMenuItem-view"], function(ViewMenuItemView) {	
	var MainMenuItem;
	MainMenuItem = ViewMenuItemView.extend({
		tagName: 'li',
		template: _.template($('#mainmenu-item-template').html()),
	});
	return MainMenuItem;
});