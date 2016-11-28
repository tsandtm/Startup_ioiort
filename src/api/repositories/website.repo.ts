import { RepoBase } from './repositories.base';
import { ListWeb } from '../models/website.model'
import { Pool, QueryResult } from 'pg';

export class ListWebRepo extends RepoBase {

    constructor() {
        super();
    }
    public getList(option, limit: number, offset: number): Promise<ListWeb[]> {
        console.log('Limit: ' + limit)
        console.log('Offset: ' + offset)
        let queryText = 'SELECT * FROM public."DanhMucSite" ORDER BY "IDDanhMucSite" ASC LIMIT $1 OFFSET $2';

        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText,
                [option.IDDanhMucSite,
                option.DuongDan,
                option.TenGoi,
                option.MoTa,
                option.SoLuongTinDuyetTim,
                option.TempateCrawlTieuDe,
                option.TempateCrawlMoTa,
                option.TempateCrawlNoiDung,
                option.TempateCrawlImage,
                option.LinkRSS,
                option.Icon,
                option.TenGoi_KoDau
                ])
        } else {
            pResult = this._pgPool.query(queryText, [limit, offset])
        }
        return pResult.then(result => {
            let webs: ListWeb[] = result.rows.map(r => {
                let web = new ListWeb();
                web.IDDanhMucSite = r.IDDanhMucSite;
                web.DuongDan = r.DuongDan;
                web.TenGoi = r.TenGoi;
                web.MoTa = r.MoTa;
                web.SoLuongTinDuyetTim = r.SoLuongTinDuyetTim;
                web.TempateCrawlTieuDe = r.TempateCrawlTieuDe;
                web.TempateCrawlMoTa = r.TempateCrawlMoTa;
                web.TempateCrawlNoiDung = r.TempateCrawlNoiDung;
                web.TempateCrawlImage = r.TempateCrawlImage;
                web.LinkRSS = r.LinkRSS;
                web.Icon=r.Icon,
                web.TenGoi_KoDau=r.TenGoi_KoDau
                return web;
            });
            return webs;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
     public getList_User(option) : Promise<ListWeb[]>{
         let queryText= 'SELECT "DanhMucSite"."IDDanhMucSite", "DuongDan", "TenGoi", "MoTa", "SoLuongTinDuyetTim", "TempateCrawlTieuDe", "TempateCrawlMoTa", "TempateCrawlNoiDung", "TempateCrawlImage", "LinkRSS", "TenGoi_KoDau", "Icon" FROM public."DanhMucSite" , public."User_DanhMucSite" where "DanhMucSite"."IDDanhMucSite" = "User_DanhMucSite"."IDDanhMucSite"';
         console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText,
                [option.IDDanhMucSite,
                option.DuongDan,
                option.TenGoi,
                option.MoTa,
                option.SoLuongTinDuyetTim,
                option.TempateCrawlTieuDe,
                option.TempateCrawlMoTa,
                option.TempateCrawlNoiDung,
                option.TempateCrawlImage,
                option.LinkRSS,
                option.Icon,
                option.TenGoi_KoDau
                ])
        } else {
            pResult = this._pgPool.query(queryText)
        }
        return pResult.then(result => {
            let webs: ListWeb[] = result.rows.map(r => {
                let web = new ListWeb();
                web.IDDanhMucSite = r.IDDanhMucSite;
                web.DuongDan = r.DuongDan;
                web.TenGoi = r.TenGoi;
                web.MoTa = r.MoTa;
                web.SoLuongTinDuyetTim = r.SoLuongTinDuyetTim;
                web.TempateCrawlTieuDe = r.TempateCrawlTieuDe;
                web.TempateCrawlMoTa = r.TempateCrawlMoTa;
                web.TempateCrawlNoiDung = r.TempateCrawlNoiDung;
                web.TempateCrawlImage = r.TempateCrawlImage;
                web.LinkRSS = r.LinkRSS;
                web.Icon=r.Icon,
                web.TenGoi_KoDau=r.TenGoi_KoDau
                return web;
            });
            return webs;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
     }
     
    // public getListShow(option): Promise<ListWeb[]> {
    //     let queryText = 'select * from "danhmuc" where show = true order by name asc';

    //     console.info('Excute: ' + queryText);
    //     let pResult;

    //     if (option) {
    //         pResult = this._pgPool.query(queryText,
    //             [option.IDDanhMucSite,
    //             option.DuongDan,
    //             option.TenGoi,
    //             option.MoTa,
    //             option.SoLuongTinDuyetTim,
    //             option.TempateCrawlTieuDe,
    //             option.TempateCrawlMoTa,
    //             option.TempateCrawlNoiDung,
    //             option.TempateCrawlImage,
    //             option.LinkRSS,
    //             ])
    //     } else {
    //         pResult = this._pgPool.query(queryText)
    //     }
    //     return pResult.then(result => {
    //         let webs: ListWeb[] = result.rows.map(r => {
    //             let web = new ListWeb();
    //             web.IDDanhMucSite = r.IDDanhMucSite;
    //             web.DuongDan = r.DuongDan;
    //             web.TenGoi = r.TenGoi;
    //             web.MoTa = r.MoTa;
    //             web.SoLuongTinDuyetTim = r.SoLuongTinDuyetTim;
    //             web.TempateCrawlTieuDe = r.TempateCrawlTieuDe;
    //             web.TempateCrawlMoTa = r.TempateCrawlMoTa;
    //             web.TempateCrawlNoiDung = r.TempateCrawlNoiDung;
    //             web.TempateCrawlImage = r.TempateCrawlImage;
    //             web.LinkRSS = r.LinkRSS;
    //             return web;
    //         });
    //         return webs;
    //     })
    //         .catch(err => {
    //             console.error(err.message);
    //             return null;
    //         });
    // }

    // public UpdateShow(id: number, value): Promise<ListWeb> {
    //     let queryText = 'update "DanhMucSite" set show = $1 where id=$2';

    //     console.info('Excute: ' + queryText);

    //     return this._pgPool.query(queryText, [value.show, id])
    //         .then(result => {
    //             let webs = new ListWeb();
    //             webs.id = id;
    //             console.log('rows: ' + JSON.stringify(result.rows))
    //             return webs;
    //         })
    //         .catch(error => {
    //             console.error('Error: ', error);
    //             return Promise.reject(error);
    //         })
    // }


    public count(option): Promise<number> {
        let queryText = 'select count(*) as abc from news';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText)
            .then(result => {
                return result.rows[0].abc
            })
    }

}