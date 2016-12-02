import {  PipeTransform, Pipe } from '@angular/core';
import { Notifications } from '../shared/notifications.model';

@Pipe({
    name: 'notificationdateFilter'
})
export class NotificationDateFilterPipe implements PipeTransform {

    transform(value: Notifications[], filterBy: string): Notifications[] {
        filterBy = filterBy ? new Date(filterBy).toISOString().replace(/T.*/,'').split('-').reverse().join('/') : null;
        console.log(filterBy);
        return filterBy ? value.filter((set: Notifications) =>
            set.ThoiGianGui.toString().indexOf(filterBy) !== -1) : value;
    }
}
