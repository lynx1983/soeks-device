define(["backbone"], function(Backbone) {	
	var MenuItemView;
	MenuItemView = Backbone.View.extend({
		tagName: "li",
		
		template: _.template($('#menuitem-template').html()),

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
		},
		
		render: function() {
			console("Menu item render");
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
	return MenuItemView;
});