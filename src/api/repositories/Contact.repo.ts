import { RepoBase } from './repositories.base';
import { Contact } from '../models/Contact.model'
import { Pool, QueryResult } from 'pg';

export class ContactRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option: Contact): Promise<Contact[]> {
        let queryText = 'select * from test."Contacts"';
        let pResult;

        if (option.Contact_Tag != undefined) {
            for (let i = 0; i < option.Contact_Tag.length; i++) {
                option.Contact_Tag[i] = parseInt(option.Contact_Tag[i].toString(), 10)
            }
            console.log(option);
            queryText = 'select * from test."Contacts" where "Contact_Tag" = Array[' + option.Contact_Tag + ']';
            // queryText = 'select * from test."Contacts" where "Contact_Tag" = Array[$1]';
            pResult = this._pgPool.query(queryText);
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
        let queryText = 'select * from test."Contacts" where "ContactID" = $1';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [option.ContactID])
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

    public create(option): Promise<Contact> {
        let queryText = 'INSERT INTO test."Contacts" ("ContactID", "Token", "Email", "TaiKhoan", "Device", "PhoneNumber", "NgayTao", "FaceBook", "Contact_Tag") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
        return this._pgPool.query(queryText, [option.ContactID, option.Token, option.Email, option.TaiKhoan, option.Device, option.PhoneNumber, option.NgayTao, option.FaceBook, option.Contact_Tag])
            .then(result => {
                return option;
            });
    }

    public update(option: Contact): Promise<Contact> {
        for (let i = 0; i < option.Contact_Tag.length; i++) {
            option.Contact_Tag[i] = parseInt(option.Contact_Tag[i].toString(), 10)
        }
        let queryText = 'UPDATE test."Contacts" SET "Contact_Tag" = Array[' + option.Contact_Tag + '] WHERE "ContactID" = ' + option.ContactID;
        return this._pgPool.query(queryText)
            .then(result => {
                return option;
            });
    }
}