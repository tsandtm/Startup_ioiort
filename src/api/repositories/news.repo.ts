import { RepoBase } from './repositories.base';
import { ListNews } from '../models/news.model'
import { Pool, QueryResult } from 'pg';

export class ListNewsRepo extends RepoBase {

    constructor() {
        super();
    }

     public getList(option, limit: number, offset: number): Promise<ListNews[]> {

        let queryText = 'SELECT * FROM public."TinTuc" , public."User_DanhMucSite" where "ArrayDaXoa" is null AND "TinTuc"."IDDanhMucSite" = "User_DanhMucSite"."IDDanhMucSite" ORDER BY "TinTuc"."ThoiGianDangTin" DESC LIMIT $1 OFFSET $2';

        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText,
                [option.IDTinTuc,
                option.TieuDe,
                option.MoTa,
                option.NoiDung,
                option.ThoiGianDangTin,
                option.URLNews,
                option.URLThumbImage,
                option.URLImage,
                ])
        } else {
            pResult = this._pgPool.query(queryText, [limit, offset])
        }


        return pResult.then(result => {
            let news: ListNews[] = result.rows.map(r => {
                let nw = new ListNews();
                nw.IDTinTuc = r.IDTinTuc;
                nw.IDDanhMucSite = r.IDDanhMucSite;
                nw.TieuDe = r.TieuDe;
                nw.MoTa = r.MoTa;
                nw.NoiDung = r.NoiDung;
                nw.ThoiGianDangTin = r.ThoiGianDangTin;
                nw.URLNews = r.URLNews;
                nw.URLThumbImage = r.URLThumbImage;
                nw.URLImage = r.URLImage;
                return nw;
            });
            return news;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }

    public getNew(option, limit: number, offset: number): Promise<ListNews[]> {
        console.log(option)
        console.log(offset)
        console.log(limit)
        let queryText = 'SELECT "URLNews" FROM public."TinTuc",public."User_DanhMucSite" WHERE "ArrayDaXoa" is null AND "TinTuc"."IDDanhMucSite"="User_DanhMucSite"."IDDanhMucSite" ORDER BY "ThoiGianDangTin" DESC LIMIT $1 OFFSET $2';

        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText, 
            [option.IDTinTuc,
                option.TieuDe,
                option.MoTa,
                option.NoiDung,
                option.ThoiGianDangTin,
                option.URLNews,
                option.URLThumbImage,
                option.URLImage,
            ])
        } else {
            pResult = this._pgPool.query(queryText, [limit, offset])
        }


        return pResult.then(result => {
            let news: ListNews[] = result.rows.map(r => {
                let nw = new ListNews();
               nw.IDTinTuc = r.IDTinTuc;
                nw.IDDanhMucSite = r.IDDanhMucSite;
                nw.TieuDe = r.TieuDe;
                nw.MoTa = r.MoTa;
                nw.NoiDung = r.NoiDung;
                nw.ThoiGianDangTin = r.ThoiGianDangTin;
                nw.URLNews = r.URLNews;
                nw.URLThumbImage = r.URLThumbImage;
                nw.URLImage = r.URLImage;
                return nw;
            });
            return news;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
    /**
     *
     */
    public gettinnoibat(option, limit: number, offset: number): Promise<ListNews[]> {
        console.log(option)
        console.log(offset)
        console.log(limit)
        let queryText = 'SELECT "URLNews" FROM public."TinTuc",public."User_DanhMucSite" WHERE "ArrayDaXoa" is null AND "TinTuc"."IDDanhMucSite"="User_DanhMucSite"."IDDanhMucSite" ORDER BY cardinality("ArrayDaXem") DESC NULLS LAST LIMIT $1 OFFSET $2';

        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText, 
            [option.IDTinTuc,
                option.TieuDe,
                option.MoTa,
                option.NoiDung,
                option.ThoiGianDangTin,
                option.URLNews,
                option.URLThumbImage,
                option.URLImage,
            ])
        } else {
            pResult = this._pgPool.query(queryText, [limit, offset])
        }


        return pResult.then(result => {
            let news: ListNews[] = result.rows.map(r => {
                let nw = new ListNews();
               nw.IDTinTuc = r.IDTinTuc;
                nw.IDDanhMucSite = r.IDDanhMucSite;
                nw.TieuDe = r.TieuDe;
                nw.MoTa = r.MoTa;
                nw.NoiDung = r.NoiDung;
                nw.ThoiGianDangTin = r.ThoiGianDangTin;
                nw.URLNews = r.URLNews;
                nw.URLThumbImage = r.URLThumbImage;
                nw.URLImage = r.URLImage;
                return nw;
            });
            return news;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }

    

    //  public count(option): Promise<number> {
    //     let queryText = 'select count(*) as abc from news';

    //     console.info('Excute: ' + queryText);

    //     return this._pgPool.query(queryText)
    //         .then(result => {
    //             return result.rows[0].abc
    //         })
    // }

    public DeleteNews(id: number): Promise<ListNews> {
        let queryText = 'delete from "TinTuc" where IDTinTuc=$1';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [id])
            .then(result => {
                let news = new ListNews();
                news.IDTinTuc = id;
                console.log('rows: ' + JSON.stringify(result.rows))
                return news;
            })
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            })
    }
   

}