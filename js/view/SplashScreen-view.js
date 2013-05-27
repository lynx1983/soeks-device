define(["view/Screen-view"], function(ScreenView) {	
	var SplashScreen;
	SplashScreen = ScreenView.extend({
		template: _.template($('#splash-screen-template').html()),
		constructor: function(options) {
			ScreenView.call(this, options);
			this.fullScreen = true;
			return this;
		},
		render: function() {
			this.$el.html(this.template());
			this.$el.find('.view')
				.css('opacity', 0)
				.animate({
					opacity: 1
				}, 1000)
				.delay(2000)
				.animate({
					opacity: 0
				}, 1000,
				_.bind(function() {
					this.eventBus.trigger("device.screen.change", {viewName: "main"})
				}, this)
			);
		},
	});
	return SplashScreen;
});