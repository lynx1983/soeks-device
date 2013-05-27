define(["view/Screen-view"], function(ScreenView) {	
	var SettingsView; 
	SettingsView = ScreenView.extend({
		template: _.template($('#settingsmenu-template').html()),
		initialize: function() {
			this.activeItemIndex = 0;
			this.on("button.left", this.onLeftButton);
			this.on("button.middle", this.onMiddleButton);
			this.on("button.right", this.onRightButton);
		},
		reinitialize: function() {
			this.activeItemIndex = 0;
		},
		render: function() {
			this.$el.html(this.template({items: this.collection.toJSON(), activeItemIndex: this.activeItemIndex}));
			this.eventBus.trigger("device.panel.leftButton", "up");
			this.eventBus.trigger("device.panel.middleButton", "select");
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
			if(item.get("view")) {
				this.eventBus.trigger("device.screen.change", {viewName: item.get("view")});
			}
			if(item.get("action")) {
				item.get("action").apply(item);
				this.render()
			}
		},
		onRightButton: function() {
			this.activeItemIndex++;
			if(this.activeItemIndex > this.collection.length - 1) this.activeItemIndex = 0;
			this.render();
		}
	});
	return SettingsView;
});