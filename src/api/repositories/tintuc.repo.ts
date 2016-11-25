import { RepoBase } from './repositories.base';
import { TinTuc } from '../models/tintuc.model';
import { Pool, QueryResult } from 'pg';

export class TinTucRepo extends RepoBase {

    constructor() {
        super();
    }
    public getList(option, limit, offset): Promise<TinTuc[]> {
        let queryText = `SELECT * FROM public."TinTuc" ORDER BY "IDTinTuc" ASC LIMIT ${limit} OFFSET ${offset}`;

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
    // public update(option):Promise<TinTuc>{
    //     let queryText='UPDATE *FROM public."TinTuc" Set "ArrayDaXem"=$1 ,"ArrayDaXoa"=$2,"ArrayQuanTam"=$3 WHERE "IDTinTuc"=$4'
    //     console.log('Add api: ' + JSON.stringify(option))
    //     return this._pgPool.query(queryText,[option.id,option.name])

    //     )
    // }
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
    public update(option): Promise<TinTuc> {
        console.log('option: ' + option);
        let queryText = `UPDATE public."TinTuc" Set "ArrayQuanTam"= "ArrayQuanTam" || ARRAY[1]::BIGINT[],"ArrayDaXem"="ArrayDaXem" || ARRAY[1]::BIGINT[],"ArrayDaXoa"="ArrayDaXoa" || ARRAY[1]::BIGINT[] WHERE "IDTinTuc"=${option.id}`;
        return this._pgPool.query(queryText)
            .then(result => {
                return option;
            })
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
    }
    // create(TinTuc){
    // var IDTinTuc=TinTuc.id;
    // var IDDanhMucSite=TinTuc.IDDanhMucSite;
    // var TieuDe=TinTuc.TieuDe;
    // var MoTa=TinTuc.MoTa;
    // var NoiDung=TinTuc.NoiDung;
    // var URLThumbImage=TinTuc.URLThumbImage;
    // var URLNews=TinTuc.URLNews;
    // var URLImage=TinTuc.URLImage;
    //     public create(option):Promise<TinTuc>{
    //         let queryText='INSERT INTO public."TinTuc" ("IDTinTuc", "IDDanhMucSite", "TieuDe", "MoTa", "NoiDung", "URLNews", "URLThumbImage", "URLImage", "ThoiGianDangTin") VALUES (IDTinTuc=$1,IDDanhMucSite=$2, MoTa=$3, NoiDung=&4, ?, ?, ?, ?, ?);'
    //         return this._pgPool.query(queryText)
    //         .then(result=>{
    //             let tin=new TinTuc();
    //             tin.
    //         })
    // }

    //     public update(id:number):Promise<TinTuc>{
    //         let queryText='UPDATE public."TinTuc" Set "ArrayDaXem"=$1,"ArrayDaXoa"=$2,"ArrayQuanTam"=$3 WHERE "IDTinTuc"=$4' 
    //         return this._pgPool.query(queryText,[id])
    //                     .then(result=>{
    //                         let tin=new TinTuc();
    //                         tin.ArrayQuanTam=id;
    //                         console.log(result.rows[0]);
    //                         return tin;
    //                     })
    // }
    // public update(option:TinTuc):Promise<TinTuc>{
    //     let queryText;
    //     console.log(option.id);
    //     queryText='UPDATE public."TinTuc" Set "ArrayDaXem"=$1,"ArrayDaXoa"=$2,"ArrayQuanTam"=$3 WHERE "IDTinTuc"='
    // }
    public delete(id: number): Promise<TinTuc> {
        let queryText = 'DELETE FROM public."TinTuc" WHERE "IDTinTuc"=$1';

        return this._pgPool.query(queryText, [id])
            .then(result => {
                let tin = new TinTuc();
                tin.id = id;
                console.log(result.rows[0]);
                return tin;
            }).catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            })
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
