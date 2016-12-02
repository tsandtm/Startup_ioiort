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
// Tag
var Tag_model_1 = require('../Shared/Tag.model');
var Tag_service_1 = require('../Shared/Tag.service');
// popup update
var Contact_update_component_1 = require('../Contact-update/Contact-update.component');
var ContactListComponent = (function () {
    function ContactListComponent(contactService, tagService, modal, _router, _route) {
        this.contactService = contactService;
        this.tagService = tagService;
        this.modal = modal;
        this._router = _router;
        this._route = _route;
        this.filter = '';
        // ContactDetail: Contact;
        this.checkbox = false;
        this.pager = {};
    }
    ContactListComponent.prototype.loadGetAll = function () {
        var _this = this;
        this.contactService.getContacts()
            .then(function (result) { return _this.Contacts = result; });
    };
    ContactListComponent.prototype.setPage = function (page) {
        if (this.Contacts != undefined) {
            if (page < 1 || page > this.pager.totalPages) {
                return;
            }
            this.pager = this.contactService.getPager(this.Contacts.length, page);
            // get current page of items
            this.itempages = this.Contacts.slice(this.pager.startIndex, this.pager.endIndex + 1);
            console.log(this.itempages);
        }
    };
    ContactListComponent.prototype.runGetContacts = function () {
        var _this = this;
        this.getContacts()
            .then(function () {
            _this.getTag();
            console.log(_this.Contacts);
        })
            .then(function (result) {
            _this.setPage(1);
        })
            .catch(function (error) {
            console.log('error: ');
        });
    };
    ContactListComponent.prototype.ngOnInit = function () {
        this.runGetContacts();
    };
    ContactListComponent.prototype.getView = function (ValueContactID) {
        var _this = this;
        return this.modal.open(Contact_update_component_1.ModalContactUpdate, angular2_modal_1.overlayConfigFactory({ ContactID: ValueContactID }, bootstrap_1.BSModalContext))
            .then(function (d) { return d.result; })
            .then(function (r) {
            if (r == "ok") {
                _this.runGetContacts();
            }
        });
    };
    ContactListComponent.prototype.checkAlllist = function () {
        this.checkbox = !this.checkbox;
    };
    ContactListComponent.prototype.getContacts = function () {
        var _this = this;
        return this.contactService.getContacts()
            .then(function (response) {
            _this.Contacts = response;
            return response;
        })
            .catch(function (error) {
            return error;
        });
    };
    ContactListComponent.prototype.getTag = function () {
        var _this = this;
        return this.tagService.getTags()
            .then(function (response) {
            var TagAll = new Tag_model_1.Tag();
            TagAll.TagNameDisplay = "All";
            _this.Tags = response;
            _this.Tags.push(TagAll);
            return _this.Tags;
        })
            .catch(function (error) {
            console.log(error);
            return error;
        });
    };
    ContactListComponent.prototype.SearchByTag = function (Contact_TagName) {
        var _this = this;
        this.contactService.SearchByTag(Contact_TagName)
            .then(function (result) {
            _this.Contacts = result;
            console.log('search: ' + _this.Contacts);
            return _this.Contacts;
        })
            .then(function (result) {
            console.log("vao ");
            _this.setPage(1);
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    ContactListComponent = __decorate([
        core_1.Component({
            selector: 'Contact-list',
            templateUrl: '/Contacts/Contact-list/Contact-list.component.html',
            styleUrls: ['/assets/shop-homepage.css'],
            providers: [
                Contact_service_1.ContactService,
                Tag_service_1.TagService,
                bootstrap_1.Modal
            ]
        }), 
        __metadata('design:paramtypes', [Contact_service_1.ContactService, Tag_service_1.TagService, bootstrap_1.Modal, router_1.Router, router_1.ActivatedRoute])
    ], ContactListComponent);
    return ContactListComponent;
}());
exports.ContactListComponent = ContactListComponent;
