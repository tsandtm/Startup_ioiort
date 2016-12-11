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
        var queryText;
        //  = 'select distinct "Device",count("Device") as count,date_part(\'month\',"NgayTao") as date from test."Contacts" group by "Device","NgayTao" order by date_part(\'month\',"NgayTao")';
        var pResult;
        if (option.month != undefined) {
            queryText = 'select "Device",count("Device") as count,date_part(\'month\',"NgayTao") as date ' +
                'from test."Contacts" ' +
                'where date_part(\'month\',"NgayTao") = ' + option.month + ' and date_part(\'year\',"NgayTao") =' + option.year +
                ' group by "Device",date_part(\'month\',"NgayTao"),date_part(\'year\',"NgayTao")' +
                ' order by date_part(\'month\',"NgayTao")';
            console.log(queryText);
            console.log("repo" + option.month + "" + option.year);
            pResult = this._pgPool.query(queryText);
        }
        else {
            queryText = 'select "Device",count("Device") as count,date_part(\'month\',"NgayTao") as date from test."Contacts" group by "Device",date_part(\'month\',"NgayTao") order by date_part(\'month\',"NgayTao")';
            // console.log("cau 2" + queryText);
            pResult = this._pgPool.query(queryText);
        }
        // if (option.Contact_Tag != undefined) {
        //     pResult = this._pgPool.query(queryText + 'where "Contact_Tag" = ' + "'{" + option.Contact_Tag + "}'")
        //     console.info(option.Contact_Tag)
        // } else {
        //     pResult = this._pgPool.query(queryText)
        // }
        return pResult.then(function (result) {
            var index = -1;
            var flag = "";
            var group = "";
            var listDevices = new Array();
            var report;
            var listDevice = result.rows.map(function (r) {
                report = new Report_model_2.Report();
                if (flag != r.date) {
                    index++;
                    var xx = new Report_model_1.ListDevice();
                    listDevices.push(xx);
                    listDevices[index].date = r.date;
                    flag = r.date;
                }
                report.name = r.Device;
                report.count = r.count;
                listDevices[index].listdevice.push(report);
                // console.log('Report xx: ' + report)
                // listDevices.listdevice.push(report);               
                // listDevices.listdevice[index] = list;
                // console.log(listDevices);
                // return listDevices;
            });
            return listDevices;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    //get for dougnut
    ReportRepo.prototype.getAlldougnut = function () {
        var queryText = 'select "Device",count("Device") as count from test."Contacts" group by "Device"';
        var pResult;
        // if (option.month != undefined) {
        //     queryText = 'select "Device",count("Device") as count,date_part(\'month\',"NgayTao") as date ' +
        //         'from test."Contacts" ' +
        //         'where date_part(\'month\',"NgayTao") = ' + option.month + ' and date_part(\'year\',"NgayTao") =' + option.year +
        //         ' group by "Device",date_part(\'month\',"NgayTao"),date_part(\'year\',"NgayTao")' +
        //         ' order by date_part(\'month\',"NgayTao")';
        //     console.log(queryText);
        //     console.log("repo" + option.month + "" + option.year);
        //     pResult = this._pgPool.query(queryText);
        // } else {
        //     queryText = 'select "Device",count("Device") as count,date_part(\'month\',"NgayTao") as date from test."Contacts" group by "Device",date_part(\'month\',"NgayTao") order by date_part(\'month\',"NgayTao")';
        //     console.log("cau 2" + queryText);
        //     pResult = this._pgPool.query(queryText);
        // }
        pResult = this._pgPool.query(queryText);
        return pResult.then(function (result) {
            // let report = new Report();
            var reports = result.rows.map(function (r) {
                var report = new Report_model_2.Report();
                report.name = r.Device;
                report.count = r.count;
                return report;
            });
            return reports;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    return ReportRepo;
}(repositories_base_1.RepoBase));
exports.ReportRepo = ReportRepo;
