import { RepoBase } from './repositories.base';
import { User } from '../models/user.model'
import { Pool, QueryResult } from 'pg';

export class UserRepo extends RepoBase {

    private _user: User;
    constructor() {
        super();
    }
    public CheckLogin(username,password): Promise<User> {
        let queryText ='select * from public."User" where "TaiKhoan"like $1 and "Password" like $2';
        console.info('Excute: ' + queryText);
        let pResult;
         pResult = this._pgPool.query(queryText,[username,password]);
         return pResult.then((result)=>{
             if(result.rows.length>0)
             {
                 return <User>result.rows[0];
             }
             return null;
         })
         .catch(err=>{return err});
    }
}