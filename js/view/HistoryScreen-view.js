define(["view/Screen-view", "model/DeviceSettings-model", "collection/Measurements-collection"], function(ScreenView, DeviceSettings, MeasurementsCollection) {	
	var HistoryScreen; 
	HistoryScreen = ScreenView.extend({
		defaults: {
			min: 1,
			max: 128,
			length: 139,
		},
		template: _.template($('#history-screen-template').html()),
		initialize: function() {
			this.on("button.middle", this.onMiddleButton);
			MeasurementsCollection.on("add", _.bind(this.updateScreen, this));
			MeasurementsCollection.on("add change", _.bind(this.beep, this));
			this.options = _.extend(this.defaults, this.options);
			this.fullScreen = true;
			this.page = 0;
		},
		reinitialize: function() {
			this.page = 0;
		},
		updateScreen: function() {
			if(this.active) {
				this.render();
			}
		},
		beep: function() {
			if(this.active) {
				this.eventBus.trigger("device.beep");
			}
		},
		render: function() {
			var marks = [];
			var values = MeasurementsCollection.last(this.options.length).reverse();
			var maxValue = _.max(values, function(item) {return item.getValue()}).getValue();

			var warningLevelNormalized = Math.round(this.options.max * (DeviceSettings.get("backgroundThreshold") / maxValue))
			var dangerLevelNormalized = Math.round(this.options.max * (DeviceSettings.get("dangerThreshold") / maxValue))

			warningLevelNormalized = warningLevelNormalized > this.options.max - 1 ? this.options.max - 1: warningLevelNormalized;
			dangerLevelNormalized = dangerLevelNormalized > this.options.max - 1 ? this.options.max - 1 : dangerLevelNormalized;

			var endTime = new Date(_.last(values).get("timestamp"));
			var startTime = new Date(_.first(values).get("timestamp"));

			endTime = MeasurementsCollection.formatDate(endTime);
			startTime = MeasurementsCollection.formatDate(startTime);

			_.each(values, function(item) {
				var normalizedValue = Math.round(this.options.max * (item.getValue() / maxValue))
				normalizedValue = normalizedValue < this.options.min ? this.options.min : normalizedValue;
				marks.push({
					value: normalizedValue,
					tag: MeasurementsCollection.getTag(item.getValue()),
					level: item.get('level'),
				});
			}, this);

			this.$el.html(this.template({
				marks: marks,
				startTime: startTime,
				endTime: endTime,
				warningLevel: warningLevelNormalized,
				dangerLevel: dangerLevelNormalized,
			}));
			return this;
		},
		onMiddleButton: function() {
			this.eventBus.trigger("device.screen.prev");
		},
	});
	return HistoryScreen;
});