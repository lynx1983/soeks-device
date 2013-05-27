define(["backbone", "collection/Measurements-collection"], function(Bakcbone, MeasurementsCollection) {	
	var ActivityGraphView; 
	ActivityGraphView = Backbone.View.extend({
		defaults: {
			min: 0,
			max: 12,
			length: 11,
		},
		template: _.template($('#activitygraph-template').html()),
		initialize: function() {
			MeasurementsCollection.on("add", _.bind(this.render, this));
			this.options = _.extend(this.defaults, this.options);
		},
		render: function() {
			var marks = [];
			var scale = this.options.max;
			_.each(MeasurementsCollection.last(this.options.length).reverse(), function(item) {
				marks.push({
					value: Math.round(scale * (item.get('value') / 100)),
					tag: item.get('tag'),
				})
			})
			this.$el.html(this.template({marks: marks}))
			return this;
		},
	});
	return ActivityGraphView;
});