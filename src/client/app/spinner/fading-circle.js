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
var FadingCircleComponent = (function () {
    function FadingCircleComponent() {
        this.visible = true;
        this.delay = 0;
    }
    Object.defineProperty(FadingCircleComponent.prototype, "isRunning", {
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
    FadingCircleComponent.prototype.cancel = function () {
        clearTimeout(this.timeout);
        this.timeout = undefined;
    };
    FadingCircleComponent.prototype.ngOnDestroy = function () {
        this.cancel();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], FadingCircleComponent.prototype, "delay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], FadingCircleComponent.prototype, "isRunning", null);
    FadingCircleComponent = __decorate([
        core_1.Component({
            selector: 'sk-fading-circle',
            styles: ["\n    .fading-circle-spinner {\n      position: relative;\n      margin: 25px auto;\n      width: 40px;\n      height: 40px;\n    }\n    \n    .fading-circle-spinner .circle {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n    }\n    \n    .fading-circle-spinner .circle:before {\n      display: block;\n      margin: 0 auto;\n      width: 15%;\n      height: 15%;\n      border-radius: 100%;\n      background-color: #333;\n      content: '';\n      -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\n      animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\n    }\n    \n    .fading-circle-spinner .circle2 {\n      -webkit-transform: rotate(30deg);\n      -ms-transform: rotate(30deg);\n      transform: rotate(30deg);\n    }\n    \n    .fading-circle-spinner .circle3 {\n      -webkit-transform: rotate(60deg);\n      -ms-transform: rotate(60deg);\n      transform: rotate(60deg);\n    }\n    \n    .fading-circle-spinner .circle4 {\n      -webkit-transform: rotate(90deg);\n      -ms-transform: rotate(90deg);\n      transform: rotate(90deg);\n    }\n    \n    .fading-circle-spinner .circle5 {\n      -webkit-transform: rotate(120deg);\n      -ms-transform: rotate(120deg);\n      transform: rotate(120deg);\n    }\n    \n    .fading-circle-spinner .circle6 {\n      -webkit-transform: rotate(150deg);\n      -ms-transform: rotate(150deg);\n      transform: rotate(150deg);\n    }\n    \n    .fading-circle-spinner .circle7 {\n      -webkit-transform: rotate(180deg);\n      -ms-transform: rotate(180deg);\n      transform: rotate(180deg);\n    }\n    \n    .fading-circle-spinner .circle8 {\n      -webkit-transform: rotate(210deg);\n      -ms-transform: rotate(210deg);\n      transform: rotate(210deg);\n    }\n    \n    .fading-circle-spinner .circle9 {\n      -webkit-transform: rotate(240deg);\n      -ms-transform: rotate(240deg);\n      transform: rotate(240deg);\n    }\n    \n    .fading-circle-spinner .circle10 {\n      -webkit-transform: rotate(270deg);\n      -ms-transform: rotate(270deg);\n      transform: rotate(270deg);\n    }\n    \n    .fading-circle-spinner .circle11 {\n      -webkit-transform: rotate(300deg);\n      -ms-transform: rotate(300deg);\n      transform: rotate(300deg);\n    }\n    \n    .fading-circle-spinner .circle12 {\n      -webkit-transform: rotate(330deg);\n      -ms-transform: rotate(330deg);\n      transform: rotate(330deg);\n    }\n    \n    .fading-circle-spinner .circle2:before {\n      -webkit-animation-delay: -1.1s;\n      animation-delay: -1.1s;\n    }\n    \n    .fading-circle-spinner .circle3:before {\n      -webkit-animation-delay: -1s;\n      animation-delay: -1s;\n    }\n    \n    .fading-circle-spinner .circle4:before {\n      -webkit-animation-delay: -0.9s;\n      animation-delay: -0.9s;\n    }\n    \n    .fading-circle-spinner .circle5:before {\n      -webkit-animation-delay: -0.8s;\n      animation-delay: -0.8s;\n    }\n    \n    .fading-circle-spinner .circle6:before {\n      -webkit-animation-delay: -0.7s;\n      animation-delay: -0.7s;\n    }\n    \n    .fading-circle-spinner .circle7:before {\n      -webkit-animation-delay: -0.6s;\n      animation-delay: -0.6s;\n    }\n    \n    .fading-circle-spinner .circle8:before {\n      -webkit-animation-delay: -0.5s;\n      animation-delay: -0.5s;\n    }\n    \n    .fading-circle-spinner .circle9:before {\n      -webkit-animation-delay: -0.4s;\n      animation-delay: -0.4s;\n    }\n    \n    .fading-circle-spinner .circle10:before {\n      -webkit-animation-delay: -0.3s;\n      animation-delay: -0.3s;\n    }\n    \n    .fading-circle-spinner .circle11:before {\n      -webkit-animation-delay: -0.2s;\n      animation-delay: -0.2s;\n    }\n    \n    .fading-circle-spinner .circle12:before {\n      -webkit-animation-delay: -0.1s;\n      animation-delay: -0.1s;\n    }\n    \n    @-webkit-keyframes sk-circleFadeDelay {\n      0%, 39%, 100% {\n        opacity: 0;\n      }\n      40% {\n        opacity: 1;\n      }\n    }\n    \n    @keyframes sk-circleFadeDelay {\n      0%, 39%, 100% {\n        opacity: 0;\n      }\n      40% {\n        opacity: 1;\n      }\n    }\n  "],
            template: "\n    <div [hidden]=\"!visible\" class=\"fading-circle-spinner\">\n      <div class=\"circle1 circle\"></div>\n      <div class=\"circle2 circle\"></div>\n      <div class=\"circle3 circle\"></div>\n      <div class=\"circle4 circle\"></div>\n      <div class=\"circle5 circle\"></div>\n      <div class=\"circle6 circle\"></div>\n      <div class=\"circle7 circle\"></div>\n      <div class=\"circle8 circle\"></div>\n      <div class=\"circle9 circle\"></div>\n      <div class=\"circle10 circle\"></div>\n      <div class=\"circle11 circle\"></div>\n      <div class=\"circle12 circle\"></div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], FadingCircleComponent);
    return FadingCircleComponent;
}());
exports.FadingCircleComponent = FadingCircleComponent;
