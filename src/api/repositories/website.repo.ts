import { RepoBase } from './repositories.base';
import { ListWeb } from '../models/website.model'
import { Pool, QueryResult } from 'pg';

export class ListWebRepo extends RepoBase {

    constructor() {
        super();
    }
    public GetList(option, limit, offset) {

        let query = `
SELECT  BANG1."IDDanhMucSite" = BANG2."IDDanhMucSite" IS NULL = FALSE AS giatri, BANG1."IDDanhMucSite",
            BANG1."TenGoi",BANG1."TenGoi_KoDau",BANG1."Icon",BANG1."DuongDan",( SELECT count("IDUser") AS DaChon
        from "User_DanhMucSite"
        where "IDUser" = ${option.IDUser}) AS DaChon

FROM 
        (       SELECT "IDDanhMucSite","TenGoi","TenGoi_KoDau","Icon","DuongDan"
                FROM public."DanhMucSite"
                WHERE "ParentID" = ${-1}  AND (SELECT EXISTS (SELECT 1 FROM public."User" WHERE "IDUser" = ${option.IDUser} ) )
                ORDER BY "IDDanhMucSite" ASC LIMIT ${limit ? limit : 12} OFFSET ${offset ? offset : 0}    ) AS BANG1
FULL OUTER JOIN 
        (       SELECT "User_DanhMucSite"."IDDanhMucSite","TenGoi","TenGoi_KoDau","Icon","DuongDan","IDUser" 
                FROM public."DanhMucSite" , public."User_DanhMucSite" 
                WHERE "DanhMucSite"."IDDanhMucSite" = "User_DanhMucSite"."IDDanhMucSite" and "IDUser"= ${option.IDUser}    ) AS BANG2
ON (BANG1."IDDanhMucSite" = BANG2."IDDanhMucSite")

WHERE
        (           BANG1."IDDanhMucSite",
                    BANG1."TenGoi",BANG1."TenGoi_KoDau",BANG1."Icon",BANG1."DuongDan") is not null
ORDER BY BANG1."IDDanhMucSite" ASC
                    `
        console.log(`Excute: ${query}`);
        return this._query(query)
            .then(result => {
                let webs: ListWeb[] = result.rows.map(r => {
                    let web = new ListWeb();
                    web.IDDanhMucSite = r.IDDanhMucSite;
                    web.DuongDan = r.DuongDan;
                    web.TenGoi = r.TenGoi;
                    web.TenGoi_KoDau = r.TenGoi_KoDau;
                    web.LinkRSS = r.LinkRSS;
                    web.Icon = r.Icon;
                    web.GiaTri = r.giatri;
                    web.DaChon = r.dachon;
                    return web;
                });
                return webs;
            })
            .catch(err => {
                console.log(err)
                return Promise.reject(err);
            })
    }

    public getName(option) {




        let queryText = `
        SELECT  BANG1."IDDanhMucSite" = BANG2."IDDanhMucSite" IS NULL = FALSE AS giatri, BANG1."IDDanhMucSite",
            BANG1."TenGoi",BANG1."TenGoi_KoDau",BANG1."Icon",BANG1."DuongDan"
FROM 
        (       SELECT "IDDanhMucSite","TenGoi","TenGoi_KoDau","Icon","DuongDan"
                FROM public."DanhMucSite" 
                WHERE "ParentID" = ${-1} AND (SELECT EXISTS (SELECT 1 FROM public."User" WHERE "IDUser" = ${option.IDUser ? option.IDUser : -1} ) )
                ORDER BY "IDDanhMucSite" ASC) AS BANG1
FULL OUTER JOIN 
        (       SELECT "User_DanhMucSite"."IDDanhMucSite","TenGoi","TenGoi_KoDau","Icon","DuongDan","IDUser" = ${option.IDUser ? option.IDUser : -1}
                FROM public."DanhMucSite" , public."User_DanhMucSite" 
                WHERE "DanhMucSite"."IDDanhMucSite" = "User_DanhMucSite"."IDDanhMucSite" AND "IDUser"= ${option.IDUser ? option.IDUser : -1}    ) AS BANG2
ON (BANG1."IDDanhMucSite" = BANG2."IDDanhMucSite")

WHERE
        (           BANG1."IDDanhMucSite",
                    BANG1."TenGoi",BANG1."TenGoi_KoDau",BANG1."Icon",BANG1."DuongDan") IS NOT NULL AND
                    LOWER(BANG1."TenGoi") LIKE LOWER('%${option.string ? option.string : ''}%') OR LOWER(BANG1."TenGoi_KoDau") LIKE LOWER('%${option.string ? option.string : ''}%')


ORDER BY BANG1."IDDanhMucSite" ASC
`;

        console.info('Excute: ' + queryText);
        return this._query(queryText)
            .then(result => {
                let webs: ListWeb[] = result.rows.map(r => {
                    let web = new ListWeb();
                    web.IDDanhMucSite = r.IDDanhMucSite;
                    web.DuongDan = r.DuongDan;
                    web.TenGoi = r.TenGoi;
                    web.TenGoi_KoDau = r.TenGoi_KoDau;
                    web.LinkRSS = r.LinkRSS;
                    web.Icon = r.Icon;
                    web.GiaTri = r.giatri
                    return web;
                });
                return webs;
            })
            .catch(err => {
                console.log(err);
            })
    }

}