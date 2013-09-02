define(["backbone"], function(Backbone) {
	var DeviceSettingsModel;

	DeviceSettingsModel = Backbone.Model.extend({
		defaults: function() {
			return {
				bluetooth: false,
				language: "en",
				backgroundThreshold: 300,	
				cumulativeThreshold: 10000,
				dangerThreshold: 1400,
				soundEnabled: true,
				buttonsSoundEnabled: true,
				sensorSoundEnabled: true,
				thresholdSoundEnabled: true,
			}
		},
	});

	return new DeviceSettingsModel;
})