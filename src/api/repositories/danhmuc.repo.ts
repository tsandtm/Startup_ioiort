import { RepoBase } from './repositories.base';
import { DanhMuc } from '../models/danhmuc.model';
import { Pool, QueryResult } from 'pg';

export class DanhMucRePo extends RepoBase {

    constructor() {
        super();
    }
    public getList(option): Promise<DanhMuc[]> {
        let queryText = 'SELECT * FROM public."DanhMucSite" ORDER BY "IDDanhMucSite" ASC';

        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText, [option.id, option.name])
        } else {
            pResult = this._pgPool.query(queryText)
        }
           return pResult.then(result => {
            let DanhMucs: DanhMuc[] = result.rows.map(r => {
                console.log(r);
                let d = new DanhMuc();
                d.id = r.IDDanhMucSite;
                d.DuongDan=r.DuongDan;
                d.MoTa=r.MoTa;
                d.TenGoi=r.TenGoi;
                d.SoLuongTinDuyetTim=r.SoLuongTinduyetTim;
                d.TemplateCrawlTieuDe=r.TempateCrawlTieuDe;
                d.TempateCrawlMoTa=r.TempateCrawlMoTa;
                d.TempateCrawlNoiDung=r.TempateCrawlNoiDung;
                d.TempateCrawlImage=r.TempateCrawlImage;
                d.LinkRSS=r.LinkRSS;
                return d;
            });
            return DanhMucs;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
    public getOne(option): Promise<DanhMuc> {
        let queryText = 'SELECT * FROM public."DanhMucSite" WHERE IDDanhMucSite=$1';

        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.id, option.name])
            .then(result => {
                let tintuc = new DanhMuc();
                tintuc.id = result.rows[0].IDDanhMucSite;
                tintuc.DuongDan = result.rows[0].DuongDan;
                tintuc.TenGoi=result.rows[0].TenGoi;
                tintuc.MoTa=result.rows[0].MoTa;
                tintuc.SoLuongTinDuyetTim=result.rows[0].SoLuongTinduyetTim;
                tintuc.TemplateCrawlTieuDe=result.rows[0].TempateCrawlTieuDe;
                tintuc.TempateCrawlMoTa=result.rows[0].TempateCrawlMoTa;
                tintuc.TempateCrawlNoiDung=result.rows[0].TempateCrawlNoiDung;
                tintuc.TempateCrawlImage=result.rows[0].TempateCrawlImage;
                tintuc.LinkRSS=result.rows[0].LinkRSS;
                return tintuc;
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



    // public delete(id: number): Promise<TinTuc>{
    //     let queryText = 'DELETE FROM public."TinTuc" WHERE "IDTinTuc"=$1';

    //     return this._pgPool.query(queryText,[id])
    //             .then(result => {
    //                 let tin = new TinTuc();
    //                 tin.id = id;
    //                 console.log(result.rows[0]);
    //                 return tin;
    //             }).catch(error => {
    //                 console.error('Error: ',error);
    //                 return Promise.reject(error);
    //             })
    // }
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
