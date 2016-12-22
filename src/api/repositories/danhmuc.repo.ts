import { RepoBase } from './repositories.base';
import { DanhMuc } from '../models/danhmuc.model';
import { Pool, QueryResult } from 'pg';

export class DanhMucRePo extends RepoBase {

    constructor() {
        super();
    }
    public getList(option, limit: number, offset: number): Promise<DanhMuc[]> {
        let queryText = `SELECT * 
        FROM public."DanhMucSite" 
        WHERE "ParentID" = ${-1}
        ORDER BY "IDDanhMucSite" ASC LIMIT ${limit} OFFSET ${offset}`;
        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._query(queryText, [option.id, option.name])
        } else {
            pResult = this._query(queryText, [limit, offset])
        }
        return pResult.then(result => {
            let DanhMucs: DanhMuc[] = result.rows.map(r => {
                console.log(r);
                let d = new DanhMuc();
                d.IDDanhMucSite = r.IDDanhMucSite;
                d.DuongDan = r.DuongDan;
                d.MoTa = r.MoTa;
                d.TenGoi = r.TenGoi;
                d.SoLuongTinDuyetTim = r.SoLuongTinduyetTim;
                d.TemplateCrawlTieuDe = r.TempateCrawlTieuDe;
                d.TempateCrawlMoTa = r.TempateCrawlMoTa;
                d.TempateCrawlNoiDung = r.TempateCrawlNoiDung;
                d.TempateCrawlImage = r.TempateCrawlImage;
                d.Icon = r.Icon;
                d.TenGoi_KoDau = r.TenGoi_KoDau;
                d.LinkRSS = r.LinkRSS;
                return d;
            });
            return DanhMucs;
        })
            .catch(err => {
                console.error(err.message);
                return Promise.reject(err.message);
            });
    }
    public getOne(option): Promise<DanhMuc> {
        let queryText = `SELECT * 
        FROM public."DanhMucSite" 
        WHERE IDDanhMucSite=$1 AND "ParentID" = ${-1}
        ORDER BY "IDDanhMucSite" ASC
        `;

        console.info('Excute: ' + queryText);
        return this._query(queryText, [option.id, option.name])
            .then(result => {
                let tintuc = new DanhMuc();
                tintuc.IDDanhMucSite = result.rows[0].IDDanhMucSite;
                tintuc.DuongDan = result.rows[0].DuongDan;
                tintuc.TenGoi = result.rows[0].TenGoi;
                tintuc.MoTa = result.rows[0].MoTa;
                tintuc.SoLuongTinDuyetTim = result.rows[0].SoLuongTinduyetTim;
                tintuc.TemplateCrawlTieuDe = result.rows[0].TempateCrawlTieuDe;
                tintuc.TempateCrawlMoTa = result.rows[0].TempateCrawlMoTa;
                tintuc.TempateCrawlNoiDung = result.rows[0].TempateCrawlNoiDung;
                tintuc.TempateCrawlImage = result.rows[0].TempateCrawlImage;
                tintuc.LinkRSS = result.rows[0].LinkRSS;
                tintuc.Icon = result.rows[0].Icon;
                tintuc.TenGoi_KoDau = result.rows[0].TenGoi_KoDau;
                return tintuc;
            })
            .catch(err => {
                console.log(err)
                return Promise.reject(err)
            })
    }
    public getList_User(option): Promise<DanhMuc[]> {
        let queryText = `SELECT "DanhMucSite"."IDDanhMucSite", "DuongDan", "TenGoi", "MoTa", "SoLuongTinDuyetTim", "TempateCrawlTieuDe", "TempateCrawlMoTa", "TempateCrawlNoiDung", "TempateCrawlImage", "LinkRSS", "TenGoi_KoDau", "Icon" 
        FROM public."DanhMucSite" , public."User_DanhMucSite" 
        WHERE "DanhMucSite"."IDDanhMucSite" = "User_DanhMucSite"."IDDanhMucSite" AND "ParentID" = ${-1}
        ORDER BY "DanhMucSite"."IDDanhMucSite" ASC
        `

        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._query(queryText,
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
            pResult = this._query(queryText)
        }
        return pResult.then(result => {
            let webs: DanhMuc[] = result.rows.map(r => {
                let web = new DanhMuc();
                web.IDDanhMucSite = r.IDDanhMucSite;

                web.DuongDan = r.DuongDan;
                web.TenGoi = r.TenGoi;
                web.MoTa = r.MoTa;
                web.SoLuongTinDuyetTim = r.SoLuongTinDuyetTim;
                web.TemplateCrawlTieuDe = r.TempateCrawlTieuDe;
                web.TempateCrawlMoTa = r.TempateCrawlMoTa;
                web.TempateCrawlNoiDung = r.TempateCrawlNoiDung;
                web.TempateCrawlImage = r.TempateCrawlImage;
                web.LinkRSS = r.LinkRSS;
                web.Icon = r.Icon;
                web.TenGoi_KoDau = r.TenGoi_KoDau;
                
                return web;
            });
            return webs;
        })
            .catch(err => {
                console.error(err.message);
                return Promise.reject(err);
            });
    }


}