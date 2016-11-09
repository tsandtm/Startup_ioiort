import { RepoBase } from './repositories.base';
import { Contact } from '../models/Contact.model'
import { Pool, QueryResult } from 'pg';
import { Report } from '../models/Report.model'

export class ReportRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<Report[]> {
        let queryText = 'select distinct "Device",count("Device") as count,date_part(\'month\',"NgayTao") as date from test."Contacts"  where "Device" = \'android\' group by "Device","NgayTao"';
        let queryText_ios = 'select distinct "Device",count("Device") as count,date_part(\'month\',"NgayTao") as date from test."Contacts"  where "Device" = \'ios\' group by "Device","NgayTao"';
        let pResult;
        if (option.Contact_Tag != undefined) {
            pResult = this._pgPool.query(queryText + 'where "Contact_Tag" = ' + "'{" + option.Contact_Tag + "}'")

            console.info(option.Contact_Tag)
        } else {
            pResult = this._pgPool.query(queryText)
           
        }


        return pResult.then(result => {
            
            let Reports: Report[] = result.rows.map(r => {  
                let contact = new Report();              
                contact.Device = r.Device;
                contact.count = r.count;  
                contact.date = r.date; 
                return contact;                       
            });
             return Reports;

            // return this._pgPool.query(queryText_month).then(result => {
            //     let Reports: Report[] = result.rows.map(r => {                    
            //         contact.date = r.date;
            //         return contact;
            //     });
            //     return Reports;
            // })
            
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }


}