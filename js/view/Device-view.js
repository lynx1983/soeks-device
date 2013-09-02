define([
	"view/EventDriven-view",
	"view/TopPanel-view",
	"view/BottomPanel-view",
	"model/DeviceSettings-model",
	], function(EventDrivenView, TopPanel, BottomPanel, DeviceSettings) {	
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

				this.beepSound = this.$el.find('audio').get(0);
				
				this.eventBus.bind("device.screen.change", _.bind(this.onScreenChange, this));
				this.eventBus.bind("device.screen.prev", _.bind(this.setPrevScreen, this));
				this.eventBus.bind("device.screen.update", _.bind(this.render, this));
				this.eventBus.bind("device.beep", _.bind(this.beep, this));
			},
			beep: function() {
				if(DeviceSettings.get("soundEnabled") === true) {
					this.beepSound.play();
				}
			},
			render: function() {
				if (this.getCurrentScreen()) {
					this.setFullScreen(this.getCurrentScreen().fullScreen);
				}
				TopPanel.render();
				if (this.getCurrentScreen()) {
       				this.getCurrentScreen().render();
      			}
				BottomPanel.render();
				return this;
			},
			addScreen: function(key, view) {
				this.screens[key] = view;
				return this;
			},
			setCurrentScreen: function(key) {
				if(this.screens[key]) {
					if(this.getCurrentScreen()) {
						this.getCurrentScreen().setActive(false);	
					}
					this.screenStack.unshift(this.screens[key]);
					if(this.getCurrentScreen() && this.getCurrentScreen().reinitialize) {
						this.getCurrentScreen().reinitialize();
					}
					this.getCurrentScreen().setActive(true);
					this.render();
				}
			},
			setPrevScreen: function() {
				if(this.getCurrentScreen()) {
					this.getCurrentScreen().setActive(false);	
				}
				this.screenStack.shift();
				this.getCurrentScreen().setActive(true);
				this.render();
			},
			getCurrentScreen: function() {
				if(this.screenStack.length > 0) {
					return this.screenStack[0];
				}
			},
			leftButtonClick: function() {
				if(DeviceSettings.get("soundEnabled") && DeviceSettings.get("buttonsSoundEnabled")) {
					this.beep();
				}
				this.getCurrentScreen().trigger("button.left");
			},
			middleButtonClick: function() {
				if(DeviceSettings.get("soundEnabled") && DeviceSettings.get("buttonsSoundEnabled")) {
					this.beep();
				}
				this.getCurrentScreen().trigger("button.middle");
			},
			rightButtonClick: function() {
				if(DeviceSettings.get("soundEnabled") && DeviceSettings.get("buttonsSoundEnabled")) {
					this.beep();
				}
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