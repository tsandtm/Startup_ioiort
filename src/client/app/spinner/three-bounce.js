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
var ThreeBounceComponent = (function () {
    function ThreeBounceComponent() {
        this.visible = true;
        this.delay = 0;
    }
    Object.defineProperty(ThreeBounceComponent.prototype, "isRunning", {
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
    ThreeBounceComponent.prototype.cancel = function () {
        clearTimeout(this.timeout);
        this.timeout = undefined;
    };
    ThreeBounceComponent.prototype.ngOnDestroy = function () {
        this.cancel();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ThreeBounceComponent.prototype, "delay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], ThreeBounceComponent.prototype, "isRunning", null);
    ThreeBounceComponent = __decorate([
        core_1.Component({
            selector: 'sk-three-bounce',
            styles: ["\n    .three-bounce-spinner {\n      margin: 25px auto;\n      width: 70px;\n    }\n    \n    .three-bounce-spinner > div {\n      display: inline-block;\n      width: 18px;\n      height: 18px;\n    \n      border-radius: 100%;\n      background-color: #333;\n      -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n      animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n    }\n    \n    .three-bounce-spinner .bounce1 {\n      -webkit-animation-delay: -0.32s;\n      animation-delay: -0.32s;\n    }\n    \n    .three-bounce-spinner .bounce2 {\n      -webkit-animation-delay: -0.16s;\n      animation-delay: -0.16s;\n    }\n    \n    @-webkit-keyframes sk-bouncedelay {\n      0%, 80%, 100% {\n        -webkit-transform: scale(0)\n      }\n      40% {\n        -webkit-transform: scale(1.0)\n      }\n    }\n    \n    @keyframes sk-bouncedelay {\n      0%, 80%, 100% {\n        -webkit-transform: scale(0);\n        transform: scale(0);\n      }\n      40% {\n        -webkit-transform: scale(1.0);\n        transform: scale(1.0);\n      }\n    }\n  "],
            template: "\n    <div [hidden]=\"!visible\" class=\"three-bounce-spinner\">\n      <div class=\"bounce1\"></div>\n      <div class=\"bounce2\"></div>\n      <div class=\"bounce3\"></div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ThreeBounceComponent);
    return ThreeBounceComponent;
}());
exports.ThreeBounceComponent = ThreeBounceComponent;
