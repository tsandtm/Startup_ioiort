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
var ChasingDotsComponent = (function () {
    function ChasingDotsComponent() {
        this.visible = true;
        this.delay = 0;
    }
    Object.defineProperty(ChasingDotsComponent.prototype, "isRunning", {
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
    ChasingDotsComponent.prototype.cancel = function () {
        clearTimeout(this.timeout);
        this.timeout = undefined;
    };
    ChasingDotsComponent.prototype.ngOnDestroy = function () {
        this.cancel();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ChasingDotsComponent.prototype, "delay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], ChasingDotsComponent.prototype, "isRunning", null);
    ChasingDotsComponent = __decorate([
        core_1.Component({
            selector: 'sk-chasing-dots',
            styles: ["\n    .chasing-dots-spinner {\n      position: relative;\n      margin: 25px auto;\n      width: 40px;\n      height: 40px;\n    \n      -webkit-animation: sk-rotate 2.0s infinite linear;\n      animation: sk-rotate 2.0s infinite linear;\n    }\n    \n    .dot1,\n    .dot2 {\n      position: absolute;\n      top: 0;\n      display: inline-block;\n      width: 60%;\n      height: 60%;\n      border-radius: 100%;\n      background-color: #333;\n    \n      -webkit-animation: sk-bounce 2.0s infinite ease-in-out;\n      animation: sk-bounce 2.0s infinite ease-in-out;\n    }\n    \n    .dot2 {\n      top: auto;\n      bottom: 0;\n      -webkit-animation-delay: -1.0s;\n      animation-delay: -1.0s;\n    }\n    \n    @-webkit-keyframes sk-rotate {\n      100% {\n        -webkit-transform: rotate(360deg)\n      }\n    }\n    \n    @keyframes sk-rotate {\n      100% {\n        transform: rotate(360deg);\n        -webkit-transform: rotate(360deg)\n      }\n    }\n    \n    @-webkit-keyframes sk-bounce {\n      0%, 100% {\n        -webkit-transform: scale(0.0)\n      }\n      50% {\n        -webkit-transform: scale(1.0)\n      }\n    }\n    \n    @keyframes sk-bounce {\n      0%, 100% {\n        transform: scale(0.0);\n        -webkit-transform: scale(0.0);\n      }\n      50% {\n        transform: scale(1.0);\n        -webkit-transform: scale(1.0);\n      }\n    }\n  "],
            template: "\n    <div [hidden]=\"!visible\" class=\"chasing-dots-spinner\">\n      <div class=\"dot1\"></div>\n      <div class=\"dot2\"></div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ChasingDotsComponent);
    return ChasingDotsComponent;
}());
exports.ChasingDotsComponent = ChasingDotsComponent;
