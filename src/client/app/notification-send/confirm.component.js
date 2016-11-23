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
var notifi_model_1 = require('./shared/notifi.model');
var app_service_1 = require('./shared/app.service');
var notifi_service_1 = require('./shared/notifi.service');
var pushservice_service_1 = require('./shared/pushservice.service');
var ConfirmComponent = (function () {
    function ConfirmComponent(appService, notifiservice, pushservice, _router, _route) {
        this.appService = appService;
        this.notifiservice = notifiservice;
        this.pushservice = pushservice;
        this._router = _router;
        this._route = _route;
    }
    ConfirmComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.forEach(function (params) {
            var id = +params["id"];
            _this.getNotifi(id).then(function (result) {
                if (_this.notifi.SendTag.length == 0 && _this.notifi.SendUser.length == 0) {
                    _this.getSLDenied(id);
                    _this.getSentUserDenied(id);
                }
                else {
                    _this.getSL(id);
                    _this.getSentUser(id);
                }
                _this.getAppkey(_this.notifi.AppID);
            });
        });
    };
    ConfirmComponent.prototype.Push = function () {
        this.pushservice.sendMessage(this.appkey.APIKey, this.token, this.notifi.TieuDe, this.notifi.Noidung);
    };
    ConfirmComponent.prototype.getNotifi = function (id) {
        var _this = this;
        return this.notifiservice.getOne(id)
            .then(function (notifi) {
            _this.notifi = notifi;
            if (_this.notifi.DoUuTien == 1) {
                _this.Douutien = "Normal";
            }
            else if (_this.notifi.DoUuTien == 2) {
                _this.Douutien = "High";
            }
        });
    };
    ConfirmComponent.prototype.getSentUser = function (id) {
        var _this = this;
        this.notifiservice.getSendUser(id)
            .then(function (sent) {
            _this.sentUser = sent;
        });
    };
    ConfirmComponent.prototype.getSL = function (id) {
        var _this = this;
        this.notifiservice.getSL(id)
            .then(function (sl) {
            _this.sl = sl;
        });
    };
    ConfirmComponent.prototype.getSentUserDenied = function (id) {
        var _this = this;
        this.notifiservice.getSendUserDenied(id)
            .then(function (sent) {
            _this.sentUser = sent;
        });
    };
    ConfirmComponent.prototype.getSLDenied = function (id) {
        var _this = this;
        this.notifiservice.getSLDenied(id)
            .then(function (sl) {
            _this.sl = sl;
        });
    };
    ConfirmComponent.prototype.getAppkey = function (id) {
        var _this = this;
        this.appService.getAppkey(id).then(function (key) { return _this.appkey = key; });
    };
    ConfirmComponent.prototype.Update = function (status) {
        var _this = this;
        this._route.params.forEach(function (params) {
            var id = +params["id"];
            _this.updatedata = {
                Trangthai: status,
                NotifiID: id };
            _this.notifiservice.Update(_this.updatedata);
        });
    };
    ConfirmComponent.prototype.Insert = function () {
        var _this = this;
        this.sentUser.forEach(function (element) {
            _this.insertUser = {
                ContactID: element.ContactID,
                NotifiID: element.NotifiID,
                TrangThai: null,
                ThoiGianDaGoi: null,
                ThoiGianCanGoi: null,
                LogLoi: null,
                SoLanGoi: null
            };
            _this.notifiservice.Insert(_this.insertUser);
        });
        this._router.navigate(['welcome']);
    };
    ConfirmComponent.prototype.SaveAsDraft = function () {
        this._router.navigate(['welcome']);
    };
    ConfirmComponent.prototype.Finish = function () {
        this.now = new Date();
        this.date = new Date(this.notifi.Thoigiangui);
        if (this.date > this.now) {
            this.Update(0);
        }
        else {
            this.Update(1);
        }
        this.Insert();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', notifi_model_1.Notifi)
    ], ConfirmComponent.prototype, "notifi", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', notifi_model_1.SLSend)
    ], ConfirmComponent.prototype, "sl", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ConfirmComponent.prototype, "sentUser", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', notifi_model_1.UpdateData)
    ], ConfirmComponent.prototype, "updatedata", void 0);
    ConfirmComponent = __decorate([
        core_1.Component({
            templateUrl: '/notification-send/confirm.component.html',
            providers: [app_service_1.AppService, notifi_service_1.NotifiService, pushservice_service_1.PushService]
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService, notifi_service_1.NotifiService, pushservice_service_1.PushService, router_1.Router, router_1.ActivatedRoute])
    ], ConfirmComponent);
    return ConfirmComponent;
}());
exports.ConfirmComponent = ConfirmComponent;
