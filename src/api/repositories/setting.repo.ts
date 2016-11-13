import { RepoBase } from './repositories.base';
import { Setting } from '../models/setting.model';

export class SettingRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<Setting[]> {
        let queryText = 'select * from "n_App"';

        console.info('Excute: ' + queryText);
        let pResult;   

        if (option.appid != undefined) {
            pResult = this._pgPool.query(queryText + ' where "AppID" = ' + option.appid)
        } else {
            pResult = this._pgPool.query(queryText)
        }
        
        return pResult.then(result => {
            let sets: Setting[] = result.rows.map(r => {
                let set = new Setting();
                set.appid = r.AppID;
                console.log(r.AppID);
                set.apikey = r.APIKey;
                set.appname = r.AppName;
                set.ngaytao = r.NgayTao;
                set.trangthai = r.IsActive;
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
        let queryText = 'select * from n_App where AppID = $1';
        console.info('Excute: ' + queryText + option.id);        
        return this._pgPool.query(queryText, [option.id])
            .then(result => {
                return null;
            });
    }
    public Create(option): Promise<Setting> {
        let queryText = 'INSERT INTO "n_App" values($1,$2,$3,$4,$5)';

        console.log('Excute: ' + option.isactive);

        return this._pgPool.query(queryText, [
        option.appid,
        option.apikey,
        option.appname,
        option.trangthai,
        option.ngaytao,                    
        ])
            .then(result => {
                return null;
            });
    }
    public Edit(option): Promise<Setting> {
        let queryText = 'UPDATE "n_App" SET "APIKey" = $1, "AppName" = $2 , "NgayTao" =$3 , "IsActive" = $4 where "AppID" = $5';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [
        option.apikey,
        option.appname,
        option.ngaytao,
        option.trangthai,
        option.appid,
        ])
            .then(result => {
                return null;
            });
    }
    public Delete(option): Promise<Setting> {
        let queryText = 'DELETE FROM "n_App" where "AppID" = $1';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.appid])
            .then(result => {
                return null;
            });
    }
}