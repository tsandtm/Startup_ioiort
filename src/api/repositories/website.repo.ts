import { RepoBase } from './repositories.base';
import { ListWeb } from '../models/website.model'
import { Pool, QueryResult } from 'pg';

export class ListWebRepo extends RepoBase {

    constructor() {
        super();
    }
	/*
	SELECT BANG1."IDDanhMucSite" = BANG2."IDDanhMucSite" IS NULL = FALSE AS GIATRI, BANG1."IDDanhMucSite", BANG2."IDDanhMucSite",
BANG1."TenGoi",BANG1."TenGoi_KoDau",BANG1."Icon",BANG1."DuongDan",BANG1."LinkRSS",BANG2."IDUser" 
FROM 
(SELECT "IDDanhMucSite","TenGoi","TenGoi_KoDau","Icon","DuongDan","LinkRSS" 
        FROM public."DanhMucSite" ORDER BY "IDDanhMucSite" ASC LIMIT 12 OFFSET 0) AS BANG1
FULL OUTER JOIN 
(SELECT "User_DanhMucSite"."IDDanhMucSite","TenGoi","TenGoi_KoDau","Icon","DuongDan","LinkRSS","IDUser" 
        FROM public."DanhMucSite" , public."User_DanhMucSite" 
        where "DanhMucSite"."IDDanhMucSite" = "User_DanhMucSite"."IDDanhMucSite" and "IDUser"=1) AS BANG2
ON (BANG1."IDDanhMucSite" = BANG2."IDDanhMucSite")
	*/

    /**
     * GetList : Hàm trả về danh sách User nào đã chọn danh nào thì trả về giá trị là true còn lại false
     */
    public GetList(option, limit, offset) {
        let query = `
SELECT  BANG1."IDDanhMucSite" = BANG2."IDDanhMucSite" IS NULL = FALSE AS giatri, BANG1."IDDanhMucSite",
            BANG1."TenGoi",BANG1."TenGoi_KoDau",BANG1."Icon",BANG1."DuongDan"
FROM 
        (       SELECT "IDDanhMucSite","TenGoi","TenGoi_KoDau","Icon","DuongDan"
                FROM public."DanhMucSite" 
                ORDER BY "IDDanhMucSite" ASC LIMIT ${limit} OFFSET ${offset}    ) AS BANG1
FULL OUTER JOIN 
        (       SELECT "User_DanhMucSite"."IDDanhMucSite","TenGoi","TenGoi_KoDau","Icon","DuongDan","IDUser" 
                FROM public."DanhMucSite" , public."User_DanhMucSite" 
                WHERE "DanhMucSite"."IDDanhMucSite" = "User_DanhMucSite"."IDDanhMucSite" and "IDUser"= ${option}    ) AS BANG2
ON (BANG1."IDDanhMucSite" = BANG2."IDDanhMucSite")

WHERE
        (           BANG1."IDDanhMucSite",
                    BANG1."TenGoi",BANG1."TenGoi_KoDau",BANG1."Icon",BANG1."DuongDan") is not null
ORDER BY BANG1."IDDanhMucSite" ASC
                    `
        console.log(`Excute: ${query}`);
        return this._pgPool.query(query)
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
    }

    public getName(option,IDUser) {
        let queryText = `
        SELECT  BANG1."IDDanhMucSite" = BANG2."IDDanhMucSite" IS NULL = FALSE AS giatri, BANG1."IDDanhMucSite",
            BANG1."TenGoi",BANG1."TenGoi_KoDau",BANG1."Icon",BANG1."DuongDan"
FROM 
        (       SELECT "IDDanhMucSite","TenGoi","TenGoi_KoDau","Icon","DuongDan"
                FROM public."DanhMucSite" 
                ORDER BY "IDDanhMucSite" ASC) AS BANG1
FULL OUTER JOIN 
        (       SELECT "User_DanhMucSite"."IDDanhMucSite","TenGoi","TenGoi_KoDau","Icon","DuongDan","IDUser" = ${IDUser}
                FROM public."DanhMucSite" , public."User_DanhMucSite" 
                WHERE "DanhMucSite"."IDDanhMucSite" = "User_DanhMucSite"."IDDanhMucSite" and "IDUser"= ${IDUser}    ) AS BANG2
ON (BANG1."IDDanhMucSite" = BANG2."IDDanhMucSite")

WHERE
        (           BANG1."IDDanhMucSite",
                    BANG1."TenGoi",BANG1."TenGoi_KoDau",BANG1."Icon",BANG1."DuongDan") is not null and
                    lower(BANG1."TenGoi") like '%${option}%' or lower(BANG1."TenGoi_KoDau") like '%${option}%'
ORDER BY BANG1."IDDanhMucSite" ASC
`;

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText)
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
    }
}