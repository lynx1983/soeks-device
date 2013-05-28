define(["view/ViewMenuItem-view"], function(ViewMenuItemView) {	
	var MainMenuItem;
	MainMenuItem = ViewMenuItemView.extend({
		template: _.template($('#mainmenu-item-template').html()),
		render: function() {
			this.$el.html(this.template({item: {title: this.title, icon: this.icon}}));
			return this;
		},
	});
	return MainMenuItem;
});