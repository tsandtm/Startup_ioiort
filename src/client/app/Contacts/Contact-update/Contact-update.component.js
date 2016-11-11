"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
//popup
var angular2_modal_1 = require('angular2-modal');
var bootstrap_1 = require('angular2-modal/plugins/bootstrap');
//service
var Contact_service_1 = require('../Shared/Contact.service');
var Tag_service_1 = require('../Shared/Tag.service');
// import { Tag } from 'C:/Nodejs/notifi/Startup_ioiort/src/client/app/Tags/Shared/Tag.model';
// import { TagService } from 'C:/Nodejs/notifi/Startup_ioiort/src/client/app/Tags/Shared/Tag.service';
var ContactModalContext = (function (_super) {
    __extends(ContactModalContext, _super);
    function ContactModalContext() {
        _super.apply(this, arguments);
    }
    return ContactModalContext;
}(bootstrap_1.BSModalContext));
exports.ContactModalContext = ContactModalContext;
///Contacts/Contact-list/Contact-list.component.html
var ModalContactUpdate = (function () {
    function ModalContactUpdate(dialog, contactService, tagService, _router) {
        this.dialog = dialog;
        this.contactService = contactService;
        this.tagService = tagService;
        this._router = _router;
        this.context = dialog.context;
        this.wrongAnswer = true;
        dialog.setCloseGuard(this);
    }
    ModalContactUpdate.prototype.ngOnInit = function () {
        var _this = this;
        this.loadGetContact();
        this.getTag().then(function () {
            for (var i = 0; i < _this.Tags.length; i++) {
                for (var j = 0; j < _this.contact.Contact_Tag.length; j++) {
                    if (_this.Tags[i].TagID == _this.contact.Contact_Tag[j]) {
                        _this.Tags[i].checked = true;
                        break;
                    }
                }
            }
        });
    };
    ModalContactUpdate.prototype.loadGetContact = function () {
        this.getContact(this.dialog.context.ContactID)
            .then(function (result) { });
    };
    ModalContactUpdate.prototype.getTag = function () {
        var _this = this;
        return this.tagService.getTags()
            .then(function (response) {
            _this.Tags = response;
            return _this.Tags;
        })
            .catch(function (error) {
            console.log(error);
            return error;
        });
    };
    // ischecked(contag: number): boolean {
    //     for (let i = 0; i < this.contact.Contact_Tag.length; i++) {
    //         if (this.contact.Contact_Tag[i] == contag) {
    //             console.log(this.Tags);
    //             return true;
    //         }
    //     }
    //     console.log(this.Tags);
    //     return false;
    // }
    ModalContactUpdate.prototype.getContact = function (ContactID) {
        var _this = this;
        return this.contactService.getContact(ContactID)
            .then(function (response) {
            _this.contact = response;
            return _this.contact;
        })
            .catch(function (error) {
            console.log(error);
            return error;
        });
    };
    ModalContactUpdate.prototype.changeValueTag = function (valueID) {
        var _this = this;
        var valueTags = new Array();
        for (var i = 0; i < this.Tags.length; i++) {
            if (this.Tags[i].checked) {
                console.log(this.Tags[i].TagID);
                valueTags.push(this.Tags[i].TagID);
            }
        }
        console.log('valueTags: ' + valueTags);
        this.contactService.updateContact(valueID, valueTags)
            .subscribe(function (data) { return _this.postData = JSON.stringify(data); }, function (error) { return alert(error); }, function () { return console.log('finish'); });
        this.wrongAnswer = false;
        this.dialog.close();
    };
    ModalContactUpdate.prototype.onClose = function () {
        this.wrongAnswer = false;
        this.dialog.close();
        this._router.navigate(['Contacts',]);
    };
    ModalContactUpdate.prototype.onKeyUp = function (value) {
        this.wrongAnswer = value != 5;
        this.dialog.close();
    };
    ModalContactUpdate.prototype.beforeDismiss = function () {
        return true;
    };
    ModalContactUpdate.prototype.beforeClose = function () {
        return this.wrongAnswer;
    };
    ModalContactUpdate = __decorate([
        core_1.Component({
            selector: 'modal-content',
            templateUrl: 'Contacts/Contact-update/Contact-update.component.html',
            providers: [Contact_service_1.ContactService, Tag_service_1.TagService]
        }), 
        __metadata('design:paramtypes', [angular2_modal_1.DialogRef, Contact_service_1.ContactService, Tag_service_1.TagService, router_1.Router])
    ], ModalContactUpdate);
    return ModalContactUpdate;
}());
exports.ModalContactUpdate = ModalContactUpdate;
