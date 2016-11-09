import { RepoBase } from './repositories.base';
import { Contact } from '../models/Contact.model'
import { Pool, QueryResult } from 'pg';

export class ReportRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<Contact[]> {
        let queryText = 'select distinct "Device" from test."Contacts"';
        let pResult;

        if (option.Contact_Tag != undefined) {
            pResult = this._pgPool.query(queryText + 'where "Contact_Tag" = ' + "'{" + option.Contact_Tag + "}'")

            console.info(option.Contact_Tag)
        } else {
            pResult = this._pgPool.query(queryText)
        }


        return pResult.then(result => {
            let Contacts: Contact[] = result.rows.map(r => {
                let contact = new Contact();              
                contact.Device = r.Device;               
                return contact;
            });
            return Contacts;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }

   
}