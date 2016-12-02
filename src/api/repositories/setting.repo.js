"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var repositories_base_1 = require('./repositories.base');
var setting_model_1 = require('../models/setting.model');
var SettingRepo = (function (_super) {
    __extends(SettingRepo, _super);
    function SettingRepo() {
        _super.call(this);
    }
    SettingRepo.prototype.getList = function (option) {
        var queryText = 'select * from test."n_App" ORDER BY "AppID"ASC ';
        console.info('Excute: ' + queryText);
        var pResult = this._pgPool.query(queryText);
        return pResult.then(function (result) {
            var sets = result.rows.map(function (r) {
                var set = new setting_model_1.Setting();
                set.AppID = r.AppID;
                set.APIKey = r.APIKey;
                set.AppName = r.AppName;
                set.NgayTao = new Date(r.NgayTao).toLocaleDateString().replace(/T.*/, '').split('-').reverse().join('/');
                set.IsActive = r.IsActive;
                return set;
            });
            return sets;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    SettingRepo.prototype.Create = function (option) {
        var queryText = 'INSERT INTO test."n_App" values($1,$2,$3,$4,$5)';
        console.log('Excute: ' + option.isactive);
        return this._pgPool.query(queryText, [
            option.AppID,
            option.APIKey,
            option.AppName,
            option.IsActive,
            option.NgayTao,
        ])
            .then(function (result) {
            return null;
        });
    };
    SettingRepo.prototype.Edit = function (option) {
        var queryText = 'UPDATE test."n_App" SET "APIKey" = $1, "AppName" = $2 , "NgayTao" =$3 , "IsActive" = $4 where "AppID" = $5';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [
            option.APIKey,
            option.AppName,
            option.NgayTao,
            option.IsActive,
            option.AppID,
        ])
            .then(function (result) {
            return null;
        });
    };
    SettingRepo.prototype.Delete = function (option) {
        var queryText = 'DELETE FROM test."n_App" where "AppID" = $1';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.AppID])
            .then(function (result) {
            return null;
        });
    };
    return SettingRepo;
}(repositories_base_1.RepoBase));
exports.SettingRepo = SettingRepo;
