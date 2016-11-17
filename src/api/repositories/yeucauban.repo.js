"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var repositories_base_1 = require('./repositories.base');
var yeucauban_model_1 = require('../models/yeucauban.model');
var YeucaubanRepo = (function (_super) {
    __extends(YeucaubanRepo, _super);
    function YeucaubanRepo() {
        _super.call(this);
    }
    YeucaubanRepo.prototype.getList = function (option) {
        var queryText = 'SELECT * FROM public."ioh_YeuCauBan"ORDER BY "YeuCauBanID"ASC ';
        console.info('Excute: ' + queryText);
        var pResult;
        if (option) {
            pResult = this._pgPool.query(queryText, [option.id, option.TieuDeTin]);
        }
        else {
            pResult = this._pgPool.query(queryText);
        }
        return pResult.then(function (result) {
            var yeucauban = result.rows.map(function (r) {
                var yeucau = new yeucauban_model_1.Yeucauban();
                yeucau.id = r.YeuCauBanID;
                yeucau.LoaiDichVuID = r.LoaiDichVuID;
                yeucau.KhachHangID = r.KhachHangID;
                yeucau.NgayDangTin = r.NgayDangTin;
                yeucau.TieuDeTin = r.TieuDeTin;
                yeucau.MatTienM2 = r.MatTienM2;
                yeucau.DuongVaoM2 = r.DuongVaoM2;
                yeucau.HuongNha = r.HuongNha;
                yeucau.HuongBanCong = r.HuongBanCong;
                yeucau.SoTang = r.SoTang;
                yeucau.SoPhongNgu = r.SoPhongNgu;
                yeucau.SoToilet = r.SoToilet;
                yeucau.NoiThat = r.NoiThat;
                yeucau.ArraryLinkHinh = r.ArraryLinkHinh;
                yeucau.TinhThanh = r.TinhThanh;
                yeucau.QuanHuyen = r.QuanHuyen;
                yeucau.PhuongXa = r.PhuongXa;
                yeucau.DuongPho = r.DuongPho;
                yeucau.DiaChi = r.DiaChi;
                yeucau.Gia = r.Gia;
                yeucau.DonViTinh = r.DonViTinh;
                yeucau.Map_Lat = r.Map_Lat;
                yeucau.Map_Long = r.Map_Long;
                yeucau.MoTa = r.MoTa;
                yeucau.ArraryDichVu = r.ArraryDichVu;
                return yeucau;
            });
            return yeucauban;
        })
            .catch(function (err) {
            console.error(err.message);
            return null;
        });
    };
    return YeucaubanRepo;
}(repositories_base_1.RepoBase));
exports.YeucaubanRepo = YeucaubanRepo;
