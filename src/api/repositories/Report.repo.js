"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var repositories_base_1 = require('./repositories.base');
var Contact_model_1 = require('../models/Contact.model');
var ReportRepo = (function (_super) {
    __extends(ReportRepo, _super);
    function ReportRepo() {
        _super.call(this);
    }
    ReportRepo.prototype.getList = function (option) {
        var queryText = 'select distinct "Device" from test."Contacts"';
        var pResult;
        if (option.Contact_Tag != undefined) {
            pResult = this._pgPool.query(queryText + 'where "Contact_Tag" = ' + "'{" + option.Contact_Tag + "}'");
            console.info(option.Contact_Tag);
        }
        else {
            pResult = this._pgPool.query(queryText);
        }
        return pResult.then(function (result) {
            var Contacts = result.rows.map(function (r) {
                var contact = new Contact_model_1.Contact();
                contact.Device = r.Device;
                return contact;
            });
            return Contacts;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    return ReportRepo;
}(repositories_base_1.RepoBase));
exports.ReportRepo = ReportRepo;
