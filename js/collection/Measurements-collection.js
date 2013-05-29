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

			this.cumulativeDose = 0;

			this.startTimestamp = new Date().getTime();
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

			this.cumulativeDose += this.last().getValue();
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
			var formatedValue;

			formatedValue = value / 1000;

			if(value >= 100000) {
				formatedValue = value / 1000000;
			}

			if(value >= 100000000) {
				formatedValue = value / 1000000000;
			}			

			return formatedValue.toFixed(2).replace(/\./, ',');
		},
		getUnit: function(value) {
			return this.getDoseUnit(value) + '/h';
		},
		getDoseUnit: function(value) {
			if(value >= 100000000) {
				return 'Sv';
			}
			if(value >= 100000) {
				return 'mSv';
			}
			
			return '&#956;Sv';
		},
		getTag: function(value) {
			return _.find(this.tags, function(item) {
				return value <= item.level;
			}).tag;
		},
		getMeasurementTime: function() {
			return new Date().getTime() - this.startTimestamp;
		},
		formatTime: function(timestamp) {
			timestamp /= Math.round(1000);
			var days = Math.round(timestamp / (60 * 60 * 24));
			timestamp -= days * 60 * 60 * 24;
			var hours = Math.round(timestamp / (60 * 60));
			timestamp -= hours * 60 * 60;
			var minutes = Math.round(timestamp / 60);
			timestamp -= minutes * 60;
			var seconds = Math.round(timestamp);
			return this.stringPad(days.toString(), 4, 0) + ':' + 
				this.stringPad(hours.toString(), 2, 0) + ':' + 
				this.stringPad(minutes.toString(), 2, 0) + ':' + 
				this.stringPad(seconds.toString(), 2, 0);
		},
		stringPad: function(str, length, char) {
			return new Array(length - str.length + 1).join(char) + str;
		}		
	});
	return new MeasurementsCollection;
});