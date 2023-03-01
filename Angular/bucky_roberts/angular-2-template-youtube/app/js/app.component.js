System.register(['angular2/core', './config.service', './video', './playlist.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, config_service_1, video_1, playlist_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_service_1_1) {
                config_service_1 = config_service_1_1;
            },
            function (video_1_1) {
                video_1 = video_1_1;
            },
            function (playlist_component_1_1) {
                playlist_component_1 = playlist_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.mainHeading = config_service_1.Config.MAIN_HEADING;
                    this.videos = [
                        new video_1.Video(1, 'Angular 2 Pt1', 'file:/run/media/paul/3830-6532/Tutorials/Angular/Angular 2 for Beginners - Tutorial 1 - Getting Started.mp4', 'Tutorial 1'),
                        new video_1.Video(2, 'Angular 2 Pt2', 'file:/run/media/paul/3830-6532/Tutorials/Angular/Angular 2 for Beginners - Tutorial 2 - Overview and Core Concepts.mp4', 'Tutorial 2')
                    ];
                }
                AppComponent.prototype.setId = function (idx) {
                    var _this = this;
                    this.idx = idx;
                    console.log(this.videos.find(function (x) { return x.id === _this.idx; }));
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/html/app.component.html',
                        styleUrls: ['app/css/app.component.css'],
                        directives: [playlist_component_1.PlaylistComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map