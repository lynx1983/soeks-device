define(["backbone", "view/Panel-view", "view/Clock-view", "view/ActivityGraph-view"], function(Backbone, PanelView, ClockView, ActivityGraphView) {	
	var TopPanelView;
	TopPanelView = PanelView.extend({
		el: '#top-panel',
		template: _.template($('#top-panel-template').html()),
		initialize: function(options) {
			this.$el.html(this.template);
			this.Clock = new ClockView({
				el: this.$el.find('.clock')
			});
			this.ActivityGraph = new ActivityGraphView({
				el: this.$el.find('div.activity-indicator')
			});
		},
		render: function() {
			return this;
		},
	});

	return new TopPanelView;
});