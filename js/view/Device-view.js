define([
	"view/EventDriven-view",
	"view/TopPanel-view",
	"view/BottomPanel-view",
	], function(EventDrivenView, TopPanel, BottomPanel) {	
		var DeviceView;
		DeviceView = EventDrivenView.extend({
			el: $('#device'),
			events: {
				"click div.hardware.left": "leftButtonClick",
				"click div.hardware.middle": "middleButtonClick",
				"click div.hardware.right": "rightButtonClick",
			},
			initialize: function() {
				this.screens = {};
				this.screenStack = [];
				
				this.eventBus.bind("device.screen.change", _.bind(this.onScreenChange, this));
				this.eventBus.bind("device.screen.prev", _.bind(this.setPrevScreen, this));
			},
			render: function() {
				this.setFullScreen(this.getCurrentScreen().fullScreen);
				TopPanel.render();
				this.getCurrentScreen().render();
				BottomPanel.render();
				return this;
			},
			addScreen: function(key, view) {
				this.screens[key] = view;
				return this;
			},
			setCurrentScreen: function(key) {
				if(this.screens[key]) {
					this.screenStack.unshift(this.screens[key]);
					if(this.getCurrentScreen() && this.getCurrentScreen().reinitialize) {
						this.getCurrentScreen().reinitialize();
					}
					this.render();
				}
			},
			setPrevScreen: function() {
				this.screenStack.shift();
				this.render();
			},
			getCurrentScreen: function() {
				if(this.screenStack.length > 0) {
					return this.screenStack[0];
				}
			},
			leftButtonClick: function() {
				this.getCurrentScreen().trigger("button.left");
			},
			middleButtonClick: function() {
				this.getCurrentScreen().trigger("button.middle");
			},
			rightButtonClick: function() {
				this.getCurrentScreen().trigger("button.right");
			},
			onScreenChange: function(params) {
				if(params.viewName == "__prevScreen__") {
					this.setPrevScreen();
				} else {
					this.setCurrentScreen(params.viewName);
				}
			},
			setFullScreen: function(flag) {
				if(flag) {
					this.$el.find("#device-screen").addClass("fullscreen")
				} else {
					this.$el.find("#device-screen").removeClass("fullscreen")
				}
			},
			isFullScreen: function() {
				return this.$el.find("#device-screen").is(".fullscreen")
			}
		});

		return new DeviceView;
	}
);