require([
		"underscore",
		"model/DeviceSettings-model",
		"view/Device-view", 
		"view/MenuScreen-view",
		"view/SettingsScreen-view",
		"view/AboutScreen-view",
		"view/MeasurementScreen-view",
		"view/SplashScreen-view", 
		"view/MainMenuItem-view",
		"view/ViewMenuItem-view",
		"view/RadioMenuItem-view",
	],
	function(_, DeviceSettings, Device, MenuScreen, SettingsScreen, AboutScreen, MeasurementScreen, SplashScreen, MainMenuItem, ViewMenuItem, RadioMenuItem) {
		var MainMenu = new MenuScreen({
			items: [
				new MainMenuItem({title: "Измерение", iconPath: "img/menu-1.png", view: "measurement"}),
				new MainMenuItem({title: "Накоп. доза", iconPath: "img/menu-2.png"}),
				new MainMenuItem({title: "История", iconPath: "img/menu-3.png"}),
				new MainMenuItem({title: "Информация", iconPath: "img/menu-4.png"}),
				new MainMenuItem({title: "Настройки", iconPath: "img/menu-5.png", view: "settings"}),
				new MainMenuItem({title: "Время", iconPath: "img/menu-6.png"}),
				new MainMenuItem({title: "Проводник", iconPath: "img/menu-7.png"}),
				new MainMenuItem({title: "О программе", iconPath: "img/menu-8.png", view: "about"})
			]
		});

		var SettingsMenu = new SettingsScreen({
			items: [
				new ViewMenuItem({title: "Язык", icon: "lang", view: "langSettings"}),
				new ViewMenuItem({title: "Порог фона", icon: "level", view: "bgThresholdSettings"}),
				new ViewMenuItem({title: "Порог дозы", icon: "dose-level"}),
				new ViewMenuItem({title: "Звук", icon: "sound"}),
				new ViewMenuItem({title: "Экран", icon: "screen"}),
				new ViewMenuItem({title: "Питание", icon: "battery"}),
				new RadioMenuItem({
					title: "Блютуз", 
					icon: "bluetooth", 
					value: DeviceSettings.get("bluetooth"), 
					action: function() {
						this.value = !this.value;
						DeviceSettings.set("bluetooth", this.value);
					}
				}),
				new ViewMenuItem({title: "Выход", icon: "exit", view: "__prevScreen__"}),
			]
		});

		var LanguageSettingsMenu = new SettingsScreen({
			items: [
				new RadioMenuItem({
					title: "Русский",
					icon: "lang-ru",
					value: DeviceSettings.get("language") == "ru",
					action: function() {
						DeviceSettings.set("language", "ru");
					},
					afterInit: function() {
						DeviceSettings.bind('change:language', _.bind(function() {
							this.value = DeviceSettings.get("language") == "ru";
							this.render();							
						}, this));
					}
				}),
				new RadioMenuItem({
					title: "English",
					icon: "lang-en",
					value: DeviceSettings.get("language") == "en",
					action: function() {
						DeviceSettings.set("language", "en");
					},
					afterInit: function() {
						DeviceSettings.bind('change:language', _.bind(function() {
							this.value = DeviceSettings.get("language") == "en";
							this.render();							
						}, this));
					}
				}),
				new ViewMenuItem({title: "Выход", icon: "exit", view: "__prevScreen__"}),
			]
		});

		var BackgroundThresholdMenu = new SettingsScreen({
			items: [
				new RadioMenuItem({
					title: "0,3 uSv/h",
					value: DeviceSettings.get("backgroundThreshold") == 0.3,
					action: function() {
						DeviceSettings.set("backgroundThreshold", 0.3);
					},
					afterInit: function() {
						DeviceSettings.bind('change:backgroundThreshold', _.bind(function() {
							this.value = DeviceSettings.get("backgroundThreshold") == 0.3;
							this.render();							
						}, this));
					},
				}),
				new RadioMenuItem({
					title: "0,4 uSv/h",
					value: DeviceSettings.get("backgroundThreshold") == 0.4,
					action: function() {
						DeviceSettings.set("backgroundThreshold", 0.4);
					},
					afterInit: function() {
						DeviceSettings.bind('change:backgroundThreshold', _.bind(function() {
							this.value = DeviceSettings.get("backgroundThreshold") == 0.4;
							this.render();							
						}, this));
					},
				}),
				new RadioMenuItem({
					title: "0,5 uSv/h",
					value: DeviceSettings.get("backgroundThreshold") == 0.5,
					action: function() {
						DeviceSettings.set("backgroundThreshold", 0.5);
					},
					afterInit: function() {
						DeviceSettings.bind('change:backgroundThreshold', _.bind(function() {
							this.value = DeviceSettings.get("backgroundThreshold") == 0.5;
							this.render();							
						}, this));
					},
				}),
				new ViewMenuItem({title: "Выход", icon: "exit", view: "__prevScreen__"}),
			]
		})

		Device.addScreen("measurement", new MeasurementScreen);
		Device.addScreen("main", MainMenu);
		Device.addScreen("about", new AboutScreen);
		Device.addScreen("settings", SettingsMenu);
		Device.addScreen("langSettings", LanguageSettingsMenu);
		Device.addScreen("bgThresholdSettings", BackgroundThresholdMenu);
		Device.addScreen("splash", new SplashScreen);

		Device.setCurrentScreen("splash");
	}
);