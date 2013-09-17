define([
	"view/EventDriven-view",
	"collection/Measurements-collection",
	"i18n/i18n"
	], function(EventDrivenView, MeasurementsCollection, i18n) {	
		var EnvironmentView;
		EnvironmentView = EventDrivenView.extend({
			el: $('#environment'),
			events: {
				"click .selector a": "change",
				"click .close": "close",
				"click .open": "open"
			},
			initialize: function() {
				this.$selector = this.$el.find('.selector');
				this.$dialog = this.$el.find('.dialog');
				this.$link = this.$el.find('.open');
				this.environments = {
					'normal': {
						name: 'Normal',
						caption: 'Fruits',
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
						caption: 'Building materials',
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
						caption: 'Toys',
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
				this.eventBus.bind("device.screen.update", _.bind(this.render, this))
				this.render();
			},
			render: function() {
				this.$el.find('a.open').text(i18n.t("Select the measured product"));
				this.$el.find('h2').text(i18n.t("Select the measured product"));
				this.$selector.empty();
				_.each(this.environments, function(item, key) {
					this.$selector.append(
						$('<li>')
							.addClass(key)
							.html(
								$('<a>')
									.attr('href', '#')
									.attr('data-value', key)
									.text(i18n.t(item.caption))
							)
					)
				}, this);
				return this;
			},
			change: function(event) {
				MeasurementsCollection.setLevels(this.environments[$(event.target).data('value')].levels);
				this.$el.attr('class', $(event.target).data('value'));
				this.close();
				return false;
			},
			close: function() {
				this.$link.show();
				this.$dialog.hide();
				return false;
			},
			open: function() {
				this.$link.hide();
				this.$dialog.show();
				return false;
			}
		});

		return new EnvironmentView;
	}
);