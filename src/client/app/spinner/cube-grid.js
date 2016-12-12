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
var CubeGridComponent = (function () {
    function CubeGridComponent() {
        this.visible = true;
        this.delay = 0;
    }
    Object.defineProperty(CubeGridComponent.prototype, "isRunning", {
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
    CubeGridComponent.prototype.cancel = function () {
        clearTimeout(this.timeout);
        this.timeout = undefined;
    };
    CubeGridComponent.prototype.ngOnDestroy = function () {
        this.cancel();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CubeGridComponent.prototype, "delay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], CubeGridComponent.prototype, "isRunning", null);
    CubeGridComponent = __decorate([
        core_1.Component({
            selector: 'sk-cube-grid',
            styles: ["\n    .cube-grid-spinner {\n      margin: 25px auto;\n      width: 40px;\n      height: 40px;\n    }\n    \n    .cube-grid-spinner .cube {\n      float: left;\n      width: 33%;\n      height: 33%;\n      background-color: #333;\n    \n      -webkit-animation: cubeGridScaleDelay 1.3s infinite ease-in-out;\n      animation: cubeGridScaleDelay 1.3s infinite ease-in-out;\n    }\n    \n    .cube-grid-spinner .cube1 {\n      -webkit-animation-delay: 0.2s;\n      animation-delay: 0.2s;\n    }\n    \n    .cube-grid-spinner .cube2 {\n      -webkit-animation-delay: 0.3s;\n      animation-delay: 0.3s;\n    }\n    \n    .cube-grid-spinner .cube3 {\n      -webkit-animation-delay: 0.4s;\n      animation-delay: 0.4s;\n    }\n    \n    .cube-grid-spinner .cube4 {\n      -webkit-animation-delay: 0.1s;\n      animation-delay: 0.1s;\n    }\n    \n    .cube-grid-spinner .cube5 {\n      -webkit-animation-delay: 0.2s;\n      animation-delay: 0.2s;\n    }\n    \n    .cube-grid-spinner .cube6 {\n      -webkit-animation-delay: 0.3s;\n      animation-delay: 0.3s;\n    }\n    \n    .cube-grid-spinner .cube7 {\n      -webkit-animation-delay: 0s;\n      animation-delay: 0s;\n    }\n    \n    .cube-grid-spinner .cube8 {\n      -webkit-animation-delay: 0.1s;\n      animation-delay: 0.1s;\n    }\n    \n    .cube-grid-spinner .cube9 {\n      -webkit-animation-delay: 0.2s;\n      animation-delay: 0.2s;\n    }\n    \n    @-webkit-keyframes cubeGridScaleDelay {\n      0%, 70%, 100% {\n        -webkit-transform: scale3D(1, 1, 1);\n        transform: scale3D(1, 1, 1);\n      }\n      35% {\n        -webkit-transform: scale3D(0, 0, 1);\n        transform: scale3D(0, 0, 1);\n      }\n    }\n    \n    @keyframes cubeGridScaleDelay {\n      0%, 70%, 100% {\n        -webkit-transform: scale3D(1, 1, 1);\n        transform: scale3D(1, 1, 1);\n      }\n      35% {\n        -webkit-transform: scale3D(0, 0, 1);\n        transform: scale3D(0, 0, 1);\n      }\n    }\n  "],
            template: "\n    <div [hidden]=\"!visible\" class=\"cube-grid-spinner\">\n      <div class=\"cube cube1\"></div>\n      <div class=\"cube cube2\"></div>\n      <div class=\"cube cube3\"></div>\n      <div class=\"cube cube4\"></div>\n      <div class=\"cube cube5\"></div>\n      <div class=\"cube cube6\"></div>\n      <div class=\"cube cube7\"></div>\n      <div class=\"cube cube8\"></div>\n      <div class=\"cube cube9\"></div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], CubeGridComponent);
    return CubeGridComponent;
}());
exports.CubeGridComponent = CubeGridComponent;
