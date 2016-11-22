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
var core_1 = require('@angular/core');
var yeucauban_service_1 = require('../shared/yeucauban.service');
var YeucaubanListComponent = (function () {
    function YeucaubanListComponent(_yeucaubanService) {
        this._yeucaubanService = _yeucaubanService;
        this.pageTitle = '';
        this.imageWidth = 230;
        this.imageHeight = 150;
    }
    YeucaubanListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._yeucaubanService.getList()
            .then(function (yeucauban) { return _this.yeucauban = yeucauban; });
    };
    YeucaubanListComponent = __decorate([
        core_1.Component({
            templateUrl: '/yeucauban/yeucauban-list/yeucauban-list.component.html',
            styleUrls: ['yeucauban/yeucauban-list/yeucauban-list.component.css']
        }), 
        __metadata('design:paramtypes', [yeucauban_service_1.YeucaubanService])
    ], YeucaubanListComponent);
    return YeucaubanListComponent;
}());
exports.YeucaubanListComponent = YeucaubanListComponent;
