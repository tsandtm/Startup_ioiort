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
        var queryText = 'select * from test."Notifications" ';
        console.info('Excute: ' + queryText);
        var pResult;
        if (option) {
            // pResult = this._pgPool.query(queryText + 'where "Notification_Tag" = ' + "'{$1}'" , [option.Notification_Tag])
            pResult = this._pgPool.query(queryText + 'where "NotificationID" = $1', [option.Notification_Tag]);
        }
        else {
            pResult = this._pgPool.query(queryText);
        }
        return pResult.then(function (result) {
            var Notifications = result.rows.map(function (r) {
                var notification = new Notification_model_1.Notification();
                notification.NotificationID = r.NotificationID;
                notification.Token = r.Token;
                notification.Email = r.Email;
                notification.TaiKhoan = r.TaiKhoan;
                notification.Device = r.Device;
                notification.PhoneNumber = r.PhoneNumber;
                notification.NgayTao = r.NgayTao;
                notification.FaceBook = r.FaceBook;
                notification.Notification_Tag = r.Notification_Tag;
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
        var queryText = 'select * from test.Notifications where "Notification_Tag" = $1';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.Notification_Tag])
            .then(function (result) {
            var notification = new Notification_model_1.Notification();
            notification.NotificationID = result.rows[0].NotificationID;
            notification.Token = result.rows[0].Token;
            notification.Email = result.rows[0].Email;
            notification.TaiKhoan = result.rows[0].TaiKhoan;
            notification.Device = result.rows[0].Device;
            notification.PhoneNumber = result.rows[0].PhoneNumber;
            notification.NgayTao = result.rows[0].NgayTao;
            notification.FaceBook = result.rows[0].FaceBook;
            notification.Notification_Tag = result.rows[0].Notification_Tag;
            return notification;
        });
    };
    return NotificationRepo;
}(repositories_base_1.RepoBase));
exports.NotificationRepo = NotificationRepo;
