require([
		"underscore",
		"domReady",
		"i18n/i18n",
		"model/DeviceSettings-model",
		"view/Device-view", 
		"view/MenuScreen-view",
		"view/SettingsScreen-view",
		"view/AboutScreen-view",
		"view/MeasurementScreen-view",
		"view/CumulativeDoseScreen-view",
		"view/HistoryScreen-view",
		"view/SplashScreen-view", 
		"view/MainMenuItem-view",
		"view/ViewMenuItem-view",
		"view/RadioMenuItem-view",
		"view/CheckboxMenuItem-view",
		"view/Environment-view"
	],
	function(_, domReady, i18n, DeviceSettings, Device, MenuScreen, SettingsScreen, AboutScreen, MeasurementScreen, CumulativeDoseScreen, HistoryScreen, SplashScreen, MainMenuItem, ViewMenuItem, RadioMenuItem, CheckboxMenuItem, Environment) {
		domReady(function() {
			var MainMenu = new MenuScreen({
				items: [
					new MainMenuItem({title: "Measurement", iconPath: "img/menu-1.png", view: "measurement"}),
					new MainMenuItem({title: "Накоп. доза", iconPath: "img/menu-2.png", view: "cumulativeDose"}),
					new MainMenuItem({title: "History", iconPath: "img/menu-3.png", view: "history"}),
					new MainMenuItem({title: "Information", iconPath: "img/menu-4.png", view: "about"}),
					new MainMenuItem({title: "Settings", iconPath: "img/menu-5.png", view: "settings"}),
					new MainMenuItem({title: "Date/time", iconPath: "img/menu-6.png", view: "datetime"}),
					new MainMenuItem({title: "Explorer", iconPath: "img/menu-7.png", view: "explorer"}),
					new MainMenuItem({title: "About", iconPath: "img/menu-8.png", view: "about"})
				]
			});

			var SettingsMenu = new SettingsScreen({
				items: [
					new ViewMenuItem({title: "Language", icon: "lang", view: "langSettings"}),
					new ViewMenuItem({title: "Порог фона", icon: "level", view: "bgThresholdSettings"}),
					new ViewMenuItem({title: "Порог дозы", icon: "dose-level", view: "doseThresholdSettings"}),
					new ViewMenuItem({title: "Sound", icon: "sound", view: "soundSettings"}),
					new ViewMenuItem({title: "Экран", icon: "screen"}),
					new ViewMenuItem({title: "Power", icon: "battery", view: "batterySettings"}),
					new RadioMenuItem({
						title: "Bluetooth", 
						icon: "bluetooth", 
						value: DeviceSettings.get("bluetooth"), 
						action: function() {
							this.value = !this.value;
							DeviceSettings.set("bluetooth", this.value);
						}
					}),
					new ViewMenuItem({title: "Exit", icon: "exit", view: "__prevScreen__"}),
				]
			});

			var DateTimeMenu = new SettingsScreen({
				items: [
					new ViewMenuItem({title: "Date/Time", icon: "datetime"}),
					new ViewMenuItem({title: "Будильник", icon: "alarm"}),
					new ViewMenuItem({title: "Exit", icon: "exit", view: "__prevScreen__"}),
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
					new ViewMenuItem({title: "Exit", icon: "exit", view: "__prevScreen__"}),
				]
			});

			var SoundSettingsMenu = new SettingsScreen({
				items: [
					new CheckboxMenuItem({
						title: "Enable",
						icon: "sound-enabled",
						value: DeviceSettings.get("soundEnabled"),
						action: function() {
							DeviceSettings.set("soundEnabled", !this.value);
						},
						afterInit: function() {
							DeviceSettings.bind('change:soundEnabled', _.bind(function() {
								this.value = DeviceSettings.get("soundEnabled");
								this.render();							
							}, this));
						},
					}),
					new CheckboxMenuItem({
						title: "Buttons",
						icon: "buttons-sound",
						value: DeviceSettings.get("buttonsSoundEnabled"),
						action: function() {
							DeviceSettings.set("buttonsSoundEnabled", !this.value);
						},
						afterInit: function() {
							DeviceSettings.bind('change:buttonsSoundEnabled', _.bind(function() {
								this.value = DeviceSettings.get("buttonsSoundEnabled");
								this.render();							
							}, this));
						},
					}),
					new CheckboxMenuItem({
						title: "Sensor",
						icon: "sensor-sound",
						value: DeviceSettings.get("sensorSoundEnabled"),
						action: function() {
							DeviceSettings.set("sensorSoundEnabled", !this.value);
						},
						afterInit: function() {
							DeviceSettings.bind('change:sensorSoundEnabled', _.bind(function() {
								this.value = DeviceSettings.get("sensorSoundEnabled");
								this.render();							
							}, this));
						},
					}),
					new CheckboxMenuItem({
						title: "Level",
						icon: "threshold-sound",
						value: DeviceSettings.get("thresholdSoundEnabled"),
						action: function() {
							DeviceSettings.set("thresholdSoundEnabled", !this.value);
						},
						afterInit: function() {
							DeviceSettings.bind('change:thresholdSoundEnabled', _.bind(function() {
								this.value = DeviceSettings.get("thresholdSoundEnabled");
								this.render();							
							}, this));
						},
					}),
					new ViewMenuItem({title: "Exit", icon: "exit", view: "__prevScreen__"}),
				]
			});

			var BatterySettingsMenu = new SettingsScreen({
				items: [
					new ViewMenuItem({
						title: "Батареи",
						icon: "battery-settings",
					}),
					new ViewMenuItem({
						title: "Аккумуляторы",
						icon: "accumulator-settings",
					}),
					new ViewMenuItem({
						title: "Auto off",
						icon: "autooff-settings",
					}),
					new ViewMenuItem({title: "Exit", icon: "exit", view: "__prevScreen__"}),
				]
			});

			var BackgroundThresholdMenu = new SettingsScreen({
				items: [
					new RadioMenuItem({
						title: "0,3 uSv/h",
						value: DeviceSettings.get("backgroundThreshold") == 300,
						action: function() {
							DeviceSettings.set("backgroundThreshold", 300);
						},
						afterInit: function() {
							DeviceSettings.bind('change:backgroundThreshold', _.bind(function() {
								this.value = DeviceSettings.get("backgroundThreshold") == 300;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "0,4 uSv/h",
						value: DeviceSettings.get("backgroundThreshold") == 400,
						action: function() {
							DeviceSettings.set("backgroundThreshold", 400);
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
						value: DeviceSettings.get("backgroundThreshold") == 500,
						action: function() {
							DeviceSettings.set("backgroundThreshold", 500);
						},
						afterInit: function() {
							DeviceSettings.bind('change:backgroundThreshold', _.bind(function() {
								this.value = DeviceSettings.get("backgroundThreshold") == 500;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "0,6 uSv/h",
						value: DeviceSettings.get("backgroundThreshold") == 600,
						action: function() {
							DeviceSettings.set("backgroundThreshold", 600);
						},
						afterInit: function() {
							DeviceSettings.bind('change:backgroundThreshold', _.bind(function() {
								this.value = DeviceSettings.get("backgroundThreshold") == 600;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "0,7 uSv/h",
						value: DeviceSettings.get("backgroundThreshold") == 700,
						action: function() {
							DeviceSettings.set("backgroundThreshold", 700);
						},
						afterInit: function() {
							DeviceSettings.bind('change:backgroundThreshold', _.bind(function() {
								this.value = DeviceSettings.get("backgroundThreshold") == 700;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "0,8 uSv/h",
						value: DeviceSettings.get("backgroundThreshold") == 800,
						action: function() {
							DeviceSettings.set("backgroundThreshold", 800);
						},
						afterInit: function() {
							DeviceSettings.bind('change:backgroundThreshold', _.bind(function() {
								this.value = DeviceSettings.get("backgroundThreshold") == 800;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "0,9 uSv/h",
						value: DeviceSettings.get("backgroundThreshold") == 900,
						action: function() {
							DeviceSettings.set("backgroundThreshold", 900);
						},
						afterInit: function() {
							DeviceSettings.bind('change:backgroundThreshold', _.bind(function() {
								this.value = DeviceSettings.get("backgroundThreshold") == 900;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "1,0 uSv/h",
						value: DeviceSettings.get("backgroundThreshold") == 1000,
						action: function() {
							DeviceSettings.set("backgroundThreshold", 1000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:backgroundThreshold', _.bind(function() {
								this.value = DeviceSettings.get("backgroundThreshold") == 1000;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "1,2 uSv/h",
						value: DeviceSettings.get("backgroundThreshold") == 1200,
						action: function() {
							DeviceSettings.set("backgroundThreshold", 1200);
						},
						afterInit: function() {
							DeviceSettings.bind('change:backgroundThreshold', _.bind(function() {
								this.value = DeviceSettings.get("backgroundThreshold") == 1200;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "1,5 uSv/h",
						value: DeviceSettings.get("backgroundThreshold") == 1500,
						action: function() {
							DeviceSettings.set("backgroundThreshold", 1500);
						},
						afterInit: function() {
							DeviceSettings.bind('change:backgroundThreshold', _.bind(function() {
								this.value = DeviceSettings.get("backgroundThreshold") == 1500;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "2,0 uSv/h",
						value: DeviceSettings.get("backgroundThreshold") == 2000,
						action: function() {
							DeviceSettings.set("backgroundThreshold", 2000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:backgroundThreshold', _.bind(function() {
								this.value = DeviceSettings.get("backgroundThreshold") == 2000;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "5,0 uSv/h",
						value: DeviceSettings.get("backgroundThreshold") == 5000,
						action: function() {
							DeviceSettings.set("backgroundThreshold", 5000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:backgroundThreshold', _.bind(function() {
								this.value = DeviceSettings.get("backgroundThreshold") == 5000;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "10,0 uSv/h",
						value: DeviceSettings.get("backgroundThreshold") == 10000,
						action: function() {
							DeviceSettings.set("backgroundThreshold", 10000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:backgroundThreshold', _.bind(function() {
								this.value = DeviceSettings.get("backgroundThreshold") == 10000;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "30,0 uSv/h",
						value: DeviceSettings.get("backgroundThreshold") == 30000,
						action: function() {
							DeviceSettings.set("backgroundThreshold", 30000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:backgroundThreshold', _.bind(function() {
								this.value = DeviceSettings.get("backgroundThreshold") == 30000;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "60,0 uSv/h",
						value: DeviceSettings.get("backgroundThreshold") == 60000,
						action: function() {
							DeviceSettings.set("backgroundThreshold", 60000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:backgroundThreshold', _.bind(function() {
								this.value = DeviceSettings.get("backgroundThreshold") == 60000;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "100,0 uSv/h",
						value: DeviceSettings.get("backgroundThreshold") == 100000,
						action: function() {
							DeviceSettings.set("backgroundThreshold", 100000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:backgroundThreshold', _.bind(function() {
								this.value = DeviceSettings.get("backgroundThreshold") == 100000;
								this.render();							
							}, this));
						},
					}),
					new ViewMenuItem({title: "Exit", icon: "exit", view: "__prevScreen__"}),
				]
			});

			var DoseThresholdMenu = new SettingsScreen({
				items: [
					new RadioMenuItem({
						title: "0,01 mSv/h",
						value: DeviceSettings.get("cumulativeThreshold") == 10000,
						action: function() {
							DeviceSettings.set("cumulativeThreshold", 10000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:cumulativeThreshold', _.bind(function() {
								this.value = DeviceSettings.get("cumulativeThreshold") == 10000;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "0,05 mSv/h",
						value: DeviceSettings.get("cumulativeThreshold") == 50000,
						action: function() {
							DeviceSettings.set("cumulativeThreshold", 50000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:cumulativeThreshold', _.bind(function() {
								this.value = DeviceSettings.get("cumulativeThreshold") == 50000;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "0,1 mSv/h",
						value: DeviceSettings.get("cumulativeThreshold") == 100000,
						action: function() {
							DeviceSettings.set("cumulativeThreshold", 100000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:cumulativeThreshold', _.bind(function() {
								this.value = DeviceSettings.get("cumulativeThreshold") == 100000;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "0,5 mSv/h",
						value: DeviceSettings.get("cumulativeThreshold") == 50000,
						action: function() {
							DeviceSettings.set("cumulativeThreshold", 50000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:cumulativeThreshold', _.bind(function() {
								this.value = DeviceSettings.get("cumulativeThreshold") == 50000;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "1,0 mSv/h",
						value: DeviceSettings.get("cumulativeThreshold") == 1000000,
						action: function() {
							DeviceSettings.set("cumulativeThreshold", 1000000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:cumulativeThreshold', _.bind(function() {
								this.value = DeviceSettings.get("cumulativeThreshold") == 1000000;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "5,0 mSv/h",
						value: DeviceSettings.get("cumulativeThreshold") == 5000000,
						action: function() {
							DeviceSettings.set("cumulativeThreshold", 5000000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:cumulativeThreshold', _.bind(function() {
								this.value = DeviceSettings.get("cumulativeThreshold") == 5000000;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "10,0 mSv/h",
						value: DeviceSettings.get("cumulativeThreshold") == 10000000,
						action: function() {
							DeviceSettings.set("cumulativeThreshold", 10000000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:cumulativeThreshold', _.bind(function() {
								this.value = DeviceSettings.get("cumulativeThreshold") == 10000000;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "50,0 mSv/h",
						value: DeviceSettings.get("cumulativeThreshold") == 50000000,
						action: function() {
							DeviceSettings.set("cumulativeThreshold", 50000000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:cumulativeThreshold', _.bind(function() {
								this.value = DeviceSettings.get("cumulativeThreshold") == 50000000;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "0,1 Sv/h",
						value: DeviceSettings.get("cumulativeThreshold") == 100000000,
						action: function() {
							DeviceSettings.set("cumulativeThreshold", 100000000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:cumulativeThreshold', _.bind(function() {
								this.value = DeviceSettings.get("cumulativeThreshold") == 100000000;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "0,5 Sv/h",
						value: DeviceSettings.get("cumulativeThreshold") == 500000000,
						action: function() {
							DeviceSettings.set("cumulativeThreshold", 500000000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:cumulativeThreshold', _.bind(function() {
								this.value = DeviceSettings.get("cumulativeThreshold") == 500000000;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "1,0 Sv/h",
						value: DeviceSettings.get("cumulativeThreshold") == 1000000000,
						action: function() {
							DeviceSettings.set("cumulativeThreshold", 1000000000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:cumulativeThreshold', _.bind(function() {
								this.value = DeviceSettings.get("cumulativeThreshold") == 1000000000;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "5,0 Sv/h",
						value: DeviceSettings.get("cumulativeThreshold") == 5000000000,
						action: function() {
							DeviceSettings.set("cumulativeThreshold", 5000000000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:cumulativeThreshold', _.bind(function() {
								this.value = DeviceSettings.get("cumulativeThreshold") == 5000000000;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "10,0 Sv/h",
						value: DeviceSettings.get("cumulativeThreshold") == 10000000000,
						action: function() {
							DeviceSettings.set("cumulativeThreshold", 10000000000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:cumulativeThreshold', _.bind(function() {
								this.value = DeviceSettings.get("cumulativeThreshold") == 10000000000;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "50,0 Sv/h",
						value: DeviceSettings.get("cumulativeThreshold") == 50000000000,
						action: function() {
							DeviceSettings.set("cumulativeThreshold", 50000000000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:cumulativeThreshold', _.bind(function() {
								this.value = DeviceSettings.get("cumulativeThreshold") == 50000000000;
								this.render();							
							}, this));
						},
					}),
					new RadioMenuItem({
						title: "100,0 Sv/h",
						value: DeviceSettings.get("cumulativeThreshold") == 100000000000,
						action: function() {
							DeviceSettings.set("cumulativeThreshold", 100000000000);
						},
						afterInit: function() {
							DeviceSettings.bind('change:cumulativeThreshold', _.bind(function() {
								this.value = DeviceSettings.get("cumulativeThreshold") == 100000000000;
								this.render();							
							}, this));
						},
					}),
					new ViewMenuItem({title: "Exit", icon: "exit", view: "__prevScreen__"}),
				]
			});

			var ExplorerSettingsMenu = new SettingsScreen({
				items: [
					new ViewMenuItem({
						title: "Каталог",
						icon: "folder",
					}),
					new CheckboxMenuItem({
						title: "Исполняемые",
						icon: "exe",
						value: true,
						action: function() {
							this.value = !this.value
						},
					}),
					new CheckboxMenuItem({
						title: "Текстовые",
						icon: "txt",
						value: true,
						action: function() {
							this.value = !this.value
						},
					}),
					new CheckboxMenuItem({
						title: "Графические",
						icon: "image",
						value: true,
						action: function() {
							this.value = !this.value
						},
					}),
					new CheckboxMenuItem({
						title: "Системные",
						icon: "sys",
						value: true,
						action: function() {
							this.value = !this.value
						},
					}),
					new ViewMenuItem({title: "Exit", icon: "exit", view: "__prevScreen__"}),
				]
			});

			Device.addScreen("measurement", new MeasurementScreen);
			Device.addScreen("cumulativeDose", new CumulativeDoseScreen);
			Device.addScreen("history", new HistoryScreen);
			Device.addScreen("main", MainMenu);
			Device.addScreen("about", new AboutScreen);
			Device.addScreen("settings", SettingsMenu);
			Device.addScreen("langSettings", LanguageSettingsMenu);
			Device.addScreen("bgThresholdSettings", BackgroundThresholdMenu);
			Device.addScreen("doseThresholdSettings", DoseThresholdMenu);
			Device.addScreen("soundSettings", SoundSettingsMenu);
			Device.addScreen("batterySettings", BatterySettingsMenu);
			Device.addScreen("splash", new SplashScreen);
			Device.addScreen("datetime", DateTimeMenu);
			Device.addScreen("explorer", ExplorerSettingsMenu);

			DeviceSettings.set({
				language:'en'
      			//language: (navigator.language || navigator.userLanguage || 'en').substring(0, 2)
    		});

			Device.setCurrentScreen("splash");
		});
	}
);