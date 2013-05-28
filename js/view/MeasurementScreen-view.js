define(["view/Screen-view", "model/DeviceSettings-model", "collection/Measurements-collection"], function(ScreenView, DeviceSettings, MeasurementsCollection) {	
	var MeasurementScreen; 
	MeasurementScreen = ScreenView.extend({
		defaults: {
			min: 0,
			max: 20,
			length: 14,
		},
		template: _.template($('#measurement-screen-template').html()),
		initialize: function() {
			this.on("button.middle", this.onMiddleButton);
			MeasurementsCollection.on("add change", _.bind(this.render, this));
			this.options = _.extend(this.defaults, this.options);
		},
		render: function() {
			if(this.active) {
				var leftMarks = [];
				var rightMarks = [];
				var scale = this.options.max;
				_.each(MeasurementsCollection.last(this.options.length).reverse(), function(item) {
					leftMarks.push({
						value: Math.round(scale * (item.get("leftValue") / 100)),
						tag: item.get('tag'),
						level: item.get('level'),
					});
					rightMarks.push({
						value: Math.round(scale * (item.get("rightValue") / 100)),
						tag: item.get('tag'),
						level: item.get('level'),
					});
				})
				this.$el.html(this.template({
					lastValue: MeasurementsCollection.last().getValue(),
					leftMarks: leftMarks,
					rightMarks: rightMarks,
					backgroundThreshold: DeviceSettings.get("backgroundThreshold")
				}));
				this.eventBus.trigger("device.panel.leftButton", "spot");
				this.eventBus.trigger("device.panel.middleButton", "menu");
				this.eventBus.trigger("device.panel.rightButton", "spot");
			}
			return this;
		},
		onMiddleButton: function() {
			this.eventBus.trigger("device.screen.prev");
		},
	});
	return MeasurementScreen;
});