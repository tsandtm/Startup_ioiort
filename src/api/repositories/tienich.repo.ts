import { RepoBase } from './repositories.base';
import { TienIch } from '../models/tienich.model'
import { Pool, QueryResult } from 'pg';

export class TienIchRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<TienIch[]> {
        let queryText = 'SELECT * FROM public."ioh_TienIch" ORDER BY "TienIchID" ASC ';
        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText, [option.id, option.name])
        } else {
            pResult = this._pgPool.query(queryText)
        }


        return pResult.then(result => {
            let tienichs: TienIch[] = result.rows.map(r => {
                let tienich = new TienIch();
               // tienich.id = r.id;
                tienich.id = r.TienIchID;
                tienich.KyHieu = r.KyHieu;
                tienich.TenGoi = r.TenGoi;
                tienich.BieuTuong = r.BieuTuong;
                return tienich;
            });
            return tienichs;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }

    public add(tienich: TienIch): Promise<TienIch>{
        let queryText = 'INSERT INTO public."ioh_TienIch" VALUES ($1,$2,$3,$4)';

        return this._pgPool.query(queryText,[tienich.TienIchID,tienich.KyHieu,tienich.TenGoi,tienich.BieuTuong])
            .then(result => tienich)
            .catch(error => Promise.reject(error));
    }

    
    public xoa(id: number): Promise<TienIch> {
        let queryText = 'DELETE FROM public."ioh_TienIch" WHERE "TienIchID"=$1';
        
        return this._pgPool.query(queryText, [id])
            .then(result => {
                let tienich = new TienIch();
                tienich.id = id;
                    
                return tienich;
            }).catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            })
    }

    public suaTienIch(tienich: TienIch){
        let queryText = `UPDATE public."ioh_TienIch"
	                SET "KyHieu"=$2, "TenGoi"=$3, "BieuTuong"=$4
	                WHERE "TienIchID"=$1`;
        return this._pgPool.query(queryText,[tienich.id,tienich.KyHieu,tienich.TenGoi,tienich.BieuTuong])
                .then(result => tienich)
                .catch(err => {
                    console.error('Error: ', err);
                    return null;
                })

    }
}