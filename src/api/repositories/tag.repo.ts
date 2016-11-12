import { RepoBase } from './repositories.base';
import { Tag } from '../models/tag.model';

export class TagRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<Tag[]> {
        let queryText = 'select * from "n_tag" ';

        console.info('Excute: ' + queryText);
        let pResult;
        if (option.tagid != undefined) {
            pResult = this._pgPool.query(queryText + ' where "tagid" = ' + option.tagid)
            console.info(queryText + ' where "tagid" = ' + option.tagid);
        } else {
            pResult = this._pgPool.query(queryText)
        }
        
        return pResult.then(result => {
            let tags: Tag[] = result.rows.map(r => {
                let tag = new Tag();
                tag.tagid = r.tagid;
                console.log(r.appid+r.tagnamedisplay+r.tagnamekey+r.accountid+r.isdefault);
                tag.tagnamedisplay = r.tagnamedisplay;
                tag.tagnamekey = r.tagnamekey;
                tag.accountid = r.accountid;
                tag.isdefault = r.isdefault;
                return tag;
            });
            return tags;
        })
            .catch(err => {
                console.error(err.message);
                return null;
        });
    }
    public Create(option): Promise<Tag> {
        let queryText = 'INSERT INTO "n_tag" values($1,$2,$3,$4,$5)';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [option.tagid,
        option.tagnamedisplay,
        option.tagnamekey,
        option.accountid,
        option.isdefault,
        ])
            .then(result => {
                return null;
            });
    }
    public Edit(option): Promise<Tag> {
        let queryText = 'UPDATE "n_tag" SET tagnamedisplay = $1, tagnamekey = $2 , accountid = $3 , isdefault = $4 WHERE tagid = $5';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [
        option.tagnamedisplay,
        option.tagnamekey,
        option.accountid,
        option.isdefault,
        option.tagid,
        ])
            .then(result => {
                return null;
            });
    }
    public Delete(option): Promise<Tag> {
        let queryText = 'DELETE FROM n_tag WHERE tagid = $1';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.tagid])
            .then(result => {
                return null;
            });
    }
}