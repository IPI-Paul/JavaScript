System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Config;
    return {
        setters:[],
        execute: function() {
            Config = (function () {
                function Config() {
                }
                Config.MAIN_HEADING = 'My Favourite Videos';
                Config.apiUrl = 'http://localhost:5000';
                return Config;
            }());
            exports_1("Config", Config);
        }
    }
});
//# sourceMappingURL=config.service.js.map