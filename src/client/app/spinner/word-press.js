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
var WordPressComponent = (function () {
    function WordPressComponent() {
        this.visible = true;
        this.delay = 0;
    }
    Object.defineProperty(WordPressComponent.prototype, "isRunning", {
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
    WordPressComponent.prototype.cancel = function () {
        clearTimeout(this.timeout);
        this.timeout = undefined;
    };
    WordPressComponent.prototype.ngOnDestroy = function () {
        this.cancel();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], WordPressComponent.prototype, "delay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], WordPressComponent.prototype, "isRunning", null);
    WordPressComponent = __decorate([
        core_1.Component({
            selector: 'sk-word-press',
            styles: ["\n    .word-press-spinner {\n      position: relative;\n      margin: 25px auto;\n      width: 30px;\n      height: 30px;\n      border-radius: 30px;\n      background-color: #333;\n    \n      -webkit-animation: inner-circle 1s linear infinite;\n      animation: inner-circle 1s linear infinite;\n    }\n    \n    .inner-circle {\n      position: absolute;\n      top: 5px;\n      left: 5px;\n      display: block;\n      width: 8px;\n      height: 8px;\n      border-radius: 8px;\n      background: #fff;\n    }\n    \n    @-webkit-keyframes inner-circle {\n      0% {\n        -webkit-transform: rotate(0);\n      }\n      100% {\n        -webkit-transform: rotate(360deg);\n      }\n    }\n    \n    @keyframes inner-circle {\n      0% {\n        transform: rotate(0);\n        -webkit-transform: rotate(0);\n      }\n      100% {\n        transform: rotate(360deg);\n        -webkit-transform: rotate(360deg);\n      }\n    }\n  "],
            template: "\n    <div [hidden]=\"!visible\" class=\"word-press-spinner\">\n      <span class=\"inner-circle\"></span>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], WordPressComponent);
    return WordPressComponent;
}());
exports.WordPressComponent = WordPressComponent;
