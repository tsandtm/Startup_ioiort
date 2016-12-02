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
var NotifiSendComponent = (function () {
    function NotifiSendComponent(appService, notifiservice, tagservice, contactservice, _router, _route) {
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
    NotifiSendComponent.prototype.TagAdded = function (item) {
        var pos = item.indexOf('.');
        var num = item.slice(0, pos);
        var name = item.slice(pos + 1, item.length);
        this.listIDTag.push(parseInt(num));
        this.listNameTag.push(name);
    };
    NotifiSendComponent.prototype.TagRemoved = function (item) {
        var pos = item.indexOf('.');
        var num = item.slice(0, pos);
        var name = item.slice(pos + 1, item.length);
        this.delPos(this.listIDTag, parseInt(num));
        this.delPosstring(this.listNameTag, name);
    };
    NotifiSendComponent.prototype.ContactAdded = function (item) {
        var pos = item.indexOf('.');
        var num = item.slice(0, pos);
        var name = item.slice(pos + 1, item.length);
        this.listIDContact.push(parseInt(num));
        this.listNameContact.push(name);
    };
    NotifiSendComponent.prototype.ContactRemoved = function (item) {
        var pos = item.indexOf('.');
        var num = item.slice(0, pos);
        var name = item.slice(pos + 1, item.length);
        this.delPos(this.listIDContact, parseInt(num));
        this.delPosstring(this.listNameContact, name);
    };
    NotifiSendComponent.prototype.TagDeniedAdded = function (item) {
        var pos = item.indexOf('.');
        var num = item.slice(0, pos);
        var name = item.slice(pos + 1, item.length);
        this.listIDTagDenied.push(parseInt(num));
        this.listNameTagDenied.push(name);
    };
    NotifiSendComponent.prototype.TagDeniedRemoved = function (item) {
        var pos = item.indexOf('.');
        var num = item.slice(0, pos);
        var name = item.slice(pos + 1, item.length);
        this.delPos(this.listIDTagDenied, parseInt(num));
        this.delPosstring(this.listNameTagDenied, name);
    };
    NotifiSendComponent.prototype.ContactDeniedAdded = function (item) {
        var pos = item.indexOf('.');
        var num = item.slice(0, pos);
        var name = item.slice(pos + 1, item.length);
        this.listIDContactDenied.push(parseInt(num));
        this.listNameContactDenied.push(name);
    };
    NotifiSendComponent.prototype.ContactDeniedRemoved = function (item) {
        var pos = item.indexOf('.');
        var num = item.slice(0, pos);
        var name = item.slice(pos + 1, item.length);
        this.delPos(this.listIDContactDenied, parseInt(num));
        this.delPosstring(this.listNameContactDenied, name);
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
    NotifiSendComponent.prototype.delPos = function (ar, key) {
        for (var i = 0; i <= ar.length; i++) {
            if (ar[i] == key) {
                ar.splice(i, 1);
            }
        }
    };
    NotifiSendComponent.prototype.delPosstring = function (ar, key) {
        for (var i = 0; i <= ar.length; i++) {
            if (ar[i] == key) {
                ar.splice(i, 1);
            }
        }
    };
    NotifiSendComponent.prototype.loop = function (min, max) {
        var input = [];
        for (var i = min; i < max; i++) {
            input.push(i);
        }
        return input;
    };
    NotifiSendComponent.prototype.getNotifi = function () {
        var _this = this;
        this.notifiservice.getLastNotifi()
            .then(function (notifi) { return _this.notifi = notifi; });
    };
    NotifiSendComponent.prototype.getTag = function () {
        var _this = this;
        this.tagservice.getAllTag().then(function (tag) {
            _this.Tag = tag;
            _this.Tag.forEach(function (element) {
                _this.ACTagItem.push(element.TagID + '.' + element.TagNameDisplay);
            });
        });
    };
    NotifiSendComponent.prototype.getContact = function () {
        var _this = this;
        this.contactservice.getAllContact().then(function (contact) {
            _this.Contact = contact;
            _this.Contact.forEach(function (element) {
                _this.ACContactItem.push(element.ContactID + '.' + element.TaiKhoan);
            });
        });
    };
    NotifiSendComponent.prototype.sendnowclick = function () {
        this.sendnow = true;
        this.sendlater = false;
    };
    NotifiSendComponent.prototype.sendlaterclick = function () {
        this.sendnow = false;
        this.sendlater = true;
    };
    NotifiSendComponent.prototype.Create = function () {
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
        if (this.tieude == undefined || this.Noidung == undefined) {
            console.log(false);
            return false;
        }
        else {
            if (this.listIDTag.length == 0 && this.listIDContact.length == 0) {
                this.getslsenddenied({ contactdenied: this.listIDContactDenied, tagdenied: this.listIDTagDenied }).then(function (result) {
                    _this.notifi = { AppID: _this.AppID,
                        NotifiID: _this.notifiID,
                        TieuDe: _this.tieude,
                        Noidung: _this.Noidung,
                        DoUuTien: _this.doUuTien,
                        Trangthai: _this.Trangthai,
                        Soluong: result,
                        Thoigiangui: _this.Thoigiangui,
                        ThoiHan: _this.ThoiHan,
                        SendTag: _this.listIDTag,
                        SendTagName: _this.listNameTag,
                        SendUser: _this.listIDContact,
                        SendUserName: _this.listNameContact,
                        DeniedTag: _this.listIDTagDenied,
                        DeniedTagName: _this.listNameTagDenied,
                        DeniedUser: _this.listIDContactDenied,
                        DeniedUserName: _this.listNameContactDenied };
                    _this.notifiservice.Create(_this.notifi).then(function (result) { return _this._router.navigate(['confirm', _this.notifi.NotifiID]); });
                });
            }
            else {
                this.getslsend({ contact: this.listIDContact, tag: this.listIDTag, contactdenied: this.listIDContactDenied, tagdenied: this.listIDTagDenied }).then(function (result) {
                    _this.notifi = { AppID: _this.AppID,
                        NotifiID: _this.notifiID,
                        TieuDe: _this.tieude,
                        Noidung: _this.Noidung,
                        DoUuTien: _this.doUuTien,
                        Trangthai: _this.Trangthai,
                        Soluong: result,
                        Thoigiangui: _this.Thoigiangui,
                        ThoiHan: _this.ThoiHan,
                        SendTag: _this.listIDTag,
                        SendTagName: _this.listNameTag,
                        SendUser: _this.listIDContact,
                        SendUserName: _this.listNameContact,
                        DeniedTag: _this.listIDTagDenied,
                        DeniedTagName: _this.listNameTagDenied,
                        DeniedUser: _this.listIDContactDenied,
                        DeniedUserName: _this.listNameContactDenied };
                    _this.notifiservice.Create(_this.notifi).then(function (result) { return _this._router.navigate(['confirm', _this.notifi.NotifiID]); });
                });
            }
        }
        // this.notifi={AppID:this.AppID,
        // NotifiID:this.notifiID,
        // TieuDe:this.tieude,
        // Noidung:this.Noidung,
        // DoUuTien:this.doUuTien,
        // Trangthai:this.Trangthai,
        // Soluong:this.Soluong,
        // Thoigiangui:this.Thoigiangui,
        // ThoiHan:this.ThoiHan,
        // SendTag:this.listIDTag,
        // SendUser:this.listIDContact,
        // DeniedTag:this.listIDTagDenied,
        // DeniedUser:this.listIDContactDenied};
        // this.notifiservice.Create(this.notifi).then(result=>this._router.navigate(['confirm',this.notifi.NotifiID]));
    };
    NotifiSendComponent.prototype.loadGetAll = function () {
        var _this = this;
        this.appService.getApp().then(function (result) { return _this.Apps = result; });
    };
    NotifiSendComponent.prototype.getslsend = function (req) {
        var _this = this;
        return this.notifiservice.getslsend(req).then(function (result) { return _this.Soluong = result; });
    };
    NotifiSendComponent.prototype.getslsenddenied = function (req) {
        var _this = this;
        return this.notifiservice.getsldenied(req).then(function (result) { return _this.Soluong = result; });
    };
    NotifiSendComponent.prototype.ngOnInit = function () {
        this.loadGetAll();
        this.getNotifi();
        this.getTag();
        this.getContact();
        this.today = new Date();
        this.loophour = this.loop(1, 24);
        this.loopminute = this.loop(0, 60);
        this.loophourTH = this.loop(5, 24);
        this.loopminuteTH = this.loop(5, 60);
        this.loopdayTH = this.loop(5, 28);
    };
    NotifiSendComponent = __decorate([
        core_1.Component({
            templateUrl: '/notification-send/notification.component.html',
            providers: [app_service_1.AppService, notifi_service_1.NotifiService, contact_service_1.ContactNotifiService, tag_service_1.TagService]
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService, notifi_service_1.NotifiService, tag_service_1.TagService, contact_service_1.ContactNotifiService, router_1.Router, router_1.ActivatedRoute])
    ], NotifiSendComponent);
    return NotifiSendComponent;
}());
exports.NotifiSendComponent = NotifiSendComponent;
