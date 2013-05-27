define(["view/Screen-view"], function(ScreenView) {	
	var MenuScreen; 
	MenuScreen = ScreenView.extend({
		template: _.template($('#mainmenu-template').html()),
		initialize: function() {
			this.activeItemIndex = 0;
			this.fullScreen = false;
			this.on("button.left", this.onLeftButton);
			this.on("button.middle", this.onMiddleButton);
			this.on("button.right", this.onRightButton);
		},
		render: function() {
			this.$el.html(this.template({item: this.collection.at(this.activeItemIndex).toJSON()}));
			this.eventBus.trigger("device.panel.leftButton", "up");
			this.eventBus.trigger("device.panel.middleButton", "ok");
			this.eventBus.trigger("device.panel.rightButton", "down");
			return this;
		},
		onLeftButton: function() {
			this.activeItemIndex--;
			if(this.activeItemIndex < 0) this.activeItemIndex = this.collection.length - 1;
			this.render();
		},
		onMiddleButton: function() {
			var item = this.collection.at(this.activeItemIndex);
			var viewName = item.get("view");
			if(viewName) {
				this.eventBus.trigger("device.screen.change", {viewName: viewName});
			}
		},
		onRightButton: function() {
			this.activeItemIndex++;
			if(this.activeItemIndex > this.collection.length - 1) this.activeItemIndex = 0;
			this.render();
		}
	});
	return MenuScreen;
});