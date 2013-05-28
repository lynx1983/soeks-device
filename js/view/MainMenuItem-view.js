define(["view/ViewMenuItem-view"], function(ViewMenuItemView) {	
	var MainMenuItem;
	MainMenuItem = ViewMenuItemView.extend({
		template: _.template($('#mainmenu-item-template').html()),
		initialize: function() {
			this.on("menu.item.action", this.action);
		},
		render: function() {
			this.$el.html(this.template({item: {title: this.title, icon: this.icon}}));
			return this;
		},
		action: function() {
			this.eventBus.trigger("device.screen.change", {viewName: this.options.view});
		}
	});
	return MainMenuItem;
});