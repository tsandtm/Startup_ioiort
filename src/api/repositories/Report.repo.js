"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var repositories_base_1 = require('./repositories.base');
var Report_model_1 = require('../models/Report.model');
var Report_model_2 = require('../models/Report.model');
var ReportRepo = (function (_super) {
    __extends(ReportRepo, _super);
    function ReportRepo() {
        _super.call(this);
    }
    ReportRepo.prototype.getList = function (option) {
        var queryText = 'select distinct "Device",count("Device") as count,date_part(\'month\',"NgayTao") as date from test."Contacts" group by "Device","NgayTao" order by date_part(\'month\',"NgayTao")';
        var pResult;
        if (option.Contact_Tag != undefined) {
            pResult = this._pgPool.query(queryText + 'where "Contact_Tag" = ' + "'{" + option.Contact_Tag + "}'");
            console.info(option.Contact_Tag);
        }
        else {
            pResult = this._pgPool.query(queryText);
        }
        return pResult.then(function (result) {
            var name, count;
            var index = -1;
            var flag = "";
            var listDevice = result.rows.map(function (r) {
                var listDevices = new Report_model_2.ListDevice();
                var report = new Report_model_1.Report();
                if (flag != r.date) {
                    index++;
                    flag = r.date;
                    listDevices.date = r.date;
                    console.log(r.date);
                }
                report.name = r.Device;
                report.count = r.count;
                listDevices.listdevice[index] = report;
                console.log(listDevices.listdevice[index]);
                return listDevices;
            });
            return listDevice;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    return ReportRepo;
}(repositories_base_1.RepoBase));
exports.ReportRepo = ReportRepo;
