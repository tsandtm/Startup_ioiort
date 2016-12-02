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
        this.listNameTag = [];
        //Contact    
        this.ACContact = [];
        this.ACContactItem = [];
        this.listIDContact = [];
        this.listNameContact = [];
        //TagDenied
        this.ACTagDenied = [];
        this.ACTagDeniedItem = [];
        this.listIDTagDenied = [];
        this.listNameTagDenied = [];
        //ContactDenied
        this.ACContactDenied = [];
        this.ACContactDeniedItem = [];
        this.listIDContactDenied = [];
        this.listNameContactDenied = [];
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
        var name = item.slice(pos + 1, item.length);
        this.listIDTag.push(parseInt(num));
        this.listNameTag.push(name);
    };
    NotificationstDetailEditComponent.prototype.TagRemoved = function (item) {
        var pos = item.indexOf('.');
        var num = item.slice(0, pos);
        var name = item.slice(pos + 1, item.length);
        this.delPos(this.listIDTag, parseInt(num));
        this.delPosstring(this.listNameTag, name);
        console.log(this.ACTag);
    };
    NotificationstDetailEditComponent.prototype.ContactAdded = function (item) {
        var pos = item.indexOf('.');
        var num = item.slice(0, pos);
        var name = item.slice(pos + 1, item.length);
        this.listIDContact.push(parseInt(num));
        this.listNameContact.push(name);
        console.log(this.ACContact);
    };
    NotificationstDetailEditComponent.prototype.ContactRemoved = function (item) {
        var pos = item.indexOf('.');
        var num = item.slice(0, pos);
        var name = item.slice(pos + 1, item.length);
        this.delPos(this.listIDContact, parseInt(num));
        this.delPosstring(this.listNameContact, name);
        console.log(this.ACContact);
    };
    NotificationstDetailEditComponent.prototype.TagDeniedAdded = function (item) {
        var pos = item.indexOf('.');
        var num = item.slice(0, pos);
        var name = item.slice(pos + 1, item.length);
        this.listIDTagDenied.push(parseInt(num));
        this.listNameTagDenied.push(name);
        console.log(this.listIDTagDenied);
        console.log(this.listNameTagDenied);
    };
    NotificationstDetailEditComponent.prototype.TagDeniedRemoved = function (item) {
        var pos = item.indexOf('.');
        var num = item.slice(0, pos);
        var name = item.slice(pos + 1, item.length);
        this.delPos(this.listIDTagDenied, parseInt(num));
        this.delPosstring(this.listNameTagDenied, name);
        console.log(this.listIDTagDenied);
        console.log(this.listNameTagDenied);
    };
    NotificationstDetailEditComponent.prototype.ContactDeniedAdded = function (item) {
        var pos = item.indexOf('.');
        var num = item.slice(0, pos);
        var name = item.slice(pos + 1, item.length);
        this.listIDContactDenied.push(parseInt(num));
        this.listNameContactDenied.push(name);
        console.log(this.ACContactDenied);
    };
    NotificationstDetailEditComponent.prototype.ContactDeniedRemoved = function (item) {
        var pos = item.indexOf('.');
        var num = item.slice(0, pos);
        var name = item.slice(pos + 1, item.length);
        this.delPos(this.listIDContactDenied, parseInt(num));
        this.delPosstring(this.listNameContactDenied, name);
        console.log(this.ACContactDenied);
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
    NotificationstDetailEditComponent.prototype.delPosstring = function (ar, key) {
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
                console.log(element.ContactID);
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
            .then(function (notifications) {
            _this.notifications = notifications;
            _this.listNameTag = notifications.Send_TagName,
                _this.listNameContact = notifications.Send_UserName,
                _this.listNameTagDenied = notifications.Send_TagDenieName;
            _this.listNameContactDenied = notifications.Send_UserDenieName,
                _this.listIDTag = notifications.Send_TagID;
            _this.listIDContact = notifications.Send_UserID;
            _this.listIDTagDenied = notifications.Send_TagDenieID;
            _this.listIDContactDenied = notifications.Send_UserDenieID;
            _this.tieude = notifications.TieuDe;
            _this.Noidung = notifications.NoiDung;
            for (var i = 0; i < _this.listIDTag.length; i++) {
                _this.ACTag.push(_this.listIDTag[i] + '.' + _this.listNameTag[i]);
            }
            for (var i = 0; i < _this.listIDContact.length; i++) {
                _this.ACContact.push(_this.listIDContact[i] + '.' + _this.listNameContact[i]);
            }
            for (var i = 0; i < _this.listIDTagDenied.length; i++) {
                _this.ACTagDenied.push(_this.listIDTagDenied[i] + '.' + _this.listNameTagDenied[i]);
            }
            for (var i = 0; i < _this.listIDContactDenied.length; i++) {
                _this.ACContactDenied.push(_this.listIDContactDenied[i] + '.' + _this.listNameContactDenied[i]);
            }
            console.log(_this.ACTag);
            console.log(_this.ACContact);
            console.log(_this.ACTagDenied);
            console.log(_this.ACContactDenied);
        });
    };
    NotificationstDetailEditComponent.prototype.getslsend = function (req) {
        var _this = this;
        return this.notifiservice.getslsend(req).then(function (result) { return _this.Soluong = result; });
    };
    NotificationstDetailEditComponent.prototype.getslsenddenied = function (req) {
        var _this = this;
        return this.notifiservice.getsldenied(req).then(function (result) { return _this.Soluong = result; });
    };
    NotificationstDetailEditComponent.prototype.Edit = function () {
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
        if (this.sendlater) {
            this.ThoiHan = this.date.toLocaleDateString('en-US') + ' ' + this.hour + ":" + this.minute + ":00";
        }
        else {
            this.ThoiHan = this.date.toLocaleDateString('en-US') + ' ' + this.date.toLocaleTimeString();
        }
        if (this.listIDTag.length == 0 && this.listIDContact.length == 0) {
            this.getslsenddenied({ contactdenied: this.listIDContactDenied, tagdenied: this.listIDTagDenied }).then(function (result) {
                _this.notifications.AppID = _this.AppID;
                _this.notifications.TieuDe = _this.tieude;
                _this.notifications.NoiDung = _this.Noidung;
                _this.notifications.DoUuTien = _this.doUuTien;
                _this.notifications.ThoiHanToiDa = _this.ThoiHan;
                _this.notifications.ThoiGianGui = _this.Thoigiangui;
                _this.notifications.SoLuong = result;
                _this.notifications.Send_TagName = _this.listNameTag;
                _this.notifications.Send_TagID = _this.listIDTag;
                _this.notifications.Send_UserName = _this.listNameContact;
                _this.notifications.Send_UserID = _this.listIDContact;
                _this.notifications.Send_TagDenieName = _this.listNameTagDenied;
                _this.notifications.Send_TagDenieID = _this.listIDTagDenied;
                _this.notifications.Send_UserDenieName = _this.listNameContactDenied;
                _this.notifications.Send_UserDenieID = _this.listIDContactDenied;
                _this._notificationsService.Edit(_this.notifications).then(function (result) { return _this._router.navigate(['confirm', _this.notifications.id]); });
            });
        }
        else {
            this.getslsend({ contact: this.listIDContact, tag: this.listIDTag, contactdenied: this.listIDContactDenied, tagdenied: this.listIDTagDenied }).then(function (result) {
                _this.notifications.AppID = _this.AppID;
                _this.notifications.TieuDe = _this.tieude;
                _this.notifications.NoiDung = _this.Noidung;
                _this.notifications.DoUuTien = _this.doUuTien;
                _this.notifications.ThoiHanToiDa = _this.ThoiHan;
                _this.notifications.ThoiGianGui = _this.Thoigiangui;
                _this.notifications.SoLuong = result;
                _this.notifications.Send_TagName = _this.listNameTag;
                _this.notifications.Send_TagID = _this.listIDTag;
                _this.notifications.Send_UserName = _this.listNameContact;
                _this.notifications.Send_UserID = _this.listIDContact;
                _this.notifications.Send_TagDenieName = _this.listNameTagDenied;
                _this.notifications.Send_TagDenieID = _this.listIDTagDenied;
                _this.notifications.Send_UserDenieName = _this.listNameContactDenied;
                _this.notifications.Send_UserDenieID = _this.listIDContactDenied;
                _this._notificationsService.Edit(_this.notifications).then(function (result) { return _this._router.navigate(['confirm', _this.notifications.id]); });
            });
        }
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
