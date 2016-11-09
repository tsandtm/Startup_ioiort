"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var repositories_base_1 = require('./repositories.base');
var Report_model_1 = require('../models/Report.model');
var ReportRepo = (function (_super) {
    __extends(ReportRepo, _super);
    function ReportRepo() {
        _super.call(this);
    }
    ReportRepo.prototype.getList = function (option) {
        var queryText = 'select distinct "Device",count("Device") as count,date_part(\'month\',"NgayTao") as date from test."Contacts"  where "Device" = \'android\' group by "Device","NgayTao"';
        var queryText_ios = 'select distinct "Device",count("Device") as count,date_part(\'month\',"NgayTao") as date from test."Contacts"  where "Device" = \'ios\' group by "Device","NgayTao"';
        var pResult;
        if (option.Contact_Tag != undefined) {
            pResult = this._pgPool.query(queryText + 'where "Contact_Tag" = ' + "'{" + option.Contact_Tag + "}'");
            console.info(option.Contact_Tag);
        }
        else {
            pResult = this._pgPool.query(queryText);
        }
        return pResult.then(function (result) {
            var Reports = result.rows.map(function (r) {
                var contact = new Report_model_1.Report();
                contact.Device = r.Device;
                contact.count = r.count;
                contact.date = r.date;
                return contact;
            });
            return Reports;
            // return this._pgPool.query(queryText_month).then(result => {
            //     let Reports: Report[] = result.rows.map(r => {                    
            //         contact.date = r.date;
            //         return contact;
            //     });
            //     return Reports;
            // })
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    return ReportRepo;
}(repositories_base_1.RepoBase));
exports.ReportRepo = ReportRepo;
