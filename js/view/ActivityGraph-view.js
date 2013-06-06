define(["backbone", "collection/Measurements-collection"], function(Bakcbone, MeasurementsCollection) {	
	var ActivityGraphView; 
	ActivityGraphView = Backbone.View.extend({
		defaults: {
			min: 1,
			max: 11,
			length: 11,
		},
		template: _.template($('#activitygraph-template').html()),
		initialize: function() {
			MeasurementsCollection.on("add change", _.bind(this.render, this));
			this.options = _.extend(this.defaults, this.options);
		},
		render: function() {
			var marks = [];
			var lastValues = MeasurementsCollection.last(this.options.length).reverse();
			var maxValue = _.max(lastValues, function(item) {return item.getValue()}).getValue();

			_.each(lastValues, function(item) {
				var value = item.getValue();
				var normalizedValue = Math.round(this.options.max * (value / maxValue));
				if(normalizedValue < this.options.min) normalizedValue = this.options.min;
				marks.push({
					value: normalizedValue,
					tag: MeasurementsCollection.getTag(value),
					readiness: item.get('readiness'),
				})
			}, this)
			this.$el.html(this.template({marks: marks}))
			return this;
		},
	});
	return ActivityGraphView;
});