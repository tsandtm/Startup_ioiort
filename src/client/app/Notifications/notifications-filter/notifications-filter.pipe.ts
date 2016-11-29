import {  PipeTransform, Pipe } from '@angular/core';
import { Notifications } from '../shared/notifications.model';

@Pipe({
    name: 'notificationFilter'
})
export class NotificationFilterPipe implements PipeTransform {

    transform(value: Notifications[], filterBy: string): Notifications[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((set: Notifications) =>
            set.TieuDe.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
