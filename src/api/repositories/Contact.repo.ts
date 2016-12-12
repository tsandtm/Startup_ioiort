import { RepoBase } from './repositories.base';
import { Contact } from '../models/Contact.model'
import { Pool, QueryResult } from 'pg';

export class ContactRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(PageNum: number): Promise<Contact[]> {
        let queryText = 'select *, (select count (*)  from test."Contacts") as total from test."Contacts" ORDER BY "ContactID" ASC limit 25 offset (' + PageNum + ') *25';
        let pResult;
        pResult = this._pgPool.query(queryText)

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
                contact.Contact_TagID = r.Contact_TagID;
                contact.Contact_TagName = r.Contact_TagName;
                contact.Total = r.total;
                return contact;
            });
            return Contacts;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
    
    public getListA(option): Promise<Contact[]> {
        let queryText = 'select * from test."Contacts" where lower("TaiKhoan") like lower($1) ORDER BY "ContactID" ASC LIMIT 10 OFFSET $2';
        let pResult;
        if(option.page == undefined){
            pResult = this._pgPool.query(queryText,['%'+option.id+'%',0])
        }
        else{
            pResult = this._pgPool.query(queryText,['%'+option.id+'%',option.page*10])
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
                contact.Contact_TagID = r.Contact_TagID;
                contact.Contact_TagName = r.Contact_TagName;
                contact.Total = r.total;
                return contact;
            });
            return Contacts;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
    public getCountContact(option): Promise<number> {
        let queryText = 'select count(*) from test."Contacts" where lower("TaiKhoan") like lower($1)';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText,[option.id])
            .then(result => {
                let count:number;
                count = result.rows[0].count;
                return count;
            })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }

    public getOne(option): Promise<Contact> {
        let queryText = 'select * from test."Contacts" where "ContactID" = $1';

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
                contact.Contact_TagID = result.rows[0].Contact_TagID;
                contact.Contact_TagName = result.rows[0].Contact_TagName;
                return contact;
            });
    }

    public SearchByAccount(TaiKhoan: string, PageNum: number) {
        let queryText = `select *, (select count (*)  from test."Contacts") as total 
            from test."Contacts" 
            ORDER BY "ContactID" ASC 
            limit 25 offset ${PageNum * 25} `;
        if(TaiKhoan){
            queryText = `select *, (select count (*)  from test."Contacts" where "TaiKhoan" = '${TaiKhoan}' ) as total 
            from test."Contacts" 
            where "TaiKhoan" = '${TaiKhoan}' 
            ORDER BY "ContactID" ASC 
            limit 25 offset ${PageNum * 25} `;
        }

        let pResult = this._pgPool.query(queryText);

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
                contact.Contact_TagID = r.Contact_TagID;
                contact.Contact_TagName = r.Contact_TagName;
                contact.Total = r.total;
                return contact;
            });
            return Contacts;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }

    // public create(option): Promise<Contact> {
    //     let queryText = 'INSERT INTO test."Contacts" ("ContactID", "Token", "Email", "TaiKhoan", "Device", "PhoneNumber", "NgayTao", "FaceBook", "Contact_TagID", "Contact_TagName") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    //     return this._pgPool.query(queryText, [option.ContactID, option.Token, option.Email, option.TaiKhoan, option.Device, option.PhoneNumber, option.NgayTao, option.FaceBook, option.Contact_TagID, option.Contact_TagName])
    //         .then(result => {
    //             return option;
    //         });
    // }

    public update(option: Contact): Promise<Contact> {
        let queryText;
        if (option.Contact_TagID.length != 0) {
            for (let i = 0; i < option.Contact_TagID.length; i++) {
                option.Contact_TagID[i] = parseInt(option.Contact_TagID[i].toString(), 10)
            }
            queryText = 'UPDATE test."Contacts" SET "Contact_TagID" = \'{ ' + option.Contact_TagID + ' }\', "Contact_TagName" = \'{ ' + option.Contact_TagName + ' }\' WHERE "ContactID" = ' + option.ContactID;
        }
        else {
            queryText = 'UPDATE test."Contacts" SET "Contact_TagID" = \'{}\', "Contact_TagName" = \'{}\'  WHERE "ContactID" = ' + option.ContactID;
        }
        return this._pgPool.query(queryText)
            .then(result => {
                return option;
            });
    }

    public SearchByTag(Contact_TagName: string, PageNum: number): Promise<Contact[]> {
        let queryText;
        if (Contact_TagName == "All" || Contact_TagName == "all") {
            queryText = 'select * from test."Contacts" ORDER BY "ContactID" ASC LIMIT 25 offset (' + PageNum + ') *25';
        }
        else {
            queryText = 'select *, (select count (*) from test."Contacts" where \'' + Contact_TagName + '\' = any("Contact_TagName")) as total from test."Contacts" where \'' + Contact_TagName + '\' = any("Contact_TagName") order by "ContactID" ASC limit 25 offset (' + PageNum + ') *25';
        }

        let pResult = this._pgPool.query(queryText);

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
                contact.Contact_TagID = r.Contact_TagID;
                contact.Contact_TagName = r.Contact_TagName;
                contact.Total = r.total;
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