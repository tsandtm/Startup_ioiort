import { RepoBase } from './repositories.base';

import { Pool, QueryResult } from 'pg';
import { contact } from '../models/contact.model'

export class ContactRepo extends RepoBase {

    constructor() {
        super();
    }

    public count(option): Promise<any> {
        let queryText = 'SELECT * FROM public."User" WHERE "TaiKhoan" = $1 AND "Password" = $2;';

        console.info('Excute: ' + queryText +`${option.TaiKhoan}${option.Password}` );

        return this._pgPool.query(queryText, [option.TaiKhoan, option.Password])
            .then(result => {
                if (result.rowCount == 1)
                    return "OK";
                else
                    return "Faile";
            })
    }
}