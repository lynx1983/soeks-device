define(["view/Panel-view"], function(PanelView) {	
	var BottomPanelView;
	BottomPanelView = PanelView.extend({
		el: '#bottom-panel',
		template: _.template($('#bottom-panel-template').html()),
		initialize: function() {
			this.buttons = {
				left: "none",
				middle: "none",
				right: "none",
			};
			_.bindAll(this, "setLeftButton");
			_.bindAll(this, "setMiddleButton");
			_.bindAll(this, "setRightButton");
			this.eventBus.bind("device.panel.leftButton", this.setLeftButton);
			this.eventBus.bind("device.panel.middleButton", this.setMiddleButton);
			this.eventBus.bind("device.panel.rightButton", this.setRightButton);
		},
		render: function() {
			this.$el.html(this.template({buttons: this.buttons}))
			return this;
		},
		setLeftButton: function(className) {
			this.buttons.left = className;
			this.render();
		},
		setMiddleButton: function(className) {
			this.buttons.middle = className;
			this.render();
		},
		setRightButton: function(className) {
			this.buttons.right = className;
			this.render();
		}
	});

	return new BottomPanelView;
});