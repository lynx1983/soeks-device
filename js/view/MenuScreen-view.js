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
			_.each(this.items, function(item, i) {
				var renderedItem = $(item.render().$el);
				this.$el.find('.main-menu').append(renderedItem);
			}, this);
			this.scrollToPosition(this.getActiveItemPosition())
			this.eventBus.trigger("device.panel.leftButton", "up");
			this.eventBus.trigger("device.panel.middleButton", "ok");
			this.eventBus.trigger("device.panel.rightButton", "down");
			return this;
		},
		onLeftButton: function() {
			if(this.isAnimationStarted()) return;
			this.activeItemIndex--;
			if(this.activeItemIndex < 0) this.activeItemIndex = 0;
			this.scrollToPosition(this.getActiveItemPosition(), 500);
		},
		onMiddleButton: function() {
			var item = this.items[this.activeItemIndex];
			item.trigger("menu.item.action");
		},
		onRightButton: function() {
			if(this.isAnimationStarted()) return;
			this.activeItemIndex++;
			if(this.activeItemIndex > this.items.length - 1) this.activeItemIndex = this.items.length - 1;
			this.scrollToPosition(this.getActiveItemPosition(), 500);
		},
		startAnimation: function() {
			this.animation = true;
		},
		stopAnimation: function() {
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