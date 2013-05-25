require([
		"underscore",
		"view/Device-view", 
		"view/TopPanel-view", 
		"view/BottomPanel-view", 
		"view/MenuScreen-view", 
		"view/AboutScreen-view", 
		"collection/MenuItem-collection",
		"model/MenuItem-model"
	],
	function(_, DeviceView, TopPanelView, BottomPanelView, MenuScreen, AboutScreen, MenuItemCollection, MenuItem) {
		var EventBus = _.extend({}, Backbone.Events);

		var Device = new DeviceView({
			topPanel: new TopPanelView({
				eventBus: EventBus
			}),
			bottomPanel: new BottomPanelView({
				eventBus: EventBus				
			}),
			eventBus: EventBus,
		});		

		var AboutMenuItem = new MenuItem({title: "About"});
		var SettingsMenuItem = new MenuItem({title: "Settings"});

		var MenuItemCollection = new MenuItemCollection([
			new MenuItem({title: "Измерение", icon: "img/menu-1.png"}),
			new MenuItem({title: "Накоп. доза", icon: "img/menu-2.png"}),
			new MenuItem({title: "История", icon: "img/menu-3.png"}),
			new MenuItem({title: "Информация", icon: "img/menu-4.png"}),
			new MenuItem({title: "Настройки", icon: "img/menu-5.png"}),
			new MenuItem({title: "Время", icon: "img/menu-6.png"}),
			new MenuItem({title: "Проводник", icon: "img/menu-7.png"}),
			new MenuItem({title: "О программе", icon: "img/menu-8.png", view: "about"})
		]);

		var MainMenuScreen = new MenuScreen({
			collection: MenuItemCollection,
			eventBus: EventBus,
		});

		Device.addScreen("main", MainMenuScreen);
		Device.addScreen("about", new AboutScreen({eventBus: EventBus}));

		Device.setCurrentScreen("main");
	}
);