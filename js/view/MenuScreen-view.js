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
			this.$el.find(".main-menu").append(
				this.getPrevItem().render().$el,
				this.items[this.activeItemIndex].render().$el,
				this.getNextItem().render().$el
			);
			this.$el.find('.view').scrollTop(this.items[this.activeItemIndex].$el.position().top);
			this.eventBus.trigger("device.panel.leftButton", "up");
			this.eventBus.trigger("device.panel.middleButton", "ОК");
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
			var prevItem = this.getPrevItem();
			this.activeItemIndex--;
			if(this.activeItemIndex < 0) this.activeItemIndex = this.items.length - 1;
			this.scrollToPosition(prevItem.$el.position().top, 500);
		},
		onMiddleButton: function() {
			var item = this.items[this.activeItemIndex];
			item.trigger("menu.item.action");
		},
		onRightButton: function() {
			if(this.isAnimationStarted()) return;
			var nextItem = this.getNextItem();
			this.activeItemIndex++;
			if(this.activeItemIndex > this.items.length - 1) this.activeItemIndex = 0;
			this.scrollToPosition(nextItem.$el.position().top, 500);
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
		scrollToPosition: function(position, speed) {
			var speed = speed || 0;
			this.startAnimation();
			this.$el.find('.view').stop().animate({'scrollTop': this.$el.find('.view').scrollTop() + position}, speed, _.bind(
				function() {
					this.stopAnimation();
					this.updateMenu(position);
				},
			this));
		},
		updateMenu: function(position) {
			if(position > 0) {
				this.$el.find(".main-menu").children().first().remove();
				this.$el.find(".main-menu").append(
					this.getNextItem().render().$el
				)
			} else {
				this.$el.find(".main-menu").children().last().remove();
				this.$el.find(".main-menu").prepend(
					this.getPrevItem().render().$el
				)
			}
			this.$el.find('.view').scrollTop(this.$el.find('.view').scrollTop() + this.items[this.activeItemIndex].$el.position().top);			
		}
	});
	return MenuScreen;
});