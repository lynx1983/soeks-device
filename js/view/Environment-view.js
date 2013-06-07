define([
	"backbone",
	"collection/Measurements-collection",
	], function(Backbone, MeasurementsCollection) {	
		var EnvironmentView;
		EnvironmentView = Backbone.View.extend({
			el: $('#environment'),
			events: {
				"change .selector": "change"
			},
			initialize: function() {
				this.selector = this.$el.find('.selector');
				this.environments = {
					'normal': {
						name: 'Normal',
						levels: [{
								probability: .80,
								minimum: 100,
								maximum: 300,
							},
							{
								probability: .17,
								minimum: 300,
								maximum: 400,
							},
							{
								probability: .02,
								minimum: 400,
								maximum: 1200,
							},
							{
								probability: .01,
								minimum: 1200,
								maximum: 1300,
							}
						]
					},
					'increased': {
						name: 'Increased',
						levels: [{
								probability: .97,
								minimum: 400,
								maximum: 1200,
							},
							{
								probability: .03,
								minimum: 1200,
								maximum: 1500,
							}
						]
					},
					'dangerous': {
						name: 'Dangerous',
						levels: [{
								probability: .90,
								minimum: 1200,
								maximum: 3000,
							},
							{
								probability: .07,
								minimum: 3000,
								maximum: 5000,
							},
						]
					},
				}
				this.render();
			},
			render: function() {
				_.each(this.environments, function(item, key) {
					this.selector.append(
						$('<option>')
							.attr('value', key)
							.text(item.name)
					)
				}, this);
				return this;
			},
			change: function() {
				MeasurementsCollection.setLevels(this.environments[this.selector.val()].levels);
			}
		});

		return new EnvironmentView;
	}
);