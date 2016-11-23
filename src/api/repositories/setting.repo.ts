import { RepoBase } from './repositories.base';
import { Setting } from '../models/setting.model';

export class SettingRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<Setting[]> {
        let queryText = 'select * from "n_App"';

        console.info('Excute: ' + queryText);
        let pResult = this._pgPool.query(queryText)
        
        return pResult.then(result => {
            let sets: Setting[] = result.rows.map(r => {
                let set = new Setting();
                set.AppID = r.AppID;
                console.log(r.AppID);
                set.APIKey = r.APIKey;
                set.AppName = r.AppName;
                set.NgayTao = r.NgayTao;
                set.IsActive = r.IsActive;
                return set;
            });
            return sets;
        })
            .catch(err => {
                console.error(err.message);
                return null;
        });
    }
    
    public Create(option): Promise<Setting> {
        let queryText = 'INSERT INTO "n_App" values($1,$2,$3,$4,$5)';

        console.log('Excute: ' + option.isactive);

        return this._pgPool.query(queryText, [
        option.AppID,
        option.APIKey,
        option.AppName,
        option.IsActive,
        option.NgayTao,                    
        ])
            .then(result => {
                return null;
            });
    }
    public Edit(option): Promise<Setting> {
        let queryText = 'UPDATE "n_App" SET "APIKey" = $1, "AppName" = $2 , "NgayTao" =$3 , "IsActive" = $4 where "AppID" = $5';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [
        option.APIKey,
        option.AppName,
        option.NgayTao,
        option.IsActive,
        option.AppID,
        ])
            .then(result => {
                return null;
            });
    }
    public Delete(option): Promise<Setting> {
        let queryText = 'DELETE FROM "n_App" where "AppID" = $1';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.AppID])
            .then(result => {
                return null;
            });
    }
}