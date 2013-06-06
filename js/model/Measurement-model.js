define(["backbone"], function(Backbone) {
	var MeasurementModel;

	MeasurementModel = Backbone.Model.extend({
		defaults: function() {
			return {
				leftValue: 0,
				rightValue: 0,
				readiness: 0,
				timestamp: new Date().getTime(),
			}
		},
		getValue: function() {
			return (this.get("leftValue") + this.get("rightValue")) / 2;
		},
	});

	return MeasurementModel;
})