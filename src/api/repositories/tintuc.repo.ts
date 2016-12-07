import { RepoBase } from './repositories.base';
import { TinTuc } from '../models/tintuc.model';
import { Pool, QueryResult } from 'pg';

export class TinTucRepo extends RepoBase {

    constructor() {
        super();
    }
    public getList(option, limit, offset): Promise<TinTuc[]> {
        console.log("id " + option);
        let queryText = `SELECT "IDTinTuc","TieuDe","MoTa","ThoiGianDangTin","URLNews","URLThumbImage" FROM public."TinTuc",public."User_DanhMucSite" WHERE "ArrayDaXoa" is null AND "TinTuc"."IDDanhMucSite"="User_DanhMucSite"."IDDanhMucSite"  AND "IDUser"=$1 ORDER BY "ThoiGianDangTin" DESC LIMIT $2OFFSET $3`;

        console.info('Excute: ' + queryText);
        let pResult;
        pResult = this._pgPool.query(queryText, [option, limit, offset])
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
        let queryText = `SELECT "IDTinTuc","TieuDe","MoTa","ThoiGianDangTin","URLNews","URLThumbImage" 
        FROM public."TinTuc",public."User_DanhMucSite" 
        WHERE "ArrayDaXoa" is null AND "TinTuc"."IDDanhMucSite"="User_DanhMucSite"."IDDanhMucSite" and "IDUser"=${option}
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
    // public update(option):Promise<TinTuc>{
    //     let queryText='UPDATE *FROM public."TinTuc" Set "ArrayDaXem"=$1 ,"ArrayDaXoa"=$2,"ArrayQuanTam"=$3 WHERE "IDTinTuc"=$4'
    //     console.log('Add api: ' + JSON.stringify(option))
    //     return this._pgPool.query(queryText,[option.id,option.name])

    // public phuchoi(option):Promise<TinTuc>{
    //      console.log('option: ' + option);
    //     let queryText = `UPDATE public."TinTuc" Set "ArrayDaXoa"= null`;
    //     return this._pgPool.query(queryText)
    //         .then(result => {
    //             return option;
    //         })
    //         .catch(error => {
    //             console.error('Error: ', error);
    //             return Promise.reject(error);
    //         });
    // }
    //
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
    //xai dc
    // public delete(id: number): Promise<TinTuc> {
    //     let queryText = 'DELETE FROM public."TinTuc" WHERE "IDTinTuc"=$1';

    //     return this._pgPool.query(queryText, [id])
    //         .then(result => {
    //             let tin = new TinTuc();
    //             tin.id = id;
    //             console.log(result.rows[0]);
    //             return tin;
    //         }).catch(error => {
    //             console.error('Error: ', error);
    //             return Promise.reject(error);
    //         })
    // }

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
        let queryText = `SELECT "IDTinTuc","TieuDe","MoTa","ThoiGianDangTin","URLNews","URLThumbImage", 
        ${option} = Any ("ArrayQuanTam"::bigint[]) 
        FROM public."TinTuc"  
        WHERE "ArrayQuanTam" is not null and ${option} = Any ("ArrayQuanTam"::bigint[]) is true 
        ORDER BY "ThoiGianDangTin" LIMIT ${limit} OFFSET ${offset}`;

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
    // public edit(id:number):Promise<TinTuc>{
    //     let queryText='UPDATE public."TinTuc" set '
    // }
    // public getDelete(option): Promise<TinTuc>{
    //     let queryText='DELETE FROM pu    blic."TinTuc" WHERE IDTinTuc=id';
    //     return this._pgPool.query(queryText)
    //     .then(result=>{})
    // }
    // public getDelete(option):Promise<TinTuc>{
    //     let queryText='SELECT * FROM public."TinTuc" WHERE IDTinTuc=id';
}