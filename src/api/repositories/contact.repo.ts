import { RepoBase } from './repositories.base';
import { Contact } from '../models/contact.model';

export class ContactRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<Contact[]> {
        let queryText = 'select * from "Contacts"';

        console.info('Excute: ' + queryText);
        let pResult;   

        if (option.appid != undefined) {
            pResult = this._pgPool.query(queryText + ' where "ContactID" = ' + option.appid)
        } else {
            pResult = this._pgPool.query(queryText)
        }
        return pResult.then(result => {
            let contacts: Contact[] = result.rows.map(r => {
                let contact  = new Contact();
                contact.ContactID = r.ContactID;
                console.log(r.ContactID);
                contact.Token = r.Token;
                contact.Email = r.Email;
                contact.TaiKhoan = r.TaiKhoan;
                contact.Device = r.Device;
                contact.PhoneNumber = r.PhoneNumber;
                contact.NgayTao = r.NgayTao;
                contact.Facebook = r.NgayTao;
                contact.Contact_Tag = r.Contact_Tag;
                contact.isactive = false;
                return contact;
            });
            return contacts;
        })
            .catch(err => {
                console.error(err.message);
                return null;
        });
    }
    public Update(option): Promise<Contact> {
       
        let queryText = 'UPDATE "Contacts"  SET "Contact_Tag" = $1 where "ContactID" = $2';
        console.info('Excute: ' + queryText + option.Contact_Tag);
        return this._pgPool.query(queryText, [
                option.Contact_Tag,
                option.ContactID,
                ])
                    .then(result => {
                        return null;
                    });
    
    }
    public Create(option): Promise<Contact> {
        let queryText = 'INSERT INTO "n_App" values($1,$2,$3,$4,$5)';

        console.log('Excute: ' + option.isactive);

        return this._pgPool.query(queryText, [
        option.appid,
        option.apikey,
        option.appname,
        option.trangthai,
        option.ngaytao,                    
        ])
            .then(result => {
                return null;
            });
    }
    public Edit(option): Promise<Contact> {
        let queryText = 'UPDATE "n_App" SET "APIKey" = $1, "AppName" = $2 , "NgayTao" =$3 , "IsActive" = $4 where "AppID" = $5';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [
        option.apikey,
        option.appname,
        option.ngaytao,
        option.trangthai,
        option.appid,
        ])
            .then(result => {
                return null;
            });
    }
    public Delete(option): Promise<Contact> {
        let queryText = 'DELETE FROM "n_App" where "AppID" = $1';
        console.info('Excute: ' + queryText);
        return this._pgPool.query(queryText, [option.appid])
            .then(result => {
                return null;
            });
    }
}