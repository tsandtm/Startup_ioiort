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
var FoldingCubeComponent = (function () {
    function FoldingCubeComponent() {
        this.visible = true;
        this.delay = 0;
    }
    Object.defineProperty(FoldingCubeComponent.prototype, "isRunning", {
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
    FoldingCubeComponent.prototype.cancel = function () {
        clearTimeout(this.timeout);
        this.timeout = undefined;
    };
    FoldingCubeComponent.prototype.ngOnDestroy = function () {
        this.cancel();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], FoldingCubeComponent.prototype, "delay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], FoldingCubeComponent.prototype, "isRunning", null);
    FoldingCubeComponent = __decorate([
        core_1.Component({
            selector: 'sk-folding-cube',
            styles: ["\n    .folding-cube-spinner {\n      position: relative;\n      margin: 25px auto;\n      width: 40px;\n      height: 40px;\n    \n      -webkit-transform: rotateZ(45deg);\n      transform: rotateZ(45deg);\n    }\n    \n    .folding-cube-spinner .cube {\n      position: relative;\n      float: left;\n      width: 50%;\n      height: 50%;\n      -webkit-transform: scale(1.1);\n      -ms-transform: scale(1.1);\n      transform: scale(1.1);\n    }\n    \n    .folding-cube-spinner .cube:before {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background-color: #333;\n      content: '';\n      -webkit-transform-origin: 100% 100%;\n      -ms-transform-origin: 100% 100%;\n      transform-origin: 100% 100%;\n      -webkit-animation: sk-foldCubeAngle 2.4s infinite linear both;\n      animation: sk-foldCubeAngle 2.4s infinite linear both;\n    }\n    \n    .folding-cube-spinner .cube2 {\n      -webkit-transform: scale(1.1) rotateZ(90deg);\n      transform: scale(1.1) rotateZ(90deg);\n    }\n    \n    .folding-cube-spinner .cube3 {\n      -webkit-transform: scale(1.1) rotateZ(180deg);\n      transform: scale(1.1) rotateZ(180deg);\n    }\n    \n    .folding-cube-spinner .cube4 {\n      -webkit-transform: scale(1.1) rotateZ(270deg);\n      transform: scale(1.1) rotateZ(270deg);\n    }\n    \n    .folding-cube-spinner .cube2:before {\n      -webkit-animation-delay: 0.3s;\n      animation-delay: 0.3s;\n    }\n    \n    .folding-cube-spinner .cube3:before {\n      -webkit-animation-delay: 0.6s;\n      animation-delay: 0.6s;\n    }\n    \n    .folding-cube-spinner .cube4:before {\n      -webkit-animation-delay: 0.9s;\n      animation-delay: 0.9s;\n    }\n    \n    @-webkit-keyframes sk-foldCubeAngle {\n      0%, 10% {\n        -webkit-transform: perspective(140px) rotateX(-180deg);\n        transform: perspective(140px) rotateX(-180deg);\n        opacity: 0;\n      }\n      25%, 75% {\n        -webkit-transform: perspective(140px) rotateX(0deg);\n        transform: perspective(140px) rotateX(0deg);\n        opacity: 1;\n      }\n      90%, 100% {\n        -webkit-transform: perspective(140px) rotateY(180deg);\n        transform: perspective(140px) rotateY(180deg);\n        opacity: 0;\n      }\n    }\n    \n    @keyframes sk-foldCubeAngle {\n      0%, 10% {\n        -webkit-transform: perspective(140px) rotateX(-180deg);\n        transform: perspective(140px) rotateX(-180deg);\n        opacity: 0;\n      }\n      25%, 75% {\n        -webkit-transform: perspective(140px) rotateX(0deg);\n        transform: perspective(140px) rotateX(0deg);\n        opacity: 1;\n      }\n      90%, 100% {\n        -webkit-transform: perspective(140px) rotateY(180deg);\n        transform: perspective(140px) rotateY(180deg);\n        opacity: 0;\n      }\n    }\n  "],
            template: "\n    <div [hidden]=\"!visible\" class=\"folding-cube-spinner\">\n      <div class=\"cube1 cube\"></div>\n      <div class=\"cube2 cube\"></div>\n      <div class=\"cube4 cube\"></div>\n      <div class=\"cube3 cube\"></div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], FoldingCubeComponent);
    return FoldingCubeComponent;
}());
exports.FoldingCubeComponent = FoldingCubeComponent;
