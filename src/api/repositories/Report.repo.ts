import { RepoBase } from './repositories.base';
import { Contact } from '../models/Contact.model'
import { Pool, QueryResult } from 'pg';
import { Report } from '../models/Report.model'
import { ListDevice } from '../models/Report.model'
export class ReportRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<Report[]> {
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
        
            let listDevice: ListDevice[] = result.rows.map(r => {
                let listDevices = new ListDevice();
                let report = new Report();
                if (flag != r.date) {
                    index++;
                    flag = r.date;
                    listDevices.date = r.date;
                    console.log(r.date);
                }
                listDevices.date = flag;
                report.name = r.Device;
                report.count = r.count;                
                listDevices.listdevice[index] = report;
                console.log(listDevices.listdevice[index]);     
                return listDevices;        
            });
            console.log(listDevice);            
            return listDevice;         
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
}