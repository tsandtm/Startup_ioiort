import { RepoBase } from './repositories.base';
import { Tag } from '../models/Tag.model';
import { Pool, QueryResult } from 'pg';

export class TagRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<Tag[]> {
        let queryText = 'select * from test."n_Tag" where lower("TagNameDisplay") like lower($1) ORDER BY "TagID" ASC LIMIT 10 OFFSET $2';
        let pResult;
        if(option.page == undefined){
            pResult = this._pgPool.query(queryText,['%'+option.id+'%',0])
        }
        else{
            pResult = this._pgPool.query(queryText,['%'+option.id+'%',option.page*10])
        }
        return pResult.then(result => {
            let Tags: Tag[] = result.rows.map(r => {
                let tag = new Tag();
                tag.TagID = r.TagID;
                tag.TagNameDisplay = r.TagNameDisplay;
                tag.AccountID = r.AccountID;
                tag.IsDefault = r.IsDefault;
                return tag;
            });
            return Tags;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }

}