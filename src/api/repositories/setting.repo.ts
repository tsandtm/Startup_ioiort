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

        if (option.IDUser != undefined) {
            pResult = this._pgPool.query(queryText + ' where "iduser" = ' + option.IDUser)
            console.info('Excute: ' + queryText + ' where "iduser" = ' + option.IDUser);
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
        let queryText = 'INSERT INTO "api" values($1,$2,$3)';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [option.servername,
        option.apikey,
        option.trangthai,
        ])
            .then(result => {
                return null;
            });
    }
    public Edit(option): Promise<Setting> {
        let queryText = 'UPDATE "api" SET apikey = "$1", trangthai = "$2"  WHERE servername = "$3"';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [
        option.apikey,
        option.trangthai,
        option.servername,
        ])
            .then(result => {
                return null;
            });
    }
    public Delete(option): Promise<Setting> {
        let queryText = 'DELETE FROM api WHERE servername = $1';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.servername])
            .then(result => {
                return null;
            });
    }
}