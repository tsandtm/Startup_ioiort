import { RepoBase } from './repositories.base';
import { Setting } from '../models/setting.model';

export class SettingRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<Setting[]> {
        let queryText = 'select * from test."n_App" ORDER BY "AppID" ASC ';

        console.info('Excute: ' + queryText);
        let pResult = this._pgPool.query(queryText);
        
        return pResult.then(result => {
            let sets: Setting[] = result.rows.map(r => {
                let set = new Setting();
                set.AppID = r.AppID;
                set.APIKey = r.APIKey;
                set.AppName = r.AppName;
                set.NgayTao = new Date(r.NgayTao).toLocaleDateString().replace(/T.*/,'').split('-').reverse().join('/');
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

    public getListPT(option): Promise<Setting[]> {
        let queryText;
        let pResult;
        if(option.id==undefined||option.id=='null'||option.id==null||option.id=='undefined')
        {
            queryText = 'select * from test."n_App" ORDER BY "AppID"ASC limit 15 offset $1';
            pResult = this._pgPool.query(queryText,[option.so]);
        }
        else
        {
            queryText = 'select * from test."n_App" where "AppName" like $1 ORDER BY "AppID"ASC limit 15 offset $2';
            pResult = this._pgPool.query(queryText,['%'+option.id+'%',option.so]);
        }

        console.info('Excute0: ' + queryText+''+option.so+' '+option.id);
         
        
        return pResult.then(result => {
            let sets: Setting[] = result.rows.map(r => {
                let set = new Setting();
                set.AppID = r.AppID;
                set.APIKey = r.APIKey;
                set.AppName = r.AppName;
                set.NgayTao = new Date(r.NgayTao).toLocaleDateString().replace(/T.*/,'').split('-').reverse().join('/');
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
    public getAppName(option): Promise<Setting> {
        let queryText;
        let pResult;
        
        if(option.id==undefined||option.id==null||option.id=='null')
        {
            queryText = 'select * from test."n_App" where "AppName" = $1';
            pResult = this._pgPool.query(queryText,[option.so]);
            console.info('Excute2: ' + queryText+''+option.so+option.id);
        }
        else
        {
            queryText = 'select * from test."n_App" where "AppName" = $1 and "AppID"<>$2';
            pResult = this._pgPool.query(queryText,[option.so,option.id]);
            console.info('Excute2: ' + queryText+''+option.so+option.id);
        }
        return pResult
            .then(result => {
                let set = new Setting();
                set.AppID =  result.rows[0].AppID;
                set.APIKey =  result.rows[0].APIKey;
                set.AppName =  result.rows[0].AppName;
                set.NgayTao = new Date(result.rows[0].NgayTao).toLocaleDateString().replace(/T.*/,'').split('-').reverse().join('/');
                set.IsActive =  result.rows[0].IsActive;
                return set;
            })        
            .catch(err => {
                console.error(err.message);
                return null;
        });
    }
    public getAPI(option): Promise<Setting> {
        let queryText;
        let pResult;

        if(option.id==undefined||option.id==null||option.id=='null')
        {
            queryText = 'select * from test."n_App" where "APIKey" = $1';
                console.info('Excute1: ' + queryText+''+option.so);
            pResult = this._pgPool.query(queryText,[option.so]);
        }
        else
        {
            queryText = 'select * from test."n_App" where "APIKey" = $1 and "AppID"<>$2';
            console.info('Excute1: ' + queryText+''+option.so+option.id);
            pResult = this._pgPool.query(queryText,[option.so,option.id,]);
        }
        return pResult
            .then(result => {
                let set = new Setting();
                set.AppID =  result.rows[0].AppID;
                set.APIKey =  result.rows[0].APIKey;
                set.AppName =  result.rows[0].AppName;
                set.NgayTao = new Date(result.rows[0].NgayTao).toLocaleDateString().replace(/T.*/,'').split('-').reverse().join('/');
                set.IsActive =  result.rows[0].IsActive;
                return set;
            })        
            .catch(err => {
                console.error(err.message);
                return null;
        });
    }
    public getcount(option): Promise<number> {
        let queryText;
        let pResult;
        if(option==undefined||option=='null'||option==null)
        {
            queryText = 'SELECT count(*) as abc from test."n_App"';    
            pResult = this._pgPool.query(queryText);
        }
        else
        {
            queryText = 'SELECT count(*) as abc from test."n_App" where "AppName" like $1 ';   
            pResult = this._pgPool.query(queryText,['%'+option+'%']);
            
        }
        console.info('Excute: ' + queryText);
        return pResult
            .then(result => {
                console.log(result.rows[0].abc);
                return result.rows[0].abc;
            });

    }
    public getAppID(): Promise<number> {
        let queryText = 'SELECT "AppID" as abc from test."n_App" order by "AppID" desc limit 1';    
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText)
            .then(result => {
                console.log(result.rows[0].abc+1);
                return result.rows[0].abc+1;
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
        let queryText = 'UPDATE test."n_App" SET "APIKey" = $1, "AppName" = $2 , "NgayTao" =$3 , "IsActive" = $4 where "AppID" = $5';

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
        let queryText = 'DELETE from test."n_App" where "AppID" = $1';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.AppID])
            .then(result => {
                return null;
            });
    }
}