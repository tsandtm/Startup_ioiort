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
var app_service_1 = require('./shared/app.service');
var notifi_service_1 = require('./shared/notifi.service');
var contact_service_1 = require('./shared/contact.service');
var tag_service_1 = require('./shared/tag.service');
var notifications_service_1 = require('../shared/notifications.service');
var notifications_model_1 = require('../shared/notifications.model');
var NotificationstDetailEditComponent = (function () {
    function NotificationstDetailEditComponent(_notificationsService, appService, notifiservice, tagservice, contactservice, _router, _route) {
        this._notificationsService = _notificationsService;
        this.appService = appService;
        this.notifiservice = notifiservice;
        this.tagservice = tagservice;
        this.contactservice = contactservice;
        this._router = _router;
        this._route = _route;
        this.optionsTag = {
            placeholder: "+ Tag",
            secondaryPlaceholder: "Tag",
        };
        this.optionsContact = {
            placeholder: "+ Contact",
            secondaryPlaceholder: "Contact",
        };
        this.optionsTagDenied = {
            placeholder: "+ Tag Denied",
            secondaryPlaceholder: "Tag Denied",
        };
        this.optionsContactDenied = {
            placeholder: "+ Contact Denied",
            secondaryPlaceholder: "Contact Denied",
        };
        //Tag
        this.ACTag = [];
        this.ACTagItem = [];
        this.listIDTag = [];
        //Contact    
        this.ACContact = [];
        this.ACContactItem = [];
        this.listIDContact = [];
        //TagDenied
        this.ACTagDenied = [];
        this.ACTagDeniedItem = [];
        this.listIDTagDenied = [];
        //ContactDenied
        this.ACContactDenied = [];
        this.ACContactDeniedItem = [];
        this.listIDContactDenied = [];
        //----//
        this.sendnow = true;
        this.sendlater = false;
        this.AppID = 1;
        this.thoiHanDV = "Week";
        this.thoiHannum = 1;
        this.doUuTien = 1;
        this.Trangthai = 2;
        this.hour = 12;
        this.minute = 0;
        this.pageTitle = 'Notification';
    }
    NotificationstDetailEditComponent.prototype.TagAdded = function (item) {
        var pos = item.indexOf('.');
        var num = item.slice(0, pos);
        this.listIDTag.push(parseInt(num));
    };
    NotificationstDetailEditComponent.prototype.TagRemoved = function (item) {
        var pos = item.indexOf('.');
        var num = item.slice(0, pos);
        this.delPos(this.listIDTag, parseInt(num));
    };
    NotificationstDetailEditComponent.prototype.ContactAdded = function (item) {
        var pos = item.indexOf('.');
        var num = item.slice(0, pos);
        this.listIDContact.push(parseInt(num));
    };
    NotificationstDetailEditComponent.prototype.ContactRemoved = function (item) {
        var pos = item.indexOf('.');
        var num = item.slice(0, pos);
        this.delPos(this.listIDContact, parseInt(num));
    };
    // public TagDeniedAdded(item:string) {
    //     var pos=item.indexOf('.');
    //     var num=item.slice(0,pos);
    //     this.listIDTag.push(parseInt(num));
    // }
    // public TagDeniedRemoved(item:string) {
    //     var pos=item.indexOf('.');
    //     var num=item.slice(0,pos);
    //     this.delPos(this.listIDTag,parseInt(num));
    // }
    // public ContactDeniedAdded(item:string) {
    //     var pos=item.indexOf('.');
    //     var num=item.slice(0,pos);
    //     this.listIDContact.push(parseInt(num));
    //     console.log(this.listIDContact.toString());
    // }
    // public ContactDeniedRemoved(item:string) {
    //     var pos=item.indexOf('.');
    //     var num=item.slice(0,pos);
    //     this.delPos(this.listIDContact,parseInt(num));
    //     console.log(this.listIDContact.toString());
    // }
    NotificationstDetailEditComponent.prototype.delPos = function (ar, key) {
        for (var i = 0; i <= ar.length; i++) {
            if (ar[i] == key) {
                ar.splice(i, 1);
            }
        }
    };
    NotificationstDetailEditComponent.prototype.loop = function (min, max) {
        var input = [];
        for (var i = min; i < max; i++) {
            input.push(i);
        }
        return input;
    };
    NotificationstDetailEditComponent.prototype.getNotifi = function () {
        var _this = this;
        this.notifiservice.getLastNotifi()
            .then(function (notifi) { return _this.notifi = notifi; });
    };
    NotificationstDetailEditComponent.prototype.getTag = function () {
        var _this = this;
        this.tagservice.getAllTag().then(function (tag) {
            _this.Tag = tag;
            _this.Tag.forEach(function (element) {
                _this.ACTagItem.push(element.TagID + '.' + element.TagNameDisplay);
            });
        });
    };
    NotificationstDetailEditComponent.prototype.getContact = function () {
        var _this = this;
        this.contactservice.getAllContact().then(function (contact) {
            _this.Contact = contact;
            _this.Contact.forEach(function (element) {
                _this.ACContactItem.push(element.ContactID + '.' + element.TaiKhoan);
            });
        });
    };
    NotificationstDetailEditComponent.prototype.sendnowclick = function () {
        this.sendnow = true;
        this.sendlater = false;
    };
    NotificationstDetailEditComponent.prototype.sendlaterclick = function () {
        this.sendnow = false;
        this.sendlater = true;
    };
    NotificationstDetailEditComponent.prototype.Create = function () {
        var _this = this;
        this.date = new Date(this.date);
        if (this.sendnow) {
            this.date = new Date();
            this.Thoigiangui = this.date.toLocaleDateString('en-US') + ' ' + this.date.toLocaleTimeString();
        }
        else if (this.sendlater) {
            this.Thoigiangui = this.date.toLocaleDateString('en-US') + ' ' + this.hour + ":" + this.minute + ":00";
        }
        if (this.thoiHanDV == "Week") {
            this.date.setDate(this.date.getDate() + (7 * this.thoiHannum));
        }
        if (this.thoiHanDV == "Day") {
            this.date.setDate(this.date.getDate() + parseInt(this.thoiHannum.toString()));
        }
        if (this.thoiHanDV == "Hour") {
            this.date.setDate(this.date.getDate());
            this.date.setHours(this.date.getHours() + parseInt(this.thoiHannum.toString()));
        }
        if (this.thoiHanDV == "Minute") {
            this.date.setDate(this.date.getDate());
            this.date.setMinutes(this.date.getMinutes() + parseInt(this.thoiHannum.toString()));
        }
        if (this.notifi == null) {
            this.notifiID = 1;
        }
        else {
            this.notifiID = this.notifi.NotifiID + 1;
        }
        if (this.sendlater) {
            this.ThoiHan = this.date.toLocaleDateString('en-US') + ' ' + this.hour + ":" + this.minute + ":00";
        }
        else {
            this.ThoiHan = this.date.toLocaleDateString('en-US') + ' ' + this.date.toLocaleTimeString();
        }
        this.notifi = { AppID: this.AppID,
            NotifiID: this.notifiID,
            TieuDe: this.tieude,
            Noidung: this.Noidung,
            DoUuTien: this.doUuTien,
            Trangthai: this.Trangthai,
            Soluong: 1,
            Thoigiangui: this.Thoigiangui,
            ThoiHan: this.ThoiHan,
            SendTag: this.listIDTag,
            SendUser: this.listIDContact,
            DeniedTag: this.listIDTagDenied,
            DeniedUser: this.listIDContactDenied };
        this.notifiservice.Create(this.notifi).then(function (result) { return _this._router.navigate(['confirm', _this.notifi.NotifiID]); });
    };
    NotificationstDetailEditComponent.prototype.loadGetAll = function () {
        var _this = this;
        this.appService.getApp().then(function (result) { return _this.Apps = result; });
    };
    NotificationstDetailEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadGetAll();
        this.getNotifi();
        this.getTag();
        this.getContact();
        this.loophour = this.loop(1, 24);
        this.loopminute = this.loop(0, 60);
        this.loophourTH = this.loop(5, 24);
        this.loopminuteTH = this.loop(5, 60);
        this.loopdayTH = this.loop(5, 28);
        this._route.params.forEach(function (params) {
            console.log(params["id"]);
            var id = +params["id"];
            _this.getNotifications(id);
        });
    };
    NotificationstDetailEditComponent.prototype.getNotifications = function (id) {
        var _this = this;
        this._notificationsService.getNotifications(id)
            .then(function (notifications) { return _this.notifications = notifications; });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', notifications_model_1.Notifications)
    ], NotificationstDetailEditComponent.prototype, "notifications", void 0);
    NotificationstDetailEditComponent = __decorate([
        core_1.Component({
            templateUrl: 'notifications/notifications-detailedit/notifications-detailedit.component.html',
            providers: [app_service_1.AppService, notifi_service_1.NotifiService, contact_service_1.ContactService, tag_service_1.TagService]
        }), 
        __metadata('design:paramtypes', [notifications_service_1.NotificationsService, app_service_1.AppService, notifi_service_1.NotifiService, tag_service_1.TagService, contact_service_1.ContactService, router_1.Router, router_1.ActivatedRoute])
    ], NotificationstDetailEditComponent);
    return NotificationstDetailEditComponent;
}());
exports.NotificationstDetailEditComponent = NotificationstDetailEditComponent;
