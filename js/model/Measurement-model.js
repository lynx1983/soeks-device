define(["backbone"], function(Backbone) {
	var MeasurementModel;

	MeasurementModel = Backbone.Model.extend({
		defaults: function() {
			return {
				value: 0,
				tag: "",
				timestamp: new Date().getTime(),
			}
		},
	});

	return MeasurementModel;
})