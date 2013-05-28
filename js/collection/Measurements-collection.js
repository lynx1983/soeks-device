define(["backbone", "model/Measurement-model"], function(Backbone, MeasurementModel) {
	var MeasurementsCollection
	MeasurementsCollection = Backbone.Collection.extend({
		model: MeasurementModel,
		initialize: function() {
			this.levels = [{
					probability: .80,
					minimum: 0,
					maximum: 30,
					tag: 'normal',
				},
				{
					probability: .10,
					minimum: 30,
					maximum: 75,
					tag: 'normal',
				},
				{
					probability: .07,
					minimum: 75,
					maximum: 90,
					tag: 'warning',
				},
				{
					probability: .03,
					minimum: 90,
					maximum: 100,
					tag: 'danger',
				}];

			this.difference = 10;

			var probability = 0;
			_.each(this.levels, function(level, key) {
				level.left = probability == 0 ? 0 : probability + 1;
				probability += level.probability * 100;
				level.right = probability;
			})

			this.measurementInterval = setInterval(_.bind(this.doMeasure, this), 1000);
		},
		newMeasure: function() {
			var range = _.random(0, 100);
			var level = _.find(this.levels, function(level) {
				if(range >= level.left && range <= level.right) {
					return level;
				}
			});
			var value = _.random(level.minimum, level.maximum);

			var difference = _.random(-this.difference, this.difference);

			this.add({
				leftValue: value - difference / 2,
				rightValue: value + difference / 2,
				tag: level.tag,
			});
		},
		doMeasure: function() {
			var lastMeasure = this.last();
			if(lastMeasure && lastMeasure.get("level") < 2) {
				lastMeasure.set("level" , lastMeasure.get("level") + 1);
			} else {
				this.newMeasure();
			}
		}
	});
	return new MeasurementsCollection;
});