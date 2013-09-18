define(["view/Panel-view", "model/DeviceSettings-model", "i18n/i18n"], function(PanelView, DeviceSettings, i18n) {	
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
			this.eventBus.bind("device.panel.leftButton", _.bind(this.setLeftButton, this));
			this.eventBus.bind("device.panel.middleButton", _.bind(this.setMiddleButton, this));
			this.eventBus.bind("device.panel.rightButton", _.bind(this.setRightButton, this));
		},
		render: function() {
			this.$el.html(this.template({
				lang: DeviceSettings.get("language"),
				buttons: this.buttons,
				t: i18n.t
			}))
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