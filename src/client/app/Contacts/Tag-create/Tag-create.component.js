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
var Tag_service_1 = require('../Shared/Tag.service');
var TagModalContext = (function (_super) {
    __extends(TagModalContext, _super);
    function TagModalContext() {
        _super.apply(this, arguments);
    }
    return TagModalContext;
}(bootstrap_1.BSModalContext));
exports.TagModalContext = TagModalContext;
var ModalTagCreate = (function () {
    function ModalTagCreate(dialog, tagService, _router) {
        this.dialog = dialog;
        this.tagService = tagService;
        this._router = _router;
        this.context = dialog.context;
        this.wrongAnswer = true;
        dialog.setCloseGuard(this);
    }
    ModalTagCreate.prototype.ngOnInit = function () {
    };
    ModalTagCreate.prototype.Save = function (valueID) {
        console.log("TagDisplayName: " + this.TagDisplayName + " - IsDefault: " + this.IsDefault);
        // this.tagService.CreateTag();
        //     .then((result) => {
        //         this.wrongAnswer = false;
        //         this.dialog.close("ok");
        //     })
        //     .catch((err) => {
        //         alert(err);
        //     })
    };
    ModalTagCreate.prototype.onClose = function () {
        this.wrongAnswer = false;
        this.dialog.close();
    };
    ModalTagCreate.prototype.onKeyUp = function (value) {
        this.wrongAnswer = value != 5;
        this.dialog.close();
    };
    ModalTagCreate.prototype.beforeDismiss = function () {
        return true;
    };
    ModalTagCreate.prototype.beforeClose = function () {
        return this.wrongAnswer;
    };
    ModalTagCreate = __decorate([
        core_1.Component({
            selector: 'modal-content',
            templateUrl: 'Contacts/Tag-create/Tag-create.component.html',
            providers: [Tag_service_1.TagService]
        }), 
        __metadata('design:paramtypes', [angular2_modal_1.DialogRef, Tag_service_1.TagService, router_1.Router])
    ], ModalTagCreate);
    return ModalTagCreate;
}());
exports.ModalTagCreate = ModalTagCreate;
