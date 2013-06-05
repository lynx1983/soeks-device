define(["view/Screen-view"], function(ScreenView) {	
	var SettingsView; 
	SettingsView = ScreenView.extend({
		template: _.template($('#settingsmenu-template').html()),
		initialize: function() {
			this.activeItemIndex = 0;
			this.itemsPerScreen = 8;
			this.items = this.options.items;
			this.on("button.left", this.onLeftButton);
			this.on("button.middle", this.onMiddleButton);
			this.on("button.right", this.onRightButton);
		},
		reinitialize: function() {
			this.activeItemIndex = 0;
		},
		render: function() {
			this.$el.html(this.template());
			var currentScreen = this.getItemScreenIndex();
			var startIndex = currentScreen * this.itemsPerScreen;
			var endIndex = startIndex + this.itemsPerScreen;
			_.each(this.items, function(item, i) {
				if(i >= startIndex && i < endIndex) {
					var renderedItem = $(item.render().$el);
					i == this.activeItemIndex ? renderedItem.addClass('active') : renderedItem.removeClass('active');
					this.$el.find('.menu').append(renderedItem);
				}
			}, this);
			this.eventBus.trigger("device.panel.leftButton", "up");
			this.eventBus.trigger("device.panel.middleButton", "select");
			this.eventBus.trigger("device.panel.rightButton", "down");
			return this;
		},
		getItemScreenIndex: function() {
			return Math.floor(this.activeItemIndex / this.itemsPerScreen);
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
	return SettingsView;
});