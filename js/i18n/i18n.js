define(["underi18n", "model/DeviceSettings-model", "event/EventBus-event", "./lang/ru"], function(underi18n, DeviceSettings, EventBus, ru) {
  var i18n;
  i18n = (function() {
    function i18n() {
      DeviceSettings.bind('change:language', _.bind(this.onLangChange, this));
      this.t = underi18n.MessageFactory({});
      this.eventBus = EventBus;
      this.languages = {
        'en': {},
        'ru': ru
      };
    }

    i18n.prototype.onLangChange = function(model, lang) {
      console.log("Language changed to '" + lang + "'");
      if (this.languages[lang]) {
        this.t = underi18n.MessageFactory(this.languages[lang]);
        return this.eventBus.trigger("device.screen.update");
      }
    };

    i18n.prototype.t = function() {};

    return i18n;

  })();
  return new i18n;
});
