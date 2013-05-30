define(["backbone"], function(Backbone) {
	var DeviceSettingsModel;

	DeviceSettingsModel = Backbone.Model.extend({
		defaults: function() {
			return {
				bluetooth: false,
				language: "ru",
				backgroundThreshold: 300,	
				cumulativeThreshold: 10000,
				soundEnabled: true,
				buttonsSoundEnabled: true,
				sensorSoundEnabled: true,
				thresholdSoundEnabled: true,
			}
		},
	});

	return new DeviceSettingsModel;
})