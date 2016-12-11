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
var PulseComponent = (function () {
    function PulseComponent() {
        this.visible = true;
        this.delay = 0;
    }
    Object.defineProperty(PulseComponent.prototype, "isRunning", {
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
    PulseComponent.prototype.cancel = function () {
        clearTimeout(this.timeout);
        this.timeout = undefined;
    };
    PulseComponent.prototype.ngOnDestroy = function () {
        this.cancel();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PulseComponent.prototype, "delay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], PulseComponent.prototype, "isRunning", null);
    PulseComponent = __decorate([
        core_1.Component({
            selector: 'sk-pulse',
            styles: ["\n    .pulse-spinner {\n      margin: 25px auto;\n      width: 40px;\n      height: 40px;\n      border-radius: 100%;\n    \n      background-color: #333;\n      -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;\n      animation: sk-scaleout 1.0s infinite ease-in-out;\n    }\n    \n    @-webkit-keyframes sk-scaleout {\n      0% {\n        -webkit-transform: scale(0)\n      }\n      100% {\n        -webkit-transform: scale(1.0);\n        opacity: 0;\n      }\n    }\n    \n    @keyframes sk-scaleout {\n      0% {\n        -webkit-transform: scale(0);\n        transform: scale(0);\n      }\n      100% {\n        -webkit-transform: scale(1.0);\n        transform: scale(1.0);\n        opacity: 0;\n      }\n    }\n  "],
            template: "\n    <div [hidden]=\"!visible\" class=\"pulse-spinner\"></div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], PulseComponent);
    return PulseComponent;
}());
exports.PulseComponent = PulseComponent;
