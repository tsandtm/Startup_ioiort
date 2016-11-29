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
        let queryText;
        //  = 'select distinct "Device",count("Device") as count,date_part(\'month\',"NgayTao") as date from test."Contacts" group by "Device","NgayTao" order by date_part(\'month\',"NgayTao")';
        let pResult;
        if (option.month != undefined) {
            queryText = 'select "Device",count("Device") as count,date_part(\'month\',"NgayTao") as date ' +
                'from test."Contacts" ' +
                'where date_part(\'month\',"NgayTao") = ' + option.month + ' and date_part(\'year\',"NgayTao") =' + option.year +
                ' group by "Device",date_part(\'month\',"NgayTao"),date_part(\'year\',"NgayTao")' +
                ' order by date_part(\'month\',"NgayTao")';
            console.log(queryText);
            console.log("repo" + option.month + "" + option.year);
            pResult = this._pgPool.query(queryText);
        } else {
            queryText = 'select "Device",count("Device") as count,date_part(\'month\',"NgayTao") as date from test."Contacts" group by "Device",date_part(\'month\',"NgayTao") order by date_part(\'month\',"NgayTao")';
            // console.log("cau 2" + queryText);
            pResult = this._pgPool.query(queryText);
        }
        // if (option.Contact_Tag != undefined) {
        //     pResult = this._pgPool.query(queryText + 'where "Contact_Tag" = ' + "'{" + option.Contact_Tag + "}'")

        //     console.info(option.Contact_Tag)
        // } else {
        //     pResult = this._pgPool.query(queryText)
        // }
        return pResult.then(result => {
            let index = -1;
            let flag = "";
            let group = "";
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
                // console.log('Report xx: ' + report)
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

    //get for dougnut
    public getAlldougnut(): Promise<Report[]> {
        let queryText = 'select "Device",count("Device") as count from test."Contacts" group by "Device"';
        let pResult;
        // if (option.month != undefined) {
        //     queryText = 'select "Device",count("Device") as count,date_part(\'month\',"NgayTao") as date ' +
        //         'from test."Contacts" ' +
        //         'where date_part(\'month\',"NgayTao") = ' + option.month + ' and date_part(\'year\',"NgayTao") =' + option.year +
        //         ' group by "Device",date_part(\'month\',"NgayTao"),date_part(\'year\',"NgayTao")' +
        //         ' order by date_part(\'month\',"NgayTao")';
        //     console.log(queryText);
        //     console.log("repo" + option.month + "" + option.year);
        //     pResult = this._pgPool.query(queryText);
        // } else {
        //     queryText = 'select "Device",count("Device") as count,date_part(\'month\',"NgayTao") as date from test."Contacts" group by "Device",date_part(\'month\',"NgayTao") order by date_part(\'month\',"NgayTao")';
        //     console.log("cau 2" + queryText);
        //     pResult = this._pgPool.query(queryText);
        // }
        pResult = this._pgPool.query(queryText)
        return pResult.then(result => {
            // let report = new Report();
            let reports: Report[] = result.rows.map(r => {
                let report = new Report();
                report.name = r.Device;
                report.count = r.count;
                return report;
            })
            return reports;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
}