import { RepoBase } from './repositories.base';
import { Tag } from '../models/tag.model'
import { Pool, QueryResult } from 'pg';

export class TagRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<Tag[]> {
        let queryText = 'SELECT * FROM test."n_Tag"';
        console.info('Excute: ' + queryText);
        let pResult;

        if (option.TagID != undefined) {
            pResult = this._pgPool.query(queryText + 'where "TagID" = ' + option.TagID)
        } else {
            pResult = this._pgPool.query(queryText)
        }


        return pResult.then(result => {
            let Tags: Tag[] = result.rows.map(r => {
                let tag = new Tag();
                tag.TagID = r.TagID;
                tag.TagNameDisplay = r.TagNameDisplay;
                tag.TagNameKey = r.TagNameKey;
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

    // public count(option): Promise<number> {
    //     let queryText = 'select count(*) as abc from test.books';

    //     console.info('Excute: ' + queryText);

    //     return this._pgPool.query(queryText)
    //         .then(result => {
    //             return result.rows[0].abc
    //         })
    // }
}