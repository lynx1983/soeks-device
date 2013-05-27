define(["backbone"], function(Backbone) {
	var DeviceSettingsModel;

	DeviceSettingsModel = Backbone.Model.extend({
		defaults: function() {
			return {
				bluetooth: false,	
			}
		},
	});

	return new DeviceSettingsModel;
})