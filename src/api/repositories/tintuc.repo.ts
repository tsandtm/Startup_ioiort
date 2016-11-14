import { RepoBase } from './repositories.base';
import { TinTuc } from '../models/tintuc.model'
import { Pool, QueryResult } from 'pg';

export class TinTucRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<TinTuc[]> {
        let queryText = 'SELECT * FROM public."TinTuc" ORDER BY "IDTinTuc" ASC ';
        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText, [option.id, option.name])
        } else {
            pResult = this._pgPool.query(queryText)
        }


        return pResult.then(result => {
            let tintucs: TinTuc[] = result.rows.map(r => {
                let tintuc = new TinTuc();
                tintuc.id = r.IDTinTuc;
                tintuc.IDDanhMucSite = r.IDDanhMucSite;
                tintuc.TieuDe= r.TieuDe;
                tintuc.MoTa = r.MoTa;
                tintuc.NoiDung = r.NoiDung;
                tintuc.ThoiGianDangTin = r.ThoiGianDangTin;
                tintuc.URLNews = r.URLNews;
                tintuc.URLThumImage = r.URLThumImage;
                tintuc.URLImage = r.URLImage;
                return tintuc;
            });
            return tintucs;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
}