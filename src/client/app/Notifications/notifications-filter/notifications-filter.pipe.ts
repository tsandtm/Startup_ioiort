import {  PipeTransform, Pipe } from '@angular/core';
import { Notifications } from '../shared/notifications.model';

@Pipe({
    name: 'notificationFilter'
})
export class NotificationFilterPipe implements PipeTransform {

    transform(value: Notifications[], args: string[]): Notifications[] {
        let filter: string = args[0] ? args[0].toLocaleLowerCase() : null;
        return filter ? value.filter((notification: Notifications) =>
            notification.TieuDe.toLocaleLowerCase().indexOf(filter) !== -1) : value;
    }
}
