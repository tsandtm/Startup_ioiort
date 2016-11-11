"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var repositories_base_1 = require('./repositories.base');
var Contact_model_1 = require('../models/Contact.model');
var ContactRepo = (function (_super) {
    __extends(ContactRepo, _super);
    function ContactRepo() {
        _super.call(this);
    }
    ContactRepo.prototype.getList = function (option) {
        var queryText = 'select * from test."Contacts"';
        var pResult;
        if (option.Contact_Tag != undefined) {
            for (var i = 0; i < option.Contact_Tag.length; i++) {
                option.Contact_Tag[i] = parseInt(option.Contact_Tag[i].toString(), 10);
            }
            console.log(option);
            queryText = 'select * from test."Contacts" where "Contact_Tag" = Array[' + option.Contact_Tag + ']';
            // queryText = 'select * from test."Contacts" where "Contact_Tag" = Array[$1]';
            pResult = this._pgPool.query(queryText);
        }
        else {
            pResult = this._pgPool.query(queryText);
        }
        return pResult.then(function (result) {
            var Contacts = result.rows.map(function (r) {
                var contact = new Contact_model_1.Contact();
                contact.ContactID = r.ContactID;
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
            return Contacts;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    ContactRepo.prototype.getOne = function (option) {
        var queryText = 'select * from test."Contacts" where "ContactID" = $1';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.ContactID])
            .then(function (result) {
            var contact = new Contact_model_1.Contact();
            contact.ContactID = result.rows[0].ContactID;
            contact.Token = result.rows[0].Token;
            contact.Email = result.rows[0].Email;
            contact.TaiKhoan = result.rows[0].TaiKhoan;
            contact.Device = result.rows[0].Device;
            contact.PhoneNumber = result.rows[0].PhoneNumber;
            contact.NgayTao = result.rows[0].NgayTao;
            contact.FaceBook = result.rows[0].FaceBook;
            contact.Contact_Tag = result.rows[0].Contact_Tag;
            return contact;
        });
    };
    ContactRepo.prototype.create = function (option) {
        var queryText = 'INSERT INTO test."Contacts" ("ContactID", "Token", "Email", "TaiKhoan", "Device", "PhoneNumber", "NgayTao", "FaceBook", "Contact_Tag") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
        return this._pgPool.query(queryText, [option.ContactID, option.Token, option.Email, option.TaiKhoan, option.Device, option.PhoneNumber, option.NgayTao, option.FaceBook, option.Contact_Tag])
            .then(function (result) {
            return option;
        });
    };
    ContactRepo.prototype.update = function (option) {
        for (var i = 0; i < option.Contact_Tag.length; i++) {
            option.Contact_Tag[i] = parseInt(option.Contact_Tag[i].toString(), 10);
        }
        var queryText = 'UPDATE test."Contacts" SET "Contact_Tag" = Array[' + option.Contact_Tag + '] WHERE "ContactID" = ' + option.ContactID;
        return this._pgPool.query(queryText)
            .then(function (result) {
            return option;
        });
    };
    return ContactRepo;
}(repositories_base_1.RepoBase));
exports.ContactRepo = ContactRepo;
