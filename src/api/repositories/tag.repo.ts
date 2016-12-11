import { RepoBase } from './repositories.base';
import { Tag } from '../models/Tag.model';
import { Pool, QueryResult } from 'pg';

export class TagRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(AccountID: string): Promise<Tag[]> {
        let queryText = `select * from test."n_Tag" where "AccountID"= '${AccountID}'`;
        let pResult;

        pResult = this._pgPool.query(queryText)

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

    public getListA(option): Promise<Tag[]> {
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

    public CreateTag(option: Tag): Promise<Tag[]> {
        let queryText = 'INSERT INTO test."n_Tag" ("TagNameDisplay", "AccountID", "IsDefault") VALUES ($1,$2,$3)';
        let pResult;

        pResult = this._pgPool.query(queryText, [option.TagNameDisplay, option.AccountID, option.IsDefault]);

        return pResult
            .then(result => {
                return option;
            });
    }

}