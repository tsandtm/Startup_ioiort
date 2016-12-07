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
    }
    SettingCreateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settingservice.getAllSetting().then(function (setting1) { return _this.setting1 = setting1; });
    };
    SettingCreateComponent.prototype.Create = function () {
        var _this = this;
        var i = 0;
        var n = 1;
        var t = 0;
        for (var _i = 0, _a = this.setting1; _i < _a.length; _i++) {
            var s = _a[_i];
            if (this.apikey == s.APIKey && i == 0) {
                this.alertapi = "API Key đã được sử dụng!!!!";
                i++;
            }
            if (this.appname == s.AppName && t == 0) {
                this.alertname = "AppName đã được sử dụng!!!!";
                t++;
            }
            n = s.AppID + 1;
        }
        if (i == 0) {
            this.alertapi = "";
        }
        if (t == 0) {
            this.alertname = "";
        }
        console.log(this.apikey + '' + this.appname + '' + n);
        if (this.appname == undefined || this.appname == "") {
            this.alertname = "Chưa nhập AppName!!!!!";
            i++;
        }
        if (this.apikey == undefined || this.apikey == "") {
            this.alertapi = "Chưa nhập API Key!!!!!";
            t++;
        }
        if (i == 0) {
            this.alertapi = "";
        }
        if (t == 0) {
            this.alertname = "";
        }
        if (i == 0 && t == 0) {
            if (this.trangthai == undefined)
                this.trangthai = false;
            this.ngaytao = new Date().toLocaleDateString("en-US") + '';
            this.setting = {
                AppID: n,
                APIKey: this.apikey,
                IsActive: this.trangthai,
                NgayTao: this.ngaytao,
                AppName: this.appname,
            };
            this.alertapi = "";
            this.alertname = "";
            this.settingservice.Create(this.setting).then(function (result) { return _this._router.navigate(['setting-list']); });
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
