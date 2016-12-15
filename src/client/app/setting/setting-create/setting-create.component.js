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
var SettingCreateComponent = (function () {
    function SettingCreateComponent(settingservice, _router, _route) {
        this.settingservice = settingservice;
        this._router = _router;
        this._route = _route;
        this.pageTitle = 'Setting Create';
        this.n = 1;
    }
    SettingCreateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settingservice.getAppID().then(function (result) { return _this.n = result; });
    };
    SettingCreateComponent.prototype.Create = function () {
        var _this = this;
        this.setting = undefined;
        this.settingservice.getAPI(this.apikey).then(function (result) { return _this.setting = result; })
            .then(function (result) { return _this.setAPI(); }).then(function (result) { return _this.setAPINull(); });
        this.setting = undefined;
        this.settingservice.getAppName(this.appname).then(function (result) { return _this.setting = result; })
            .then(function (result) { return _this.setAppName(); }).then(function (result) { return _this.setAppNameNull(); });
        if (this.i == 0 && this.t == 0) {
            if (this.trangthai == undefined)
                this.trangthai = false;
            this.ngaytao = new Date().toLocaleDateString("en-US") + '';
            this.setting = {
                AppID: this.n,
                APIKey: this.apikey,
                IsActive: this.trangthai,
                NgayTao: this.ngaytao,
                AppName: this.appname,
            };
            this.settingservice.Create(this.setting).then(function (result) { return _this._router.navigate(['setting-list']); });
        }
    };
    SettingCreateComponent.prototype.setAppNameNull = function () {
        if (this.appname == undefined || this.appname == "") {
            this.alertname = "Chưa nhập AppName!!!!!";
            this.i = 1;
        }
    };
    SettingCreateComponent.prototype.setAPINull = function () {
        if (this.apikey == undefined || this.apikey == "") {
            this.alertapi = "Chưa nhập API Key!!!!!";
            this.t = 1;
        }
    };
    SettingCreateComponent.prototype.setAPI = function () {
        if (this.setting != undefined) {
            this.alertapi = "API Key đã được sử dụng!!!!";
            this.i = 1;
        }
        else {
            this.alertapi = "";
            this.i = 0;
        }
    };
    SettingCreateComponent.prototype.setAppName = function () {
        if (this.setting != undefined) {
            this.alertname = "AppName đã được sử dụng!!!!";
            this.t = 1;
        }
        else {
            this.alertname = "";
            this.t = 0;
        }
    };
    SettingCreateComponent.prototype.Back = function () {
        this._router.navigate(['setting-list']);
    };
    SettingCreateComponent = __decorate([
        core_1.Component({
            templateUrl: '/setting/setting-create/setting-create.component.html',
            styleUrls: ['/setting/setting-create/setting-create.component.css']
        }), 
        __metadata('design:paramtypes', [setting_service_1.SettingService, router_1.Router, router_1.ActivatedRoute])
    ], SettingCreateComponent);
    return SettingCreateComponent;
}());
exports.SettingCreateComponent = SettingCreateComponent;
