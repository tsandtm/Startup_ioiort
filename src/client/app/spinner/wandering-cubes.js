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
var WanderingCubesComponent = (function () {
    function WanderingCubesComponent() {
        this.visible = true;
        this.delay = 0;
    }
    Object.defineProperty(WanderingCubesComponent.prototype, "isRunning", {
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
    WanderingCubesComponent.prototype.cancel = function () {
        clearTimeout(this.timeout);
        this.timeout = undefined;
    };
    WanderingCubesComponent.prototype.ngOnDestroy = function () {
        this.cancel();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], WanderingCubesComponent.prototype, "delay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], WanderingCubesComponent.prototype, "isRunning", null);
    WanderingCubesComponent = __decorate([
        core_1.Component({
            selector: 'sk-wandering-cubes',
            styles: ["\n    .wandering-cubes-spinner {\n      position: relative;\n      margin: 25px auto;\n      width: 40px;\n      height: 40px;\n    }\n    \n    .cube1,\n    .cube2 {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 15px;\n      height: 15px;\n      background-color: #333;\n    \n      -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;\n      animation: sk-cubemove 1.8s infinite ease-in-out;\n    }\n    \n    .cube2 {\n      -webkit-animation-delay: -0.9s;\n      animation-delay: -0.9s;\n    }\n    \n    @-webkit-keyframes sk-cubemove {\n      25% {\n        -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5)\n      }\n      50% {\n        -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg)\n      }\n      75% {\n        -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5)\n      }\n      100% {\n        -webkit-transform: rotate(-360deg)\n      }\n    }\n    \n    @keyframes sk-cubemove {\n      25% {\n        transform: translateX(42px) rotate(-90deg) scale(0.5);\n        -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);\n      }\n      50% {\n        transform: translateX(42px) translateY(42px) rotate(-179deg);\n        -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);\n      }\n      50.1% {\n        transform: translateX(42px) translateY(42px) rotate(-180deg);\n        -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);\n      }\n      75% {\n        transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\n        -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\n      }\n      100% {\n        transform: rotate(-360deg);\n        -webkit-transform: rotate(-360deg);\n      }\n    }\n  "],
            template: "\n    <div [hidden]=\"!visible\" class=\"wandering-cubes-spinner\">\n      <div class=\"cube1\"></div>\n      <div class=\"cube2\"></div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], WanderingCubesComponent);
    return WanderingCubesComponent;
}());
exports.WanderingCubesComponent = WanderingCubesComponent;
