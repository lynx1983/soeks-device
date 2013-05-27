require([
		"underscore",
		"view/Device-view", 
		"view/MenuScreen-view",
		"view/SettingsScreen-view",
		"view/AboutScreen-view", 
		"view/SplashScreen-view", 
		"collection/MenuItem-collection",
		"model/MenuItem-model",
		"model/DeviceSettings-model",
	],
	function(_, Device, MenuScreen, SettingsScreen, AboutScreen, SplashScreen, MenuItemCollection, MenuItem, DeviceSettings) {
		var MainMenu = new MenuItemCollection([
			new MenuItem({title: "Измерение", icon: "img/menu-1.png"}),
			new MenuItem({title: "Накоп. доза", icon: "img/menu-2.png"}),
			new MenuItem({title: "История", icon: "img/menu-3.png"}),
			new MenuItem({title: "Информация", icon: "img/menu-4.png"}),
			new MenuItem({title: "Настройки", icon: "img/menu-5.png", view: "settings"}),
			new MenuItem({title: "Время", icon: "img/menu-6.png"}),
			new MenuItem({title: "Проводник", icon: "img/menu-7.png"}),
			new MenuItem({title: "О программе", icon: "img/menu-8.png", view: "about"})
		]);

		var MainMenuScreen = new MenuScreen({
			collection: MainMenu,
		});

		var SettingsMenu = new MenuItemCollection([
			new MenuItem({title: "Язык", icon: "img/settings-lang-icon.png"}),
			new MenuItem({title: "Порог фона", icon: "img/settings-level-icon.png"}),
			new MenuItem({title: "Порог дозы", icon: "img/settings-dose-level-icon.png"}),
			new MenuItem({title: "Звук", icon: "img/settings-sound-icon.png"}),
			new MenuItem({title: "Экран", icon: "img/settings-screen-icon.png"}),
			new MenuItem({title: "Питание", icon: "img/settings-battery-icon.png"}),
			new MenuItem({
				title: "Блютуз", 
				icon: "img/settings-bt-icon.png", 
				type: "radio", 
				value: DeviceSettings.get("bluetooth"), 
				action: function() {
					this.set("value", !this.get("value"));
					DeviceSettings.set("bluetooth", this.get("value"))
				}
			}),
			new MenuItem({title: "Выход", icon: "img/settings-back-icon.png", view: "__prevScreen__"}),
		]);

		var SettingsScreen = new SettingsScreen({
			collection: SettingsMenu,
		});

		Device.addScreen("main", MainMenuScreen);
		Device.addScreen("about", new AboutScreen);
		Device.addScreen("settings", SettingsScreen);
		Device.addScreen("splash", new SplashScreen);

		Device.setCurrentScreen("splash");
	}
);