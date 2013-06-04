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
			this.animation = false;
		},
		render: function() {
			this.$el.html(this.template());
			var prevItem = $(this.getPrevItem().render().$el);
			var currentItem = $(this.items[this.activeItemIndex].render().$el);
			var nextItem = $(this.getNextItem().render().$el);
			this.$el.find('.main-menu').html('');
			this.$el.find('.main-menu').append(
				prevItem,
				currentItem,
				nextItem
			);
			this.$el.scrollTop(128);
			this.eventBus.trigger("device.panel.leftButton", "up");
			this.eventBus.trigger("device.panel.middleButton", "ok");
			this.eventBus.trigger("device.panel.rightButton", "down");
			return this;
		},
		getNextItem: function() {
			if(this.activeItemIndex + 1 >= this.items.length) {
				return this.items[0];
			} 
			return this.items[this.activeItemIndex + 1];
		},
		getPrevItem: function() {
			if(this.activeItemIndex - 1 < 0) {
				return this.items[this.items.length - 1];
			} 
			return this.items[this.activeItemIndex - 1];
		},
		onLeftButton: function() {
			if(this.isAnimationStarted()) return;
			this.activeItemIndex--;
			if(this.activeItemIndex < 0) this.activeItemIndex = this.items.length - 1;
			this.scrollToPosition(0, 500);
		},
		onMiddleButton: function() {
			var item = this.items[this.activeItemIndex];
			item.trigger("menu.item.action");
		},
		onRightButton: function() {
			if(this.isAnimationStarted()) return;
			this.activeItemIndex++;
			if(this.activeItemIndex > this.items.length - 1) this.activeItemIndex = 0;
			this.scrollToPosition(256, 500);
		},
		startAnimation: function() {
			this.animation = true;
		},
		stopAnimation: function() {
			this.render();
			this.animation = false;
		},
		isAnimationStarted: function() {
			return this.animation;
		},
		getActiveItemPosition: function() {
			return this.$el.scrollTop() + this.items[this.activeItemIndex].$el.position().top;
		},
		scrollToPosition: function(position, speed) {
			var speed = speed || 0;
			this.startAnimation();
			this.$el.stop().animate({'scrollTop': position}, speed, _.bind(this.stopAnimation, this));
		}
	});
	return MenuScreen;
});