import { RepoBase } from './repositories.base';
import { Tintuc } from '../models/tintuc.model'
import { Pool, QueryResult } from 'pg';

export class News extends RepoBase {

    constructor() {
        super();
    }

    public getList(option?): Promise<Tintuc[]> {
        let queryText = `SELECT * FROM public."TinTuc"
                            ORDER BY "IDTinTuc"
                                    ASC `;

        let pResult = this._pgPool.query(queryText)

        return pResult.then(result => {
            let News: Tintuc[] = result.rows.map(r => {
                let news = new Tintuc();
                news.id = r.IDTinTuc
                news.IDDanhMucSite = r.IDDanhMucSite
                news.MoTa = r.Mota;
                news.NoiDung = r.NoiDung;
                news.ThoiGianDangTin = r.ThoiGianDangTin;
                news.URLThumbImage = r.URLThumbImage;
                news.URLNews = r.URLNews;
                news.TieuDe = r.TieuDe;
                
                return news;
            });
            return News;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
}