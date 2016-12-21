import { RepoBase } from './repositories.base';
import { User_Web } from '../models/user_website.model'
import { Pool, QueryResult } from 'pg';

export class UserWebRepo extends RepoBase {

    private user_web: User_Web;
    constructor() {
        super();
    }
    /**
     * Thêm danh muc site cho user
     */
    public Create(option): Promise<User_Web> {
        console.log(JSON.stringify(option))
        let queryText = 'INSERT INTO public."User_DanhMucSite" ("IDUser", "IDDanhMucSite", "CreatedDate") VALUES ($1, $2, $3)';

        console.info('Excute: ' + queryText);
        return this._query(queryText, [option.IDUser, option.IDDanhMucSite, option.CreatedDate])
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

    /**
     * Xoa user trong danh muc site
     */
    public Delete(option): Promise<any> {
        // console.log(JSON.stringify(option))
        let queryText = 'DELETE FROM public."User_DanhMucSite" WHERE "IDUser" = $1 and "IDDanhMucSite" = $2;';

        console.info('Excute: ' + queryText);
        return this._query(queryText, [option.idUser, option.idDanhMuc])
            .then((result) => {
                console.log(JSON.stringify(result))
                return Promise.resolve()
            })
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            })
    }

    public Get(option): Promise<any> {
        // console.log(JSON.stringify(option))
        let queryText = 'SELECT "IDUser", "IDDanhMucSite", "CreatedDate" FROM public."User_DanhMucSite" WHERE "IDUser" = $1 ';

        console.info('Excute: ' + queryText);
        return this._query(queryText, [option.idUser])
            .then(result => {
                if (result.rowCount > 0)
                    return result.rowCount;
                else
                    return -1;
            })
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            })
    }


}