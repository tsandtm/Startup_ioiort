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
var router_1 = require('@angular/router');
var setting_service_1 = require('../shared/setting.service');
var SettingDetailComponent = (function () {
    function SettingDetailComponent(settingservice, _router, _route) {
        this.settingservice = settingservice;
        this._router = _router;
        this._route = _route;
        this.pageTitle = 'Setting Detail';
        console.log(this._route.snapshot.params['id']);
    }
    SettingDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.forEach(function (params) {
            console.log(params["id"] + 'aaaa');
            var id = +params["id"];
            _this.getSetting(id);
        });
    };
    SettingDetailComponent.prototype.getSetting = function (id) {
        var _this = this;
        this.settingservice.getOne(id)
            .then(function (setting) { return _this.setting = setting; });
    };
    SettingDetailComponent.prototype.Back = function () {
        this._router.navigate(['setting-list']);
    };
    SettingDetailComponent = __decorate([
        core_1.Component({
            templateUrl: '/setting/setting-detail/setting-detail.component.html'
        }), 
        __metadata('design:paramtypes', [setting_service_1.SettingService, router_1.Router, router_1.ActivatedRoute])
    ], SettingDetailComponent);
    return SettingDetailComponent;
}());
exports.SettingDetailComponent = SettingDetailComponent;
