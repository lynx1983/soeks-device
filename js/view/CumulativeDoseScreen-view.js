define(["view/Screen-view", "model/DeviceSettings-model", "collection/Measurements-collection"], function(ScreenView, DeviceSettings, MeasurementsCollection) {	
	var CumulativeDoseScreen; 
	CumulativeDoseScreen = ScreenView.extend({
		defaults: {
			min: 1,
			max: 13,
			length: 15,
		},
		template: _.template($('#cumulative-dose-screen-template').html()),
		initialize: function() {
			this.on("button.middle", this.onMiddleButton);
			MeasurementsCollection.on("add change", _.bind(this.updateScreen, this));
			this.options = _.extend(this.defaults, this.options);
			this.fullScreen = true;
		},
		reinitialize: function() {
			this.accuracy = 0;
			this.readiness = 0;
		},
		updateScreen: function() {
			if(this.active) {
				this.render();
				this.eventBus.trigger("device.beep");
			}
		},
		render: function() {
			var dose = MeasurementsCollection.cumulativeDose;
			var marks = [];
			var values = MeasurementsCollection.last(this.options.length).reverse();

			var sumValue = 0;
			var maxValue = _.max(values, function(item) {return item.getValue()}).getValue();

			_.each(values, function(item) {
				var normalizedValue = Math.round(this.options.max * (item.getValue() / maxValue))
				normalizedValue = normalizedValue < this.options.min ? this.options.min : normalizedValue;
				marks.push({
					value: normalizedValue,
					tag: MeasurementsCollection.getTag(item.getValue()),
					readiness: item.get('readiness'),
				});
				sumValue += item.getValue();
			}, this);

			var avgValue = sumValue / values.length;

			var tag = MeasurementsCollection.getTag(avgValue);

			if(tag == 'normal' && avgValue > DeviceSettings.get("backgroundThreshold")) {
				tag = 'warning';
			}	

			var doseTag = 'normal';

			if(dose > DeviceSettings.get("cumulativeThreshold")) {
				doseTag = "danger";
			}

			this.$el.html(this.template({
				title: "Накоп.доза",
				dose: MeasurementsCollection.formatValue(dose),
				doseTag: doseTag,
				unit: MeasurementsCollection.getDoseUnit(dose),
				time: MeasurementsCollection.formatTime(MeasurementsCollection.getMeasurementTime()),
				marks: marks,
				lastValue: MeasurementsCollection.formatValue(avgValue),
				lastValueUnit: MeasurementsCollection.getUnit(avgValue),
				backgroundThreshold: MeasurementsCollection.formatValue(DeviceSettings.get("backgroundThreshold")),
				tag: tag,
			}));
			return this;
		},
		onMiddleButton: function() {
			this.eventBus.trigger("device.screen.prev");
		},
	});
	return CumulativeDoseScreen;
});