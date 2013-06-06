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
			MeasurementsCollection.on("add change", _.bind(this.updateScreen, this));
			this.options = _.extend(this.defaults, this.options);
			this.accuracy = 0;
			this.prevValue = null;
		},
		reinitialize: function() {
			this.accuracy = 0;
			this.prevValue = null;
		},
		updateScreen: function() {
			if(this.active) {
				this.render();
				this.eventBus.trigger("device.beep");
			}
		},
		render: function() {
			var leftMarks = [];
			var rightMarks = [];
			var lastItem = MeasurementsCollection.last();
			var lastValue = lastItem.getValue();
			var lastLeftValue = lastItem.get("leftValue");
			var lastRightValue = lastItem.get("rightValue");
			var lastReadiness = lastItem.get("readiness");

			var values = MeasurementsCollection.last(this.options.length).reverse();
			var leftMax = _.max(values, function(item) {return item.get("leftValue")}).get("leftValue");
			var rightMax = _.max(values, function(item) {return item.get("rightValue")}).get("rightValue");

			var sum = 0;

			this.accuracy = lastReadiness == 100 ? this.accuracy + 20 : this.accuracy;

			this.accuracy = this.accuracy > 100 ? 0 : this.accuracy;

			_.each(values, function(item) {
				var normalizedValue = Math.round(this.options.max * (item.get("leftValue") / leftMax))
				normalizedValue = normalizedValue < this.options.min ? this.options.min : normalizedValue;
				leftMarks.push({
					value: normalizedValue,
					readiness: item.get('readiness'),
				});
				normalizedValue = Math.round(this.options.max * (item.get("rightValue") / rightMax))
				normalizedValue = normalizedValue < this.options.min ? this.options.min : normalizedValue;
				rightMarks.push({
					value: normalizedValue,
					readiness: item.get('readiness'),
				});
				sum += item.getValue();
			}, this);

			var avgValue = sum / values.length;

			var tag = MeasurementsCollection.getTag(avgValue);

			if(tag == 'normal' && avgValue > DeviceSettings.get("backgroundThreshold")) {
				tag = 'warning';
			}

			this.$el.html(this.template({
				lastValue: lastReadiness == 100 ? MeasurementsCollection.formatValue(avgValue) : (this.prevValue ? MeasurementsCollection.formatValue(this.prevValue ) : ''),
				leftMarks: leftMarks,
				rightMarks: rightMarks,
				unit: lastReadiness == 100 ? MeasurementsCollection.getUnit(avgValue) : (this.prevValue ? MeasurementsCollection.getUnit(this.prevValue ) : ''),
				readiness: 41 * lastReadiness / 100,
				accuracy: 41 * this.accuracy / 100,
				message: this.getScreenMessage(tag),
				tag: tag,
				backgroundThreshold: MeasurementsCollection.formatValue(DeviceSettings.get("backgroundThreshold"))
			}));

			if(lastReadiness == 100) {
				this.prevValue = avgValue;
			}

			if(lastItem.get("level") == 0) {
				switch(MeasurementsCollection.getTag(lastLeftValue)) {
					case 'warning': 
						this.eventBus.trigger("device.panel.leftButton", "spot-warning");
						break;
					case 'danger':
						this.eventBus.trigger("device.panel.leftButton", "spot-danger");
						break;
					default:
						this.eventBus.trigger("device.panel.leftButton", "spot");
				}
				switch(MeasurementsCollection.getTag(lastRightValue)) {
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
			return this;
		},
		onMiddleButton: function() {
			this.eventBus.trigger("device.screen.prev");
		},
		getScreenMessage: function(tag) {
			switch(tag) {
				case 'warning': 
					return "повышенный радиационный фон";
				case 'danger':
					return "опасный радиационный фон";
				default:
					return "радиационный фон в норме";
			}
		}
	});
	return MeasurementScreen;
});