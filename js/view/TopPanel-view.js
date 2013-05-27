define(["backbone", "view/Panel-view", "view/Clock-view", "view/ActivityGraph-view", "model/DeviceSettings-model"], function(Backbone, PanelView, ClockView, ActivityGraphView, DeviceSettings) {	
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
			DeviceSettings.on("change:bluetooth", _.bind(this.render, this))
		},
		render: function() {
			return this;
		},
	});

	return new TopPanelView;
});