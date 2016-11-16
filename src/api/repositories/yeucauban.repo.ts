import { RepoBase } from './repositories.base';
import { Yeucauban } from '../models/yeucauban.model'
import { Pool, QueryResult } from 'pg';

export class YeucaubanRepo extends RepoBase {

    constructor() {
        super();
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
}