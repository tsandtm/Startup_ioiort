import { RepoBase } from './repositories.base';
import { Contacts } from '../models/contacts.model'
import { Pool, QueryResult } from 'pg';

export class ContactsRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<Contacts[]> {
        let queryText = 'select * from test.books';

        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText, [option.id, option.name])
        } else {
            pResult = this._pgPool.query(queryText)
        }


        return pResult.then(result => {
            let books: Contacts[] = result.rows.map(r => {
                let book = new Contacts();
                book.id = r.id;
                book.name = r.name;
                return book;
            });
            return books;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }