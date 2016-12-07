import { RepoBase } from './repositories.base';
import { TinTuc } from '../models/tintuc.model';
import { Pool, QueryResult } from 'pg';

export class TinTucRepo extends RepoBase {

    constructor() {
        super();
    }
    public getList(option, limit, offset): Promise<TinTuc[]> {

        console.log("id " + option);
        let queryText = `SELECT "IDTinTuc","TieuDe","MoTa","ThoiGianDangTin","URLNews","URLThumbImage" FROM public."TinTuc",public."User_DanhMucSite" 
        WHERE ${option} = Any ("ArrayDaXoa"::bigint[]) is null
         AND "TinTuc"."IDDanhMucSite"="User_DanhMucSite"."IDDanhMucSite"  
         AND "IDUser"=${option} 
         AND ${option} = Any ("ArrayDaXem"::bigint[]) is null
         ORDER BY "ThoiGianDangTin" 
         DESC LIMIT ${limit} OFFSET ${offset}`;

        console.info('Excute: ' + queryText);
        let pResult;
        pResult = this._pgPool.query(queryText)
        return pResult.then(result => {
            let TinTucs: TinTuc[] = result.rows.map(r => {
                let tintuc = new TinTuc();
                tintuc.id = r.IDTinTuc;
                tintuc.IDDanhMucSite = r.IDDanhMucSite;
                tintuc.TieuDe = r.TieuDe;
                tintuc.MoTa = r.MoTa;
                tintuc.NoiDung = r.NoiDung;
                tintuc.ThoiGianDangTin = r.ThoiGianDangTin;
                tintuc.URLNews = r.URLNews;
                tintuc.URLThumbImage = r.URLThumbImage;
                tintuc.URLImage = r.URLImage;
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

    public TinNoiBat(option, limit, offset): Promise<TinTuc[]> {
        let queryText = `SELECT "IDTinTuc","TieuDe","MoTa","ThoiGianDangTin","URLNews","URLThumbImage" , "ArrayDaXem"
        FROM public."TinTuc",public."User_DanhMucSite" 
        WHERE ${option} = Any ("ArrayDaXoa"::bigint[]) is null
        AND "TinTuc"."IDDanhMucSite"="User_DanhMucSite"."IDDanhMucSite" 
        and "IDUser"=${option}
        ORDER BY cardinality("ArrayDaXem") DESC NULLS LAST LIMIT ${limit} OFFSET ${offset}`;

        console.info('Excute: ' + queryText);
        let pResult;
        pResult = this._pgPool.query(queryText)
        return pResult.then(result => {
            let TinTucs: TinTuc[] = result.rows.map(r => {
                let tintuc = new TinTuc();
                tintuc.id = r.IDTinTuc;
                tintuc.IDDanhMucSite = r.IDDanhMucSite;
                tintuc.TieuDe = r.TieuDe;
                tintuc.MoTa = r.MoTa;
                tintuc.NoiDung = r.NoiDung;
                tintuc.ThoiGianDangTin = r.ThoiGianDangTin;
                tintuc.URLNews = r.URLNews;
                tintuc.URLThumbImage = r.URLThumbImage;
                tintuc.URLImage = r.URLImage;
                tintuc.ArrayDaXem = r.ArrayDaXem;
                tintuc.ArrayDaXoa = r.ArrayDaXoa;
                tintuc.ArrayQuanTam = r.ArrayQuanTam;
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

    public lktindaxoa(option, limit, offset): Promise<TinTuc[]> {
        // 2 = Any ("ArrayDaXoa"::bigint[]) so sanh trong mảng có IDUser là 2 hay ko, có trả về true ko thì false
        let queryText = `SELECT "IDTinTuc","TieuDe","MoTa","ThoiGianDangTin","URLNews","URLThumbImage", ${option} = Any ("ArrayDaXoa"::bigint[])
        FROM public."TinTuc"
        WHERE "ArrayDaXoa" is not null and  ${option} = Any ("ArrayDaXoa"::bigint[]) is true
        ORDER BY "IDTinTuc" LIMIT ${limit} OFFSET ${offset}`;

        console.info('Excute: ' + queryText);
        let pResult;
        pResult = this._pgPool.query(queryText)
        return pResult.then(result => {
            let TinTucs: TinTuc[] = result.rows.map(r => {
                let tintuc = new TinTuc();
                tintuc.id = r.IDTinTuc;
                tintuc.IDDanhMucSite = r.IDDanhMucSite;
                tintuc.TieuDe = r.TieuDe;
                tintuc.MoTa = r.MoTa;
                tintuc.NoiDung = r.NoiDung;
                tintuc.ThoiGianDangTin = r.ThoiGianDangTin;
                tintuc.URLNews = r.URLNews;
                tintuc.URLThumbImage = r.URLThumbImage;
                tintuc.URLImage = r.URLImage;
                return tintuc;
            });
            return TinTucs;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
    public boxoa(id, IDUser): Promise<TinTuc> {
        console.log('id: ' + id);
        console.log('id user: ' + IDUser);
        let queryText = `UPDATE public."TinTuc"
        Set "ArrayDaXoa" = array_remove("ArrayDaXoa", ${IDUser}::bigint)
        WHERE "IDTinTuc"= ${id}`;
        return this._pgPool.query(queryText)
            .then(result => {
                return id;
            })
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
    }
    public xoatin(id, IDUser): Promise<TinTuc> {
        console.log('id: ' + id);
        console.log('id user: ' + IDUser);
        let queryText = `UPDATE public."TinTuc" Set "ArrayDaXoa"= "ArrayDaXoa" || ARRAY[${IDUser}]::BIGINT[]
        WHERE "IDTinTuc"=${id}`;

        return this._pgPool.query(queryText)
            .then(result => {
                return id;
            })
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
    }

    public getOne(option): Promise<TinTuc> {
        let queryText = 'SELECT * FROM public."TinTuc" WHERE IDTinTuc=$1';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [option.id, option.name])
            .then(result => {
                let tintuc = new TinTuc();
                tintuc.id = result.rows[0].IDTinTuc;
                tintuc.IDDanhMucSite = result.rows[0].IDDanhMucSite;
                tintuc.TieuDe = result.rows[0].TieuDe;
                tintuc.MoTa = result.rows[0].MoTa;
                tintuc.NoiDung = result.rows[0].Mota;
                tintuc.URLNews = result.rows[0].URLNews;
                tintuc.URLThumbImage = result.rows[0].URLThumbImage;
                tintuc.URLImage = result.rows[0].URLImage;
                tintuc.ThoiGianDangTin = result.rows[0].ThoiGianDangTin;
                return tintuc;
            });
    }
    public update(id, IDUser): Promise<TinTuc> {
        console.log('id: ' + id);
        console.log('id user: ' + IDUser);
        let queryText = `UPDATE public."TinTuc" Set "ArrayQuanTam"= "ArrayQuanTam" || ARRAY[${IDUser}]::BIGINT[] 
        WHERE "IDTinTuc"=${id}`;
        return this._pgPool.query(queryText)
            .then(result => {
                return id;
            })
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
    }


    public delele(id, IDUser): Promise<TinTuc> {
        console.log('id: ' + id);
        console.log('id user: ' + IDUser);
        let queryText = `UPDATE public."TinTuc"
        Set "ArrayQuanTam" = array_remove("ArrayQuanTam", ${IDUser}::bigint)
        WHERE "IDTinTuc"= ${id}`;
        return this._pgPool.query(queryText)
            .then(result => {
                return id;
            })
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
    }

    public quantam(option, limit, offset): Promise<TinTuc[]> {
        let queryText = "";
        (!option.idtintuc) ?
            queryText = `SELECT "IDTinTuc","TieuDe","MoTa","ThoiGianDangTin","URLNews","URLThumbImage",
        ${option.id} = Any ("ArrayQuanTam"::bigint[])
        FROM public."TinTuc"
        WHERE "ArrayQuanTam" is not null 
        AND ${option.id} = Any ("ArrayQuanTam"::bigint[]) is true
        ORDER BY "ThoiGianDangTin" LIMIT ${limit} OFFSET ${offset}`

            :

            queryText = `SELECT "IDTinTuc"
             FROM public."TinTuc" 
        WHERE "ArrayQuanTam" is not null AND "IDTinTuc" = ${option.idtintuc} 
        AND ${option.id} = Any ("ArrayQuanTam"::bigint[]) is true
        ORDER BY "ThoiGianDangTin" LIMIT ${limit} OFFSET ${offset}`

        console.info('Excute: ' + queryText);
        let pResult;
        pResult = this._pgPool.query(queryText)
        return pResult.then(result => {
            let TinTucs: TinTuc[] = result.rows.map(r => {
                let tintuc = new TinTuc();
                tintuc.id = r.IDTinTuc;
                tintuc.TieuDe = r.TieuDe;
                tintuc.MoTa = r.MoTa;
                tintuc.ThoiGianDangTin = r.ThoiGianDangTin;
                tintuc.URLNews = r.URLNews;
                tintuc.URLThumbImage = r.URLThumbImage;
                return tintuc;
            });
            return TinTucs;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
    public chuadoc(option): Promise<TinTuc[]> {
        let queryText = `SELECT * FROM public."TinTuc"  WHERE "ArrayDaXem" is null ORDER BY "IDTinTuc"`;

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
                tintuc.MoTa = r.MoTa;
                tintuc.NoiDung = r.NoiDung;
                tintuc.ThoiGianDangTin = r.ThoiGianDangTin;
                tintuc.URLNews = r.URLNews;
                tintuc.URLThumbImage = r.URLThumbImage;
                tintuc.URLImage = r.URLImage;
                return tintuc;
            });
            return TinTucs;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }

    public daxem(id, IDUser): Promise<TinTuc> {
        console.log('id: ' + id);
        console.log('id user: ' + IDUser);
        let queryText = `UPDATE public."TinTuc" Set "ArrayDaXem"= "ArrayDaXem" || ARRAY[${IDUser}]::BIGINT[]
        WHERE "IDTinTuc"=${id}`;
        return this._pgPool.query(queryText)
            .then(result => {
                return id;
            })
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
    }

}