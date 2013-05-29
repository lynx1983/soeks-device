define(["backbone", "model/Measurement-model"], function(Backbone, MeasurementModel) {
	var MeasurementsCollection
	MeasurementsCollection = Backbone.Collection.extend({
		model: MeasurementModel,
		initialize: function() {
			this.levels = [{
					probability: .80,
					minimum: 100,
					maximum: 300,
				},
				{
					probability: .10,
					minimum: 300,
					maximum: 400,
				},
				{
					probability: .07,
					minimum: 400,
					maximum: 1200,
				},
				{
					probability: .03,
					minimum: 1200,
					maximum: 100000,
				}];

			this.tags = [{
				level: 400,
				tag: 'normal',
			},
			{
				level: 1200,
				tag: 'warning',
			},
			{
				level: 100000,
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

			var measurementLeftError = _.random(-this.difference, this.difference) / 100;
			var measurementRightError = _.random(-this.difference, this.difference) / 100;

			this.add({
				leftValue: value + (value * measurementLeftError),
				rightValue: value + (value * measurementRightError),
			});
		},
		doMeasure: function() {
			var lastMeasure = this.last();
			if(lastMeasure && lastMeasure.get("level") < 2) {
				lastMeasure.set("level" , lastMeasure.get("level") + 1);
			} else {
				this.newMeasure();
			}
		},
		formatValue: function(value) {
			return (value / 1000).toFixed(2);
		},
		getUnit: function(value) {
			return '&#956;Sv/h';
		},
		getTag: function(value) {
			return _.find(this.tags, function(item) {
				return value <= item.level;
			}).tag;
		}		
	});
	return new MeasurementsCollection;
});