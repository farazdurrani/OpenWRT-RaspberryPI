if ('define' in window) {
define("discourse/theme-16/pre-initializers/theme-16-translations", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: "theme-16-translations",
    initialize: function initialize() {
      /* Translation data for theme 16 (en)*/
      var data = {
        "en": {
          "warning_modal": {
            "title": "Are you posting code?",
            "content": "It looks like your post may contain code or logs. To keep your post readable, please remember to **format your code** using the *Preformatted text* toolbar button <kbd>`</>`</kbd>, or the backtick <kbd>`` ` `` </kbd> key on your keyboard, like so: ``  `inline-text` `` -or- </br>`` `` `` ``` `` `` ``</br>multiple lines</br>of text</br>`` `` `` ``` `` `` ``</br>See forum topic https://forum.openwrt.org/t/how-to-format-logs-scripts-configs-and-general-console-output/88905 for more examples.",
            "do_not_show_again": "Do not show this message again",
            "fix_post": "Edit Post",
            "ignore_and_post_anyway": "Post Anyway"
          }
        }
      };

      for (var lang in data) {
        var cursor = I18n.translations;

        for (var _i = 0, _arr = [lang, "js", "theme_translations"]; _i < _arr.length; _i++) {
          var key = _arr[_i];
          cursor = cursor[key] = cursor[key] || {};
        }

        cursor[16] = data[lang];
      }
    }
  };
  _exports.default = _default;
});
}
