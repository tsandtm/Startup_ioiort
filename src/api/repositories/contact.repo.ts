import { RepoBase } from './repositories.base';

import { Pool, QueryResult } from 'pg';
import { contact } from '../models/contact.model'

export class ContactRepo extends RepoBase {

    constructor() {
        super();
    }

    public count(option): Promise<number> {
        let queryText = 'SELECT * FROM public."User" WHERE "TaiKhoan" = $1 AND "Password" = $2;';

        console.info('Excute: ' + queryText +`${option.TaiKhoan}${option.Password}` );

        return this._pgPool.query(queryText, [option.TaiKhoan, option.Password])
            .then(result => {
                if (result.rowCount == 1)
                    return result.rows[0].IDUser;
                else
                    return -1;
            })
            .catch(err=>{})
    }
}