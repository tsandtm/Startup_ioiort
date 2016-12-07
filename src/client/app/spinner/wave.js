"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var WaveComponent = (function () {
    function WaveComponent() {
        this.visible = true;
        this.delay = 0;
    }
    Object.defineProperty(WaveComponent.prototype, "isRunning", {
        set: function (value) {
            var _this = this;
            if (!value) {
                this.cancel();
                this.visible = false;
                return;
            }
            if (this.timeout) {
                return;
            }
            this.timeout = setTimeout(function () {
                _this.visible = true;
                _this.cancel();
            }, this.delay);
        },
        enumerable: true,
        configurable: true
    });
    WaveComponent.prototype.cancel = function () {
        clearTimeout(this.timeout);
        this.timeout = undefined;
    };
    WaveComponent.prototype.ngOnDestroy = function () {
        this.cancel();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], WaveComponent.prototype, "delay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], WaveComponent.prototype, "isRunning", null);
    WaveComponent = __decorate([
        core_1.Component({
            selector: 'sk-wave',
            styles: ["\n    .wave-spinner {\n      margin: 25px auto;\n      width: 42px;\n      height: 40px;\n    }\n    \n    .wave-spinner > div {\n      display: inline-block;\n      width: 5px;\n      height: 100%;\n      background-color: #333;\n    \n      -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;\n      animation: sk-stretchdelay 1.2s infinite ease-in-out;\n    }\n    \n    .wave-spinner .rect2 {\n      -webkit-animation-delay: -1.1s;\n      animation-delay: -1.1s;\n    }\n    \n    .wave-spinner .rect3 {\n      -webkit-animation-delay: -1.0s;\n      animation-delay: -1.0s;\n    }\n    \n    .wave-spinner .rect4 {\n      -webkit-animation-delay: -0.9s;\n      animation-delay: -0.9s;\n    }\n    \n    .wave-spinner .rect5 {\n      -webkit-animation-delay: -0.8s;\n      animation-delay: -0.8s;\n    }\n    \n    @-webkit-keyframes sk-stretchdelay {\n      0%, 40%, 100% {\n        -webkit-transform: scaleY(0.4)\n      }\n      20% {\n        -webkit-transform: scaleY(1.0)\n      }\n    }\n    \n    @keyframes sk-stretchdelay {\n      0%, 40%, 100% {\n        transform: scaleY(0.4);\n        -webkit-transform: scaleY(0.4);\n      }\n      20% {\n        transform: scaleY(1.0);\n        -webkit-transform: scaleY(1.0);\n      }\n    }\n  "],
            template: "\n    <div [hidden]=\"!visible\" class=\"wave-spinner\">\n      <div class=\"rect1\"></div>\n      <div class=\"rect2\"></div>\n      <div class=\"rect3\"></div>\n      <div class=\"rect4\"></div>\n      <div class=\"rect5\"></div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], WaveComponent);
    return WaveComponent;
}());
exports.WaveComponent = WaveComponent;
