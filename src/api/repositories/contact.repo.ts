import { RepoBase } from './repositories.base';

import { Pool, QueryResult } from 'pg';
import { contact } from '../models/contact.model';

export class ContactRepo extends RepoBase {

    constructor() {
        super();
    }

    public count(option): Promise<number> {
        let queryText = 'SELECT * FROM public."User" WHERE "TaiKhoan" = $1 AND "Password" = $2;';

        console.info('Excute: ' + queryText + `${option.TaiKhoan}${option.Password}`);

        return this._pgPool.query(queryText, [option.TaiKhoan, option.Password])
            .then(result => {
                if (result.rowCount == 1)
                    return result.rows[0].IDUser;
                else
                    return -1;
            })
            .catch(err => { })
    }
    //login facebook
    // kiem tra user facebook
    public GetUserFacebook(facebook): Promise<any> {
        let queryText = 'select "IDUser" from public."User" where "Facebook"=$1';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [facebook])
            .then(res => {
                if (res.rowCount > 0) {
                    return res.rows[0].IDUser;
                }
                else {
                    return 0;
                }
            }).catch(err => { return 0 });
    }
    //them tai khoan moi
    public InsertUserFacebook(user: contact): Promise<any> {
        let queryText = 'INSERT INTO public."User"("TaiKhoan","Facebook","Email", "Password","Token", "NgayTao","HoTen") VALUES ($1,$2,$3,$4,$5,current_timestamp,$6);';
        return this._pgPool.query(queryText, [user.Facebook, user.Facebook, user.Email, user.Facebook, user.Token, user.HoTen])
            .then(res => {
                return res;
            }).catch(err => {
                return err;
            });
    }
    //login facebook
}