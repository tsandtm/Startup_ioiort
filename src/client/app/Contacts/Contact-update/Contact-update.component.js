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
var angular2_modal_1 = require('angular2-modal');
var bootstrap_1 = require('angular2-modal/plugins/bootstrap');
var Contact_service_1 = require('../Shared/Contact.service');
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
    // ngOnInit(): void {
    //     this.loadGetContact();
    // }
    function ModalContactUpdate(dialog, contactService) {
        this.dialog = dialog;
        this.contactService = contactService;
        this.context = dialog.context;
        this.loadGetContact();
        this.wrongAnswer = true;
        dialog.setCloseGuard(this);
    }
    ModalContactUpdate.prototype.loadGetContact = function () {
        var _this = this;
        this.getContact(this.dialog.context.ContactID)
            .then(function (result) {
            console.log('contact:' + _this.contact);
        });
    };
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
    ModalContactUpdate.prototype.changeValueTag = function (valueID, valueTag) {
        var _this = this;
        this.contactService.updateContact(valueID, parseInt(valueTag, 10))
            .subscribe(function (data) { return _this.postData = JSON.stringify(data); }, function (error) { return alert(error); }, function () { return console.log('finish'); });
    };
    ModalContactUpdate.prototype.onClose = function () {
        this.wrongAnswer = false;
        this.dialog.close();
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
            providers: [Contact_service_1.ContactService]
        }), 
        __metadata('design:paramtypes', [angular2_modal_1.DialogRef, Contact_service_1.ContactService])
    ], ModalContactUpdate);
    return ModalContactUpdate;
}());
exports.ModalContactUpdate = ModalContactUpdate;
