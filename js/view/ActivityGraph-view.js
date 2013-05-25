define(["backbone"], function(Bakcbone) {	
	var ActivityGraphView; 
	ActivityGraphView = Backbone.View.extend({
		defaults: {
			min: 1,
			max: 12,
			length: 11,
		},
		template: _.template($('#activitygraph-template').html()),
		initialize: function() {
			this.udpateTimeout = setInterval(_.bind(function() {this.trigger("view.update");}, this), 1000);
			this.options = _.extend(this.defaults, this.options);
			this.marks = [];
			this.render();
			this.on("view.update", this.updateView);
		},
		render: function() {
			this.$el.html(this.template({marks: this.marks}))
			return this;
		},
		updateView: function() {
			this.marks.unshift(_.random(this.options.min, this.options.max));
			while(this.marks.length > this.options.length) {
				this.marks.pop();
			}
			this.render();
		}
	});
	return ActivityGraphView;
});