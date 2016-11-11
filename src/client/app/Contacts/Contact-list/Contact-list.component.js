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
var angular2_modal_1 = require('angular2-modal');
var bootstrap_1 = require('angular2-modal/plugins/bootstrap');
var Contact_service_1 = require('../Shared/Contact.service');
var Contact_update_component_1 = require('../Contact-update/Contact-update.component');
var ContactListComponent = (function () {
    function ContactListComponent(contactService, modal, _router, _route) {
        this.contactService = contactService;
        this.modal = modal;
        this._router = _router;
        this._route = _route;
    }
    ContactListComponent.prototype.loadGetAll = function () {
        var _this = this;
        this.contactService.getContacts().then(function (result) { return _this.Contacts = result; });
    };
    ContactListComponent.prototype.ngOnInit = function () {
        this.loadGetAll();
    };
    ContactListComponent.prototype.getView = function (ValueContactID) {
        return this.modal.open(Contact_update_component_1.ModalContactUpdate, angular2_modal_1.overlayConfigFactory({ ContactID: ValueContactID }, bootstrap_1.BSModalContext));
    };
    ContactListComponent = __decorate([
        core_1.Component({
            selector: 'Contact-list',
            templateUrl: '/Contacts/Contact-list/Contact-list.component.html',
            styleUrls: ['/assets/shop-homepage.css'],
            providers: [Contact_service_1.ContactService, bootstrap_1.Modal]
        }), 
        __metadata('design:paramtypes', [Contact_service_1.ContactService, bootstrap_1.Modal, router_1.Router, router_1.ActivatedRoute])
    ], ContactListComponent);
    return ContactListComponent;
}());
exports.ContactListComponent = ContactListComponent;
