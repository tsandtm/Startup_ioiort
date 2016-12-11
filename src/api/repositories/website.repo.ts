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
        let queryText = `SELECT "IDDanhMucSite","TenGoi","TenGoi_KoDau","Icon","DuongDan","LinkRSS" 
        FROM public."DanhMucSite" ORDER BY "IDDanhMucSite" ASC LIMIT ${limit} OFFSET ${offset}`;

        console.info('Excute: ' + queryText);
        let pResult;
        pResult = this._pgPool.query(queryText);
        return pResult.then(result => {
            let webs: ListWeb[] = result.rows.map(r => {
                let web = new ListWeb();
                web.IDDanhMucSite = r.IDDanhMucSite;
                web.DuongDan = r.DuongDan;
                web.TenGoi = r.TenGoi;
                web.TenGoi_KoDau = r.TenGoi_KoDau;
                web.LinkRSS = r.LinkRSS;
                web.Icon = r.Icon;
                return web;
            });
            return webs;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
    public getList_User(option): Promise<ListWeb[]> {
        let queryText = `SELECT "User_DanhMucSite"."IDDanhMucSite","TenGoi","TenGoi_KoDau","Icon","DuongDan","LinkRSS","IDUser" 
        FROM public."DanhMucSite" , public."User_DanhMucSite" 
        where "DanhMucSite"."IDDanhMucSite" = "User_DanhMucSite"."IDDanhMucSite" and "IDUser"=${option}`;
        console.log("id " + option);
        console.info('Excute: ' + queryText + `${option}`);
        let pResult;
        pResult = this._pgPool.query(queryText);
        return pResult.then(result => {
            let webs: ListWeb[] = result.rows.map(r => {
                let web = new ListWeb();
                web.IDDanhMucSite = r.IDDanhMucSite;
                web.DuongDan = r.DuongDan;
                web.TenGoi = r.TenGoi;
                web.TenGoi_KoDau = r.TenGoi_KoDau;
                web.LinkRSS = r.LinkRSS;
                web.Icon = r.Icon;
                return web;
            });
            return webs;
        })
            .catch(err => {
                console.error(err.message);
                return;
            });
    }

    public count(option): Promise<number> {
        let queryText = 'select count(*) as abc from news';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText)
            .then(result => {
                return result.rows[0].abc
            })
    }

}