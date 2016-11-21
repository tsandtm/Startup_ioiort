import { RepoBase } from './repositories.base';
import { Yeucauban, LoaiDichVu, KhachHang } from '../models/yeucauban.model'
import { Pool, QueryResult } from 'pg';

export class YeucaubanRepo extends RepoBase {

    constructor() {
        super();
    }
    public getLoaiDV(option): Promise<LoaiDichVu[]> {
        let queryText = 'SELECT "LoaiDichVuID", "KyHieu", "TenGoi", "HinhThuc"FROM public."ioh_LoaiDichVu';

        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText, [option.id, option.TieuDeTin])
        } else {
            pResult = this._pgPool.query(queryText)
        }


        return pResult.then(result => {
            let loaidichvu: LoaiDichVu[] = result.rows.map(r => {
                let loaidv = new LoaiDichVu();
                loaidv.id = r.LoaiDichVuID;
                loaidv.KyHieu = r.KyHieu;
                loaidv.TenGoi = r.TenGoi;
                loaidv.HinhThuc = r.HinhThuc;
                return loaidv;
            });
            return loaidichvu;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
    public getList(option): Promise<Yeucauban[]> {
        let queryText = 'SELECT * FROM public."ioh_YeuCauBan"ORDER BY "YeuCauBanID"ASC ';

        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText, [option.id, option.TieuDeTin])
        } else {
            pResult = this._pgPool.query(queryText)
        }


        return pResult.then(result => {
            let yeucauban: Yeucauban[] = result.rows.map(r => {
                let yeucau = new Yeucauban();
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
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }

    public add(yeucauban: Yeucauban): Promise<Yeucauban> {
        let queryText = `INSERT INTO public."ioh_YeuCauBan"("LoaiDichVuID", "KhachHangID",
	  "TieuDeTin", "MatTienM2", "DuongVaoM2", "HuongNha", "HuongBanCong", "SoTang", "SoPhongNgu", "SoToilet", "NoiThat", "TinhThanh", "QuanHuyen", "PhuongXa", "DuongPho", "DiaChi", "Gia", "DonViTinh", "MoTa")
	VALUES (1,2, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);`
        // let queryText = 'INSERT INTO "ioh_YeuCauBan" VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,&11,$12,$13,$14,$15,$16,$17,$18)';
        console.log('Add api: ' + JSON.stringify(yeucauban))

        return this._pgPool.query(queryText, [yeucauban.TieuDeTin, yeucauban.MatTienM2, yeucauban.DuongVaoM2, yeucauban.HuongNha,
                                             yeucauban.HuongBanCong,yeucauban.SoTang, yeucauban.SoPhongNgu, yeucauban.SoToilet, 
                                             yeucauban.NoiThat,yeucauban.TinhThanh, yeucauban.QuanHuyen, yeucauban.PhuongXa,
                                             yeucauban.DuongPho, yeucauban.DiaChi, yeucauban.Gia, yeucauban.DonViTinh, yeucauban.MoTa])
            .then(result => yeucauban)
            .catch(error => Promise.reject(error));
    }

    public deletetin(id: number): Promise<Yeucauban> {
        let queryText = 'DELETE FROM public."ioh_YeuCauBan" WHERE "YeuCauBanID"=$1';

        return this._pgPool.query(queryText, [id])
            .then(result => {
                let yeucau = new Yeucauban();
                yeucau.id = id;
                console.log(result.rows[0]);
                return yeucau;
            }).catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            })
    }


}