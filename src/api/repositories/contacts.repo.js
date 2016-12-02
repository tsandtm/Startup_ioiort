"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var repositories_base_1 = require('./repositories.base');
var contacts_model_1 = require('../models/contacts.model');
var ContactsRepo = (function (_super) {
    __extends(ContactsRepo, _super);
    function ContactsRepo() {
        _super.call(this);
    }
    ContactsRepo.prototype.getList = function (option) {
        var queryText = 'SELECT * FROM test."Contacts"ORDER BY "ContactID"ASC ';
        console.info('Excute: ' + queryText);
        var pResult;
        if (option) {
            pResult = this._pgPool.query(queryText, [option.id, option.Token]);
        }
        else {
            pResult = this._pgPool.query(queryText);
        }
        return pResult.then(function (result) {
            var contacts = result.rows.map(function (r) {
                var contact = new contacts_model_1.Contacts();
                contact.id = r.ContactID;
                contact.Token = r.Token;
                contact.Email = r.Email;
                contact.TaiKhoan = r.TaiKhoan;
                contact.Device = r.Device;
                contact.PhoneNumber = r.PhoneNumber;
                contact.NgayTao = r.NgayTao;
                contact.FaceBook = r.FaceBook;
                contact.Contact_Tag = r.Contact_Tag;
                return contact;
            });
            return contacts;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    return ContactsRepo;
}(repositories_base_1.RepoBase));
exports.ContactsRepo = ContactsRepo;
