define(["backbone"], function(Backbone) {
	var DeviceSettingsModel;

	DeviceSettingsModel = Backbone.Model.extend({
		defaults: function() {
			return {
				bluetooth: false,
				language: "ru",
				backgroundThreshold: 0.3,	
			}
		},
	});

	return new DeviceSettingsModel;
})