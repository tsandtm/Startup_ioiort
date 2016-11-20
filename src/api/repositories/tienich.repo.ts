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
        let queryText = 'INSERT INTO "ioh_TienIch" VALUES ($1,$2,$3,$4)';

        return this._pgPool.query(queryText,[tienich.TienIchID,tienich.KyHieu,tienich.TenGoi,tienich.BieuTuong])
            .then(result => tienich)
            .catch(error => Promise.reject(error));
    }
}