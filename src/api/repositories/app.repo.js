"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var repositories_base_1 = require('./repositories.base');
var app_model_1 = require('../models/app.model');
var AppRepo = (function (_super) {
    __extends(AppRepo, _super);
    function AppRepo() {
        _super.call(this);
    }
    AppRepo.prototype.getList = function (option) {
        var queryText = 'select * from test."n_App" where "IsActive"=true';
        console.info('Excute: ' + queryText);
        var pResult;
        pResult = this._pgPool.query(queryText);
        return pResult.then(function (result) {
            var apps = result.rows.map(function (r) {
                var app = new app_model_1.Appkey();
                app.AppID = r.AppID;
                app.APIKey = r.APIKey;
                app.AppName = r.AppName;
                app.IsActive = r.IsActive;
                app.NgayTao = r.NgayTao;
                return app;
            });
            return apps;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    AppRepo.prototype.getOne = function (option) {
        var queryText = 'select * from test."n_App" where AppID=$1';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.id])
            .then(function (result) {
            var app = new app_model_1.Appkey();
            app.AppID = result.rows[0].AppID;
            app.APIKey = result.rows[0].APIKey;
            app.AppName = result.rows[0].AppName;
            app.IsActive = result.rows[0].IsActive;
            app.NgayTao = result.rows[0].NgayTao;
            return app;
        });
    };
    return AppRepo;
}(repositories_base_1.RepoBase));
exports.AppRepo = AppRepo;
