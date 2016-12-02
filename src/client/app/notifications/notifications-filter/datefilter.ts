import {  PipeTransform, Pipe } from '@angular/core';
import { Notifications } from '../shared/notifications.model';

@Pipe({
    name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

    transform(value: Notifications[], dateValue: Date): Notifications[] {
        let strValue = dateValue ? dateValue.toLocaleString() : null;
        return strValue ? value.filter((set: Notifications) => {
            if(set.ThoiGianGui){
                let d1 = new Date(set.ThoiGianGui);
                let d2 = new Date(dateValue);
                let sd1 = this.dateToString(d1);
                let sd2 = this.dateToString(d2);
                console.log(sd1 + ' ' + sd2);
                console.log(sd1 === sd2);
                // console.log(d2);
                return sd1 === sd2;
            }
            return false;
        }) : value;
    }

    private dateToString(d: Date){
        let day = d.getDate().toString();
        let month = (d.getMonth() + 1).toString();
        let year = d.getFullYear().toString();
        return day + '-' + month + '-' + year;
    }
}
