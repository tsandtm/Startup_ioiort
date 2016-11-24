import { RepoBase } from './repositories.base';
import { LoaiTinDang } from '../models/loaitindang.model'
import { Pool, QueryResult } from 'pg';

export class LoaiTinDangRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<LoaiTinDang[]> {
        let queryText = 'SELECT * FROM public."ioh_LoaiTinDang" ORDER BY "LoaiTinDangID" ASC ';
        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText, [option.id, option.name])
        } else {
            pResult = this._pgPool.query(queryText)
        }


        return pResult.then(result => {
            let loaitindangs: LoaiTinDang[] = result.rows.map(r => {
                let loaitindang = new LoaiTinDang();
               // tienich.id = r.id;
                loaitindang.id = r.LoaiTinDangID;
                loaitindang.KyHieu = r.KyHieu;
                loaitindang.TenGoi = r.TenGoi;
                loaitindang.BieuTuong = r.BieuTuong;
                return loaitindang;
            });
            return loaitindangs;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }

    public add(loaitindang: LoaiTinDang): Promise<LoaiTinDang>{
        let queryText = 'INSERT INTO "ioh_LoaiTinDang" VALUES ($1,$2,$3,$4)';

        return this._pgPool.query(queryText,[loaitindang.LoaiTinDangID,loaitindang.KyHieu,loaitindang.TenGoi,loaitindang.BieuTuong])
            .then(result => loaitindang)
            .catch(error => Promise.reject(error));
    }

    public suaLoaiTinDang(loaitindang: LoaiTinDang){
        let queryText = `UPDATE public."ioh_LoaiTinDang"
	                SET "KyHieu"=$2, "TenGoi"=$3, "BieuTuong"=$4
	                WHERE "LoaiTinDangID"=$1`;
        return this._pgPool.query(queryText,[loaitindang.id,loaitindang.KyHieu,loaitindang.TenGoi,loaitindang.BieuTuong])
                .then(result => loaitindang)
                .catch(err => {
                    console.error('Error: ', err);
                    return null;
                })

    }


    public xoaLoaiTinDang(id: number): Promise<LoaiTinDang> {
        let queryText = 'DELETE FROM public."ioh_LoaiTinDang" WHERE "LoaiTinDangID"=$1';

        return this._pgPool.query(queryText, [id])
            .then(result => {
                let loaitindang = new LoaiTinDang();
                loaitindang.id = id;
                    
                return loaitindang;
            }).catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            })
    }

}