define(["view/Screen-view", "model/DeviceSettings-model", "collection/Measurements-collection"], function(ScreenView, DeviceSettings, MeasurementsCollection) {	
	var MeasurementScreen; 
	MeasurementScreen = ScreenView.extend({
		defaults: {
			min: 1,
			max: 20,
			length: 15,
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
				var lastItem = MeasurementsCollection.last();
				var lastValue = lastItem.getValue();
				var lastLeftValue = lastItem.get("leftValue");
				var lastRightValue = lastItem.get("rightValue");
				var values = MeasurementsCollection.last(this.options.length).reverse();
				var leftMax = _.max(values, function(item) {return item.get("leftValue")}).get("leftValue");
				var rightMax = _.max(values, function(item) {return item.get("rightValue")}).get("rightValue");
				_.each(values, function(item) {
					var normalizedValue = Math.round(this.options.max * (item.get("leftValue") / leftMax))
					normalizedValue = normalizedValue < this.options.min ? this.options.min : normalizedValue;
					leftMarks.push({
						value: normalizedValue,
						tag: MeasurementsCollection.getTag(item.get("leftValue")),
						level: item.get('level'),
					});
					normalizedValue = Math.round(this.options.max * (item.get("rightValue") / rightMax))
					normalizedValue = normalizedValue < this.options.min ? this.options.min : normalizedValue;
					rightMarks.push({
						value: normalizedValue,
						tag: MeasurementsCollection.getTag(item.get("rightValue")),
						level: item.get('level'),
					});
				}, this);
				this.$el.html(this.template({
					lastValue: MeasurementsCollection.formatValue(lastValue),
					leftMarks: leftMarks,
					rightMarks: rightMarks,
					unit: MeasurementsCollection.getUnit(lastValue),
					backgroundThreshold: DeviceSettings.get("backgroundThreshold")
				}));
				if(lastItem.get("level") == 0) {
					switch(lastLeftValue) {
						case 'warning': 
							this.eventBus.trigger("device.panel.leftButton", "spot-warning");
							break;
						case 'danger':
							this.eventBus.trigger("device.panel.leftButton", "spot-danger");
							break;
						default:
							this.eventBus.trigger("device.panel.leftButton", "spot");
					}
					switch(MeasurementsCollection.getTag(MeasurementsCollection.last().get("rightValue"))) {
						case 'warning': 
							this.eventBus.trigger("device.panel.rightButton", "spot-warning");
							break;
						case 'danger':
							this.eventBus.trigger("device.panel.rightButton", "spot-danger");
							break;
						default:
							this.eventBus.trigger("device.panel.rightButton", "spot");
					}
				} else {
					this.eventBus.trigger("device.panel.leftButton", "spot");
					this.eventBus.trigger("device.panel.rightButton", "spot");
				}
				this.eventBus.trigger("device.panel.middleButton", "menu");
			}
			return this;
		},
		onMiddleButton: function() {
			this.eventBus.trigger("device.screen.prev");
		},
	});
	return MeasurementScreen;
});