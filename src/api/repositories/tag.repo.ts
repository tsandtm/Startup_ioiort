import { RepoBase } from './repositories.base';
import { Tag } from '../models/tag.model';

export class TagRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<Tag[]> {
        let queryText = 'select * from "n_Tag" ';

        console.info('Excute: ' + queryText);
        let pResult;
        if (option.tagid != undefined) {
            pResult = this._pgPool.query(queryText + ' where "TagID" = ' + option.tagid)
            console.info(queryText + ' where "tagid" = ' + option.tagid);
        } else {
            pResult = this._pgPool.query(queryText)
        }
        
        return pResult.then(result => {
            let tags: Tag[] = result.rows.map(r => {
                let tag = new Tag();
                tag.tagid = r.TagID;
                console.log(r.TagID+r.TagNameDisplay+r.TagNameKey+r.AccountID+r.IsDefault);
                tag.tagnamedisplay = r.TagNameDisplay;
                tag.tagnamekey = r.TagNameKey;
                tag.accountid = r.AccountID;
                tag.isdefault = r.IsDefault;
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
        let queryText = 'INSERT INTO "n_Tag" values($1,$2,$3,$4,$5)';

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
        let queryText = 'UPDATE "n_Tag" SET "TagNameDisplay" = $1, "TagNameKey" = $2 , "AccountID" = $3 , "IsDefault" = $4 WHERE "TagID" = $5';

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
        let queryText = 'DELETE FROM "n_Tag" WHERE "TagID" = $1';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.tagid])
            .then(result => {
                return null;
            });
    }
}