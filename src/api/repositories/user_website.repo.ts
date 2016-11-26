import { RepoBase } from './repositories.base';
import { User_Web } from '../models/user_website.model'
import { Pool, QueryResult } from 'pg';

export class UserWebRepo extends RepoBase {

    private user_web: User_Web;
    constructor() {
        super();
    }
    
    public Create(option): Promise<User_Web> {
        console.log(JSON.stringify(option))
        let queryText = 'INSERT INTO public."User_DanhMucSite" ("IDUser", "IDDanhMucSite", "CreatedDate") VALUES ($1, $2, $3)';

        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.IDUser,option.IDDanhMucSite,option.CreatedDate])
            .then(result => {
                let user_webs = new User_Web();
                user_webs.IDUser = option.IDUser;
                user_webs.IDDanhMucSite = option.IDDanhMucSite;
                user_webs.CreatedDate = option.CreatedDate;
                console.log('rows: ' + JSON.stringify(result.rows))
                return user_webs;
            })
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            })
    }

     public Delete(option): Promise<any> {
        // console.log(JSON.stringify(option))
        let queryText = 'DELETE FROM public."User_DanhMucSite" WHERE "IDUser" = $1 and "IDDanhMucSite" = $2;';

        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.idUser,option.idDanhMuc])
            .then((result)=>{
                console.log(JSON.stringify(result))
                return Promise.resolve()
            })
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            })
    }

    // public count(option): Promise<number> {
    //     let queryText = 'select count(*) as abc from news';

    //     console.info('Excute: ' + queryText);

    //     return this._pgPool.query(queryText)
    //         .then(result => {
    //             return result.rows[0].abc
    //         })
    // }

}