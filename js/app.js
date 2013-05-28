require([
		"underscore",
		"view/Device-view", 
		"view/MenuScreen-view",
		"view/SettingsScreen-view",
		"view/AboutScreen-view", 
		"view/SplashScreen-view", 
		"view/MainMenuItem-view",
		//"model/DeviceSettings-model",
	],
	function(_, Device, MenuScreen, SettingsScreen, AboutScreen, SplashScreen, MainMenuItem) {
		var MainMenu = new MenuScreen({
			items: [
				new MainMenuItem({title: "Измерение", icon: "img/menu-1.png"}),
				new MainMenuItem({title: "Накоп. доза", icon: "img/menu-2.png"}),
				new MainMenuItem({title: "История", icon: "img/menu-3.png"}),
				new MainMenuItem({title: "Информация", icon: "img/menu-4.png"}),
				new MainMenuItem({title: "Настройки", icon: "img/menu-5.png", view: "settings"}),
				new MainMenuItem({title: "Время", icon: "img/menu-6.png"}),
				new MainMenuItem({title: "Проводник", icon: "img/menu-7.png"}),
				new MainMenuItem({title: "О программе", icon: "img/menu-8.png", view: "about"})
			]
		});

		/*var SettingsMenu = SettingsScreen({
			items: [
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
			]
		})*/

		Device.addScreen("main", MainMenu);
		Device.addScreen("about", new AboutScreen);
		//Device.addScreen("settings", SettingsMenu);
		Device.addScreen("splash", new SplashScreen);

		Device.setCurrentScreen("splash");
	}
);