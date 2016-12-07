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
var SettingListComponent = (function () {
    // paged items
    function SettingListComponent(
        // private $confirm: AngularConfirm.IConfirmModalFactory,
        _route, _router, _SettingService) {
        this._route = _route;
        this._router = _router;
        this._SettingService = _SettingService;
        this.pageTitle = 'Setting List';
        this.pager = {};
    }
    SettingListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._SettingService.getCount().then(function (result) { return _this.id = result; })
            .then(function (result) { return _this.setPage(1); });
    };
    SettingListComponent.prototype.setPage = function (page) {
        var _this = this;
        if (this.id != undefined) {
            console.log("abeeee" + this.id);
            if (page < 1 || page > this.pager.totalPages) {
                return;
            }
            this.pager = this._SettingService.getPager(this.id, page);
            // get current page of items
            this._SettingService.getAllSettingPT(this.pager.startIndex).then(function (itempages) { return _this.itempages = itempages; });
        }
    };
    SettingListComponent.prototype.Delete = function (s) {
        var _this = this;
        // console.log(s.servername);
        this._SettingService.Delete(s).then(function (result) { return _this._router.navigate(['setting-list']); });
    };
    SettingListComponent = __decorate([
        core_1.Component({
            templateUrl: '/setting/setting-list/setting-list.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, setting_service_1.SettingService])
    ], SettingListComponent);
    return SettingListComponent;
}());
exports.SettingListComponent = SettingListComponent;
