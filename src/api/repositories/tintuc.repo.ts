import { RepoBase } from './repositories.base';
import { TinTuc } from '../models/tintuc.model';
import { Pool, QueryResult } from 'pg';

export class TinTucRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<TinTuc[]> {
        let queryText = 'SELECT * FROM public."TinTuc" ORDER BY "IDTinTuc" ASC';

        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText, [option.id, option.name])
        } else {
            pResult = this._pgPool.query(queryText)
        }


           return pResult.then(result => {
            let TinTucs: TinTuc[] = result.rows.map(r => {
                let tintuc = new TinTuc();
                tintuc.id = r.IDTinTuc;
                tintuc.IDDanhMucSite = r.IDDanhMucSite;
                tintuc.TieuDe = r.TieuDe;
                tintuc.MoTa=r.MoTa;
                tintuc.NoiDung=r.NoiDung;
                tintuc.ThoiGianDangTin=r.ThoiGianDangTin;
                tintuc.URLNews=r.URLNews;
                tintuc.URLThumbImage=r.URLThumbImage;
                tintuc.URLImage=r.URLImage;
                // console.log(r.idtintuc)
                return tintuc;
            });
            return TinTucs;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
    public getOne(option): Promise<TinTuc> {
        let queryText = 'SELECT * FROM public."TinTuc" WHERE IDTinTuc=id';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [option.id, option.name])
            .then(result => {
                let tintuc = new TinTuc();
                tintuc.id = result.rows[0].IDTinTuc;
                tintuc.IDDanhMucSite = result.rows[0].IDDanhMucSite;
                tintuc.TieuDe=result.rows[0].TieuDe;
                tintuc.MoTa=result.rows[0].MoTa;
                tintuc.NoiDung=result.rows[0].Mota;
                tintuc.URLNews=result.rows[0].URLNews;
                tintuc.URLThumbImage=result.rows[0].URLThumbImage;
                tintuc.URLImage=result.rows[0].URLImage;
                tintuc.ThoiGianDangTin=result.rows[0].ThoiGianDangTin;
                return tintuc;
            });
    }

}