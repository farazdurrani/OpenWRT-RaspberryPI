if ('define' in window) {
define("discourse/theme-6/initializers/theme-field-10-common-html-script-1", ["exports", "discourse/lib/plugin-api"], function (_exports, _pluginApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var settings = require("discourse/lib/theme-settings-store").getObjectForTheme(6);

  var themePrefix = function themePrefix(key) {
    return "theme_translations.6.".concat(key);
  };

  var _default = {
    name: "theme-field-10-common-html-script-1",
    after: "inject-objects",
    initialize: function initialize() {
      (0, _pluginApi.withPluginApi)("0.8", function (api) {
        api.replaceIcon('d-liked', 'thumbs-up');
        api.replaceIcon('d-unliked', 'far-thumbs-up');
        api.replaceIcon('notification.liked', 'far-thumbs-up');
        api.replaceIcon('notification.liked_2', 'far-thumbs-up');
        api.replaceIcon('notification.liked_many', 'far-thumbs-up');
        api.replaceIcon('notification.liked_consolidated', 'far-thumbs-up');
        api.replaceIcon('heart', 'thumbs-up');
      });
    }
  };
  _exports.default = _default;
});
}
