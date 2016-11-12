import { RepoBase } from './repositories.base';
import { Contact } from '../models/Contact.model'
import { Pool, QueryResult } from 'pg';
import { ListDevice } from '../models/Report.model'
import { Report } from '../models/Report.model'
export class ReportRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<ListDevice[]> {
        let queryText = 'select distinct "Device",count("Device") as count,date_part(\'month\',"NgayTao") as date from test."Contacts" group by "Device","NgayTao" order by date_part(\'month\',"NgayTao")';
        let pResult;
        if (option.Contact_Tag != undefined) {
            pResult = this._pgPool.query(queryText + 'where "Contact_Tag" = ' + "'{" + option.Contact_Tag + "}'")

            console.info(option.Contact_Tag)
        } else {
            pResult = this._pgPool.query(queryText)
        }
        return pResult.then(result => {
            let index = -1;
            let flag = "";
            let group ="";
            let listDevices = new Array<ListDevice>();

            let report;
            let listDevice: ListDevice[] = result.rows.map(r => {                
                report = new Report();                           
                if (flag != r.date) {
                    index++; 
                   
                    let xx = new ListDevice();
                    listDevices.push(xx);
                    listDevices[index].date = r.date;
                   

                    flag = r.date;                 
                
                }
                
                report.name = r.Device;
                report.count = r.count;
                listDevices[index].listdevice.push(report);
                // listDevices.listdevice.push(report);               
                // listDevices.listdevice[index] = list;
                // console.log(listDevices);
                // return listDevices;
            });
            return listDevices;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
}