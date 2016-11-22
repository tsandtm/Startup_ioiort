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
var Contact_model_1 = require('../shared/Contact.model');
var Contact_service_1 = require('../shared/Contact.service');
var ContactDetailComponent = (function () {
    function ContactDetailComponent(_contactService, _router, _route) {
        this._contactService = _contactService;
        this._router = _router;
        this._route = _route;
        this.pageTitle = 'Contact detailt';
    }
    ContactDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.forEach(function (value) {
            console.log(value["ContactID"]);
            var ContactID = value["ContactID"];
            _this.getContact(ContactID);
            console.log(Contact_model_1.Contact.length);
        });
    };
    ContactDetailComponent.prototype.getContact = function (ContactID) {
        var _this = this;
        this._contactService.getContact(ContactID)
            .then(function (response) { return _this.contact = response; });
    };
    ContactDetailComponent.prototype.onBack = function () {
        this._router.navigate(['Contacts']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Contact_model_1.Contact)
    ], ContactDetailComponent.prototype, "contact", void 0);
    ContactDetailComponent = __decorate([
        core_1.Component({
            templateUrl: '/Contacts/Contact-detail/Contact-detail.component.html',
            providers: [Contact_service_1.ContactService]
        }), 
        __metadata('design:paramtypes', [Contact_service_1.ContactService, router_1.Router, router_1.ActivatedRoute])
    ], ContactDetailComponent);
    return ContactDetailComponent;
}());
exports.ContactDetailComponent = ContactDetailComponent;
