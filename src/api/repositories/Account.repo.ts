import { RepoBase } from './repositories.base';
import { Account } from '../models/Account.model'
import { Pool, QueryResult } from 'pg';

export class AccountRepo extends RepoBase {
    constructor() {
        super();
    }

    public FindOne = (option: Account) => {
        let text = 'select "AccountID" from test."AccountID" where "UserName" = $1 and "PassHash" = $2'
        return this._pgPool.query(text, [option.UserName, option.PassHash])
            .then(result => {
                if(result.rowCount != 0){
                    return result.rows[0].AccountID;
                }
                else{
                    return 0;
                }
            })
            .catch((err) => {
                return Promise.reject(err);
            })
    }
}