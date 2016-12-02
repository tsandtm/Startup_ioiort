"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var repositories_base_1 = require('./repositories.base');
var Notification_model_1 = require('../models/Notification.model');
var NotificationRepo = (function (_super) {
    __extends(NotificationRepo, _super);
    function NotificationRepo() {
        _super.call(this);
    }
    NotificationRepo.prototype.getList = function (option) {
        var queryText = 'select * from test."n_Notifications" ';
        var pResult;
        if (option.Notification_Tag != undefined) {
            pResult = this._pgPool.query(queryText + 'where "Notification_Tag" = ' + "'{" + option.Notification_Tag + "}'");
            console.info(option.Notification_Tag);
        }
        else {
            pResult = this._pgPool.query(queryText);
        }
        return pResult.then(function (result) {
            var Notifications = result.rows.map(function (r) {
                var notification = new Notification_model_1.Notification();
                notification.TieuDe = r.TieuDe;
                notification.TrangThaiGoi = r.TrangThaiGoi;
                notification.ThoiGianGui = r.ThoiGianGui;
                notification.SoLuong = r.SoLuong;
                notification.ThoiHanToiDa = r.ThoiHanToiDa;
                return notification;
            });
            return Notifications;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    NotificationRepo.prototype.getOne = function (option) {
        var queryText = 'select * from test."n_Notifications" where "Notification_Tag" = $1';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.Notification_Tag])
            .then(function (result) {
            var notification = new Notification_model_1.Notification();
            notification.TieuDe = result.rows[0].TieuDe;
            notification.TrangThaiGoi = result.rows[0].TrangThaiGoi;
            notification.ThoiGianGui = result.rows[0].ThoiGianGui;
            notification.SoLuong = result.rows[0].SoLuong;
            notification.ThoiHanToiDa = result.rows[0].ThoiHanToiDa;
            return notification;
        });
    };
    return NotificationRepo;
}(repositories_base_1.RepoBase));
exports.NotificationRepo = NotificationRepo;
