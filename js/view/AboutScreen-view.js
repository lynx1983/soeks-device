define(["view/Screen-view"], function(ScreenView) {	
	var AboutScreen; 
	AboutScreen = ScreenView.extend({
		template: _.template($('#about-screen-template').html()),
		initialize: function() {
			this.on("button.middle", this.onMiddleButton);
		},
		render: function() {
			this.$el.html(this.template())
			this.eventBus.trigger("device.panel.leftButton", "none");
			this.eventBus.trigger("device.panel.rightButton", "none");
			return this;
		},
		onMiddleButton: function() {
			this.eventBus.trigger("device.screen.prev");
		},
	});
	return AboutScreen;
});