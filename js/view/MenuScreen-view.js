define(["view/Screen-view"], function(ScreenView) {	
	var MenuScreen; 
	MenuScreen = ScreenView.extend({
		template: _.template($('#mainmenu-template').html()),
		initialize: function() {
			this.activeItemIndex = 0;
			this.fullScreen = false;
			this.items = this.options.items;
			this.on("button.left", this.onLeftButton);
			this.on("button.middle", this.onMiddleButton);
			this.on("button.right", this.onRightButton);
		},
		render: function() {
			var activeItem = this.items[this.activeItemIndex];
			this.$el.html(this.template());
			activeItem.setElement(this.$el.find('.menu-item')).render();
			this.eventBus.trigger("device.panel.leftButton", "up");
			this.eventBus.trigger("device.panel.middleButton", "ok");
			this.eventBus.trigger("device.panel.rightButton", "down");
			return this;
		},
		onLeftButton: function() {
			this.activeItemIndex--;
			if(this.activeItemIndex < 0) this.activeItemIndex = this.items.length - 1;
			this.render();
		},
		onMiddleButton: function() {
			var item = this.items[this.activeItemIndex];
			item.trigger("menu.item.action");
		},
		onRightButton: function() {
			this.activeItemIndex++;
			if(this.activeItemIndex > this.items.length - 1) this.activeItemIndex = 0;
			this.render();
		}
	});
	return MenuScreen;
});