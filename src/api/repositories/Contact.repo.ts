import { RepoBase } from './repositories.base';
import { Contact } from '../models/Contact.model'
import { Pool, QueryResult } from 'pg';

export class ContactRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<Contact[]> {
        let queryText = 'select * from test."Contacts" ';

        // console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText + 'where "Contact_Tag" = ' + "'{" + option.Contact_Tag + "}'")

            console.info(option.Contact_Tag)
        } else {
            pResult = this._pgPool.query(queryText)
        }


        return pResult.then(result => {
            let Contacts: Contact[] = result.rows.map(r => {
                let contact = new Contact();
                contact.ContactID = r.ContactID;
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
            return Contacts;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }

    public getOne(option): Promise<Contact> {
        let queryText = 'select * from test.Contacts where "Contact_Tag" = $1';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [option.Contact_Tag])
            .then(result => {
                let contact = new Contact();
                contact.ContactID = result.rows[0].ContactID;
                contact.Token = result.rows[0].Token;
                contact.Email = result.rows[0].Email;
                contact.TaiKhoan = result.rows[0].TaiKhoan;
                contact.Device = result.rows[0].Device;
                contact.PhoneNumber = result.rows[0].PhoneNumber;
                contact.NgayTao = result.rows[0].NgayTao;
                contact.FaceBook = result.rows[0].FaceBook;
                contact.Contact_Tag = result.rows[0].Contact_Tag;
                return contact;
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