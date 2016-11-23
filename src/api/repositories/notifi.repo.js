"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var repositories_base_1 = require('./repositories.base');
var notifi_model_1 = require('../models/notifi.model');
var NotifiRepo = (function (_super) {
    __extends(NotifiRepo, _super);
    function NotifiRepo() {
        _super.call(this);
    }
    NotifiRepo.prototype.Create = function (option) {
        var queryText = 'INSERT INTO test."n_Notifications" values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.NotifiID,
            option.AppID,
            option.TieuDe,
            option.Noidung,
            option.Thoigiangui,
            option.ThoiHan,
            option.DoUuTien,
            option.Trangthai,
            option.Soluong,
            option.SendUser,
            option.SendTag,
            option.DeniedUser,
            option.DeniedTag,
        ])
            .then(function (result) {
            return null;
        });
    };
    NotifiRepo.prototype.Insert = function (option) {
        var queryText = 'INSERT INTO test."n_Contacts_Notifications"("ContactID", "NotifiID") VALUES ($1, $2);';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.ContactID,
            option.NotifiID,
        ])
            .then(function (result) {
            return null;
        });
    };
    NotifiRepo.prototype.Update = function (option) {
        var queryText = 'UPDATE test."n_Notifications" SET "TrangThaiGoi"=$1 WHERE "NotifiID"=$2;';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.Trangthai, option.NotifiID])
            .then(function (result) {
            return null;
        });
    };
    NotifiRepo.prototype.getAllNoti = function (option) {
        var queryText = 'select * from test."n_Notifications"';
        console.info('Excute: ' + queryText);
        var pResult;
        if (option.NotifiID != undefined) {
            pResult = this._pgPool.query(queryText + 'where "NotifiID" = ' + option.NotifiID);
        }
        else {
            pResult = this._pgPool.query(queryText);
        }
        return pResult.then(function (result) {
            var notifis = result.rows.map(function (r) {
                var notifi = new notifi_model_1.Notifi();
                notifi.NotifiID = r.NotifiID;
                notifi.AppID = r.AppID;
                notifi.TieuDe = r.TieuDe;
                notifi.Noidung = r.NoiDung;
                notifi.Thoigiangui = r.ThoiGianGui;
                notifi.ThoiHan = r.ThoiHanToiDa;
                notifi.DoUuTien = r.DoUuTien;
                notifi.Trangthai = r.TrangThaiGoi;
                notifi.Soluong = r.SoLuong;
                notifi.SendUser = r.Send_User;
                notifi.SendTag = r.Send_Tag;
                notifi.DeniedUser = r.Send_UserDenie;
                notifi.DeniedTag = r.Send_TagDenie;
                return notifi;
            });
            return notifis;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    NotifiRepo.prototype.getLastNoti = function () {
        var queryText = 'select * from test."n_Notifications" order by "NotifiID" desc limit 1';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText)
            .then(function (result) {
            var notifi = new notifi_model_1.Notifi();
            notifi.NotifiID = result.rows[0].NotifiID;
            notifi.AppID = result.rows[0].AppID;
            notifi.TieuDe = result.rows[0].TieuDe;
            notifi.Noidung = result.rows[0].Noidung;
            notifi.Thoigiangui = result.rows[0].Thoigiangui;
            notifi.ThoiHan = result.rows[0].ThoiHan;
            notifi.DoUuTien = result.rows[0].DoUuTien;
            notifi.Trangthai = result.rows[0].Trangthai;
            notifi.Soluong = result.rows[0].Soluong;
            notifi.SendUser = result.rows[0].SendUser;
            notifi.SendTag = result.rows[0].SendTag;
            notifi.DeniedUser = result.rows[0].DeniedUser;
            notifi.DeniedTag = result.rows[0].DeniedTag;
            return notifi;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    NotifiRepo.prototype.getSL = function (option) {
        var queryText = 'SELECT "NotifiID",COUNT(*) FROM test."Contacts" A,test."n_Notifications" B WHERE (Array[A."ContactID"] && B."Send_User" OR A."Contact_Tag" && B."Send_Tag") AND (Array[A."ContactID"] && B."Send_UserDenie" OR A."Contact_Tag" && B."Send_TagDenie") = false GROUP BY "NotifiID"';
        console.info('Excute: ' + queryText);
        var pResult;
        if (option.NotifiID == undefined) {
            pResult = this._pgPool.query(queryText);
        }
        return pResult.then(function (result) {
            var slsends = result.rows.map(function (r) {
                var slsend = new notifi_model_1.SLSend();
                slsend.NotifiID = r.NotifiID;
                slsend.count = r.count;
                return slsend;
            });
            return slsends;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    NotifiRepo.prototype.getSLDenied = function (option) {
        var queryText = 'SELECT "NotifiID",COUNT(*) FROM test."Contacts" A,test."n_Notifications" B WHERE (Array[A."ContactID"] && B."Send_UserDenie" OR A."Contact_Tag" && B."Send_TagDenie") = false GROUP BY "NotifiID"';
        console.info('Excute: ' + queryText);
        var pResult;
        if (option.NotifiID == undefined) {
            pResult = this._pgPool.query(queryText);
        }
        return pResult.then(function (result) {
            var slsends = result.rows.map(function (r) {
                var slsend = new notifi_model_1.SLSend();
                slsend.NotifiID = r.NotifiID;
                slsend.count = r.count;
                return slsend;
            });
            return slsends;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    NotifiRepo.prototype.getslsend = function (option) {
        var queryText = 'SELECT COUNT(*) FROM test."Contacts" A WHERE (Array[A."ContactID"] && $1 OR A."Contact_Tag" && $2) AND (Array[A."ContactID"] && $3 OR A."Contact_Tag" && $4) = false';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.contact, option.tag, option.contactdenied, option.tagdenied])
            .then(function (result) {
            var slsend;
            slsend = result.rows[0].count;
            return slsend;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    NotifiRepo.prototype.getslsenddenied = function (option) {
        var queryText = 'SELECT COUNT(*) FROM test."Contacts" A WHERE (Array[A."ContactID"] && $1 OR A."Contact_Tag" && $2) = false';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.contactdenied, option.tagdenied])
            .then(function (result) {
            var slsend;
            slsend = result.rows[0].count;
            return slsend;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    NotifiRepo.prototype.getSentUser = function (option) {
        var queryText = 'SELECT "NotifiID","ContactID","TaiKhoan","Device","Email","FaceBook" FROM test."Contacts" A,test."n_Notifications" B WHERE (Array[A."ContactID"] && B."Send_User" OR A."Contact_Tag" && B."Send_Tag") AND (Array[A."ContactID"] && B."Send_UserDenie" OR A."Contact_Tag" && B."Send_TagDenie") = false';
        console.info('Excute: ' + queryText);
        var pResult;
        if (option.NotifiID == undefined) {
            pResult = this._pgPool.query(queryText);
        }
        return pResult.then(function (result) {
            var sents = result.rows.map(function (r) {
                var sent = new notifi_model_1.SentUser();
                sent.NotifiID = r.NotifiID;
                sent.ContactID = r.ContactID;
                sent.TaiKhoan = r.TaiKhoan;
                sent.Device = r.Device;
                sent.Email = r.Email;
                sent.FaceBook = r.FaceBook;
                return sent;
            });
            return sents;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    NotifiRepo.prototype.getSentUserDenied = function (option) {
        var queryText = 'SELECT "NotifiID","ContactID","TaiKhoan","Device","Email","FaceBook" FROM test."Contacts" A,test."n_Notifications" B WHERE (Array[A."ContactID"] && B."Send_UserDenie" OR A."Contact_Tag" && B."Send_TagDenie") = false';
        console.info('Excute: ' + queryText);
        var pResult;
        if (option.NotifiID == undefined) {
            pResult = this._pgPool.query(queryText);
        }
        return pResult.then(function (result) {
            var sents = result.rows.map(function (r) {
                var sent = new notifi_model_1.SentUser();
                sent.NotifiID = r.NotifiID;
                sent.ContactID = r.ContactID;
                sent.TaiKhoan = r.TaiKhoan;
                sent.Device = r.Device;
                sent.Email = r.Email;
                sent.FaceBook = r.FaceBook;
                return sent;
            });
            return sents;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    NotifiRepo.prototype.getOneNoti = function (option) {
        var queryText = 'select * from test."n_Notifications" where "NotifiID" = $1';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.id])
            .then(function (result) {
            var notifi = new notifi_model_1.Notifi();
            notifi.NotifiID = result.rows[0].NotifiID;
            notifi.AppID = result.rows[0].AppID;
            notifi.TieuDe = result.rows[0].TieuDe;
            notifi.Noidung = result.rows[0].Noidung;
            notifi.Thoigiangui = result.rows[0].Thoigiangui;
            notifi.ThoiHan = result.rows[0].ThoiHan;
            notifi.DoUuTien = result.rows[0].DoUuTien;
            notifi.Trangthai = result.rows[0].Trangthai;
            notifi.Soluong = result.rows[0].Soluong;
            notifi.SendUser = result.rows[0].SendUser;
            notifi.SendTag = result.rows[0].SendTag;
            notifi.DeniedUser = result.rows[0].DeniedUser;
            notifi.DeniedTag = result.rows[0].DeniedTag;
            return notifi;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    return NotifiRepo;
}(repositories_base_1.RepoBase));
exports.NotifiRepo = NotifiRepo;