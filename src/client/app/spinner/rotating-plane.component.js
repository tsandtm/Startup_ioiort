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
var RotatingPlaneComponent = (function () {
    function RotatingPlaneComponent() {
        this.visible = true;
        this.delay = 0;
    }
    Object.defineProperty(RotatingPlaneComponent.prototype, "isRunning", {
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
    RotatingPlaneComponent.prototype.cancel = function () {
        clearTimeout(this.timeout);
        this.timeout = undefined;
    };
    RotatingPlaneComponent.prototype.ngOnDestroy = function () {
        this.cancel();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RotatingPlaneComponent.prototype, "delay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], RotatingPlaneComponent.prototype, "isRunning", null);
    RotatingPlaneComponent = __decorate([
        core_1.Component({
            selector: 'sk-rotating-plane',
            styles: ["\n    .rotating-plane-spinner {\n      margin: 25px auto;\n      width: 40px;\n      height: 40px;\n      background-color: #333;\n    \n      -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;\n      animation: sk-rotateplane 1.2s infinite ease-in-out;\n    }\n    \n    @-webkit-keyframes sk-rotateplane {\n      0% {\n        -webkit-transform: perspective(120px)\n      }\n      50% {\n        -webkit-transform: perspective(120px) rotateY(180deg)\n      }\n      100% {\n        -webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg)\n      }\n    }\n    \n    @keyframes sk-rotateplane {\n      0% {\n        transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n        -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)\n      }\n      50% {\n        transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n        -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)\n      }\n      100% {\n        transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n        -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n      }\n    }\n  "],
            template: "\n    <div [hidden]=\"!visible\" class=\"rotating-plane-spinner\"></div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], RotatingPlaneComponent);
    return RotatingPlaneComponent;
}());
exports.RotatingPlaneComponent = RotatingPlaneComponent;
