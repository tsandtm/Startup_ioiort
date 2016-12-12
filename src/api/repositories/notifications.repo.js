"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var repositories_base_1 = require('./repositories.base');
var notifications_model_1 = require('../models/notifications.model');
var NotificationsRepo = (function (_super) {
    __extends(NotificationsRepo, _super);
    function NotificationsRepo() {
        _super.call(this);
    }
    NotificationsRepo.prototype.getList = function (option) {
        var queryText = 'SELECT * FROM "n_Notifications" ORDER BY "NotifiID"ASC  ';
        console.info('Excute: ' + queryText);
        var pResult;
        if (option) {
            pResult = this._pgPool.query(queryText, [option.id, option.TieuDe]);
        }
        else {
            pResult = this._pgPool.query(queryText);
        }
        return pResult.then(function (result) {
            var notifications = result.rows.map(function (r) {
                var notification = new notifications_model_1.Notifications();
                notification.id = r.NotifiID;
                notification.AppID = r.AppID;
                notification.TieuDe = r.TieuDe;
                notification.NoiDung = r.NoiDung;
                notification.ThoiGianGui = new Date(r.ThoiGianGui).toLocaleDateString().replace(/T.*/, '').split('-').reverse().join('/');
                notification.ThoiHanToiDa = r.ThoiHanToiDa;
                notification.DoUuTien = r.DoUuTien;
                notification.TrangThaiGoi = r.TrangThaiGoi;
                notification.SoLuong = r.SoLuong;
                notification.Send_TagName = r.Send_TagName;
                notification.Send_UserName = r.Send_UserName;
                notification.Send_TagDenieName = r.Send_TagDenieName;
                notification.Send_UserDenieName = r.Send_UserDenieName;
                notification.Send_TagID = r.Send_TagID;
                notification.Send_UserID = r.Send_UserID;
                notification.Send_TagDenieID = r.Send_TagDenieID;
                notification.Send_UserDenieID = r.Send_UserDenieID;
                return notification;
            });
            return notifications;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    NotificationsRepo.prototype.getOne = function (option) {
        //  let queryText = 'SELECT "NotifiID", "AppID", "TieuDe", "NoiDung", "ThoiGianGui", "ThoiHanToiDa", "DoUuTien", "TrangThaiGoi", "SoLuong"FROM public."n_Notifications"; where NotifiID=id';
        var queryText = 'SELECT "NotifiID", "AppID", "TieuDe", "NoiDung", "ThoiGianGui", "ThoiHanToiDa", "DoUuTien", "TrangThaiGoi", "SoLuong"FROM public."n_Notifications"; where id=$1';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.id, option.TieuDe])
            .then(function (result) {
            var notifications = new notifications_model_1.Notifications();
            notifications.id = result.rows[0].id;
            notifications.AppID = result.rows[0].AppID;
            notifications.TieuDe = result.rows[0].TieuDe;
            notifications.NoiDung = result.rows[0].NoiDung;
            notifications.ThoiGianGui = result.rows[0].ThoiGianGui;
            notifications.ThoiHanToiDa = result.rows[0].ThoiHanToiDa;
            notifications.DoUuTien = result.rows[0].DoUuTien;
            notifications.TrangThaiGoi = result.rows[0].TrangThaiGoi;
            notifications.SoLuong = result.rows[0].SoLuong;
            return notifications;
        });
    };

    NotificationsRepo.prototype.getAllSendUser = function () {
        var queryText = 'SELECT * FROM test."n_Contacts_Notifications" ORDER BY "ContactID" ASC';
        console.info('Excute: ' + queryText);
        var pResult;
        pResult = this._pgPool.query(queryText);
        return pResult.then(function (result) {
            var sentcontacts = result.rows.map(function (r) {
                var sentcontact = new notifications_model_1.SentContact();
                sentcontact.NotifiID = r.NotifiID;
                sentcontact.ContactID = r.ContactID;
                sentcontact.TrangThai = r.TrangThai;
                sentcontact.ThoiGianCanGoi = r.ThoiGianCanGoi;
                sentcontact.LogLoi = r.LogLoi;
                sentcontact.SoLanGoi = r.SoLanGoi;
                sentcontact.ThoiGianDaGoi = r.ThoiGianDaGoi;
                return sentcontact;
            });
            return sentcontacts;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    NotificationsRepo.prototype.Edit = function (option) {
        // let queryText = 'UPDATE test."n_Notifications" SET "NotifiID" = $1, "AppID" = $2 , "TieuDe" =$3, "NoiDung" = $4,"ThoiGianGui" = $5,"ThoiHanToiDa" = $6,"DoUuTien" = $7,"TrangThaiGoi" = $8,"SoLuong" = $9';
        console.log(JSON.stringify(option));
        var queryText = 'UPDATE test."n_Notifications" SET "AppID"=$1,"TieuDe" =$2, "NoiDung" = $3,"DoUuTien"=$4,"ThoiHanToiDa"=$5,"ThoiGianGui"=$6,"Send_TagID"=$7,"Send_TagName"=$8,"Send_UserName"=$9,"Send_UserID"=$10,"Send_TagDenieName"=$11,"Send_TagDenieID"=$12,"Send_UserDenieName"=$13,"Send_UserDenieID"=$14,"SoLuong"=$15 WHERE "NotifiID"=$16';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [
            option.AppID,
            option.TieuDe,
            option.NoiDung,
            option.DoUuTien,
            option.ThoiHanToiDa,
            option.ThoiGianGui,
            option.Send_TagID,
            option.Send_TagName,
            option.Send_UserName,
            option.Send_UserID,
            option.Send_TagDenieName,
            option.Send_TagDenieID,
            option.Send_UserDenieName,
            option.Send_UserDenieID,
            option.SoLuong,
            option.id
        ]).then(function (result) { return null; }).catch(function (error) {
            console.error('Error: ', error);
            return Promise.reject(error);
        });
        // return this._pgPool.query(queryText, [
        //     option.NotifiID,
        //     option.AppID,
        //     option.TieuDe,
        //     option.NoiDung,
        //     option.ThoiGianGui,
        //     option.ThoiHanToiDa,
        //     option.DoUuTien,
        //     option.TrangThaiGoi,
        //     option.SoLuong,
        // ])
        //     .then(result => {
        //         return null;
        //     });
    };
    return NotificationsRepo;
}(repositories_base_1.RepoBase));
exports.NotificationsRepo = NotificationsRepo;
