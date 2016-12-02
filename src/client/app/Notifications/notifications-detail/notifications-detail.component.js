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
var notifications_model_1 = require('../shared/notifications.model');
var notifications_service_1 = require('../shared/notifications.service');
var NotificationstDetailComponent = (function () {
    function NotificationstDetailComponent(_notificationsService, _router, _route) {
        this._notificationsService = _notificationsService;
        this._router = _router;
        this._route = _route;
        this.pageTitle = '';
    }
    NotificationstDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.forEach(function (params) {
            console.log(params["id"]);
            var id = +params["id"];
            _this.getNotifications(id);
            _this.getAllSentUser(id);
        });
    };
    NotificationstDetailComponent.prototype.getNotifications = function (id) {
        var _this = this;
        this._notificationsService.getNotifications(id)
            .then(function (notifications) { return _this.notifications = notifications; });
    };
    NotificationstDetailComponent.prototype.getAllSentUser = function (id) {
        var _this = this;
        this._notificationsService.getSendUser(id)
            .then(function (sent) { return _this.sentUser = sent; });
    };
    NotificationstDetailComponent.prototype.onBack = function () {
        this._router.navigate(['notification']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', notifications_model_1.Notifications)
    ], NotificationstDetailComponent.prototype, "notifications", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], NotificationstDetailComponent.prototype, "sentUser", void 0);
    NotificationstDetailComponent = __decorate([
        core_1.Component({
            templateUrl: '/notifications/notifications-detail/notifications-detail.component.html'
        }), 
        __metadata('design:paramtypes', [notifications_service_1.NotificationsService, router_1.Router, router_1.ActivatedRoute])
    ], NotificationstDetailComponent);
    return NotificationstDetailComponent;
}());
exports.NotificationstDetailComponent = NotificationstDetailComponent;
