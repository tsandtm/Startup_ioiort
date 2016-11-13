import { RepoBase } from './repositories.base';
import { Setting } from '../models/setting.model';

export class SettingRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<Setting[]> {
        let queryText = 'select * from "n_app"';

        console.info('Excute: ' + queryText);
        let pResult;   

        if (option.appid != undefined) {
            pResult = this._pgPool.query(queryText + ' where "appid" = ' + option.appid)
        } else {
            pResult = this._pgPool.query(queryText)
        }
        
        return pResult.then(result => {
            let sets: Setting[] = result.rows.map(r => {
                let set = new Setting();
                set.appid = r.appid;
                console.log(r.appid);
                set.apikey = r.apikey;
                set.appname = r.appname;
                set.ngaytao = r.ngaytao;
                set.trangthai = r.isactive;
                return set;
            });
            return sets;
        })
            .catch(err => {
                console.error(err.message);
                return null;
        });
    }
    public Detail(option): Promise<Setting> {
        let queryText = 'select * from "n_app" where appid = $1';
        console.info('Excute: ' + queryText + option.id);        
        return this._pgPool.query(queryText, [option.id])
            .then(result => {
                return null;
            });
    }
    public Create(option): Promise<Setting> {
        let queryText = 'INSERT INTO "n_app" values($1,$2,$3,$4,$5)';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [
        option.appid,
        option.apikey,
        option.appname,
        option.isactive,
        option.ngaytao,                    
        ])
            .then(result => {
                return null;
            });
    }
    public Edit(option): Promise<Setting> {
        let queryText = 'UPDATE "n_app" SET apikey = $1, appname = $2 , ngaytao =$3 , isactive = $4 WHERE appid = $5';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [
        option.apikey,
        option.appname,
        option.ngaytao,
        option.isactive,
        option.appid,
        ])
            .then(result => {
                return null;
            });
    }
    public Delete(option): Promise<Setting> {
        let queryText = 'DELETE FROM n_app WHERE appid = $1';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.appid])
            .then(result => {
                return null;
            });
    }
}