define(["backbone"], function(Backbone) {	
	var ClockView; 
	ClockView = Backbone.View.extend({
		initialize: function(options) {
			this.udpateTimeout = setInterval(_.bind(this.render, this), 10 * 1000);
			this.render();
		},
		render: function() {
			var date =  new Date();
			var hh = date.getHours();
			var mm= date.getMinutes();
			hh = hh < 10 ? "0" + hh : hh;
			mm = mm < 10 ? "0" + mm : mm;
			this.$el.text(hh + ":" + mm);
			return this;
		},
	});
	return ClockView;
});