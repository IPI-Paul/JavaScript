System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Video;
    return {
        setters:[],
        execute: function() {
            Video = (function () {
                function Video(id, title, videoUrl, desc) {
                    this.id = id;
                    this.title = title;
                    this.videoUrl = videoUrl;
                    this.desc = desc;
                }
                return Video;
            }());
            exports_1("Video", Video);
        }
    }
});
//# sourceMappingURL=video.js.map