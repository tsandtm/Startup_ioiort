import { RepoBase } from './repositories.base';
import { Contacts } from '../models/contacts.model'
import { Pool, QueryResult } from 'pg';

export class ContactsRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<Contacts[]> {
        let queryText = 'SELECT * FROM test."Contacts"ORDER BY "ContactID"ASC ';

        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText, [option.id, option.Token])
        } else {
            pResult = this._pgPool.query(queryText)
        }


        return pResult.then(result => {
            let contacts: Contacts[] = result.rows.map(r => {
                let contact = new Contacts();
                contact.id = r.ContactID;
                contact.Token = r.Token;
                contact.Email = r.Email;
                contact.TaiKhoan = r.TaiKhoan;
                contact.Device = r.Device;
                contact.PhoneNumber = r.PhoneNumber;
                contact.NgayTao = r.NgayTao;
                contact.FaceBook = r.FaceBook;
                contact.Contact_Tag = r.Contact_Tag;
                return contact;
            });
            return contacts;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
 }
}