System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var PlaylistComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            PlaylistComponent = (function () {
                function PlaylistComponent() {
                }
                PlaylistComponent.prototype.ngOnInit = function () {
                    if (("" + this.video).startsWith("file:")) {
                        this.isUrl = true;
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], PlaylistComponent.prototype, "video", void 0);
                PlaylistComponent = __decorate([
                    core_1.Component({
                        selector: 'playlist',
                        templateUrl: 'app/html/playlist.component.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], PlaylistComponent);
                return PlaylistComponent;
            }());
            exports_1("PlaylistComponent", PlaylistComponent);
        }
    }
});
//# sourceMappingURL=playlist.component.js.map