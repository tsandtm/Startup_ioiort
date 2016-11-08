import {  PipeTransform, Pipe } from '@angular/core';
import { Notification } from '../shared/Notification.model';

@Pipe({
    name: 'notificationFilter'
})
export class NotificationFilterPipe implements PipeTransform {

    transform(value: Notification[], args: string[]): Notification[] {
        let filter: string = args[0] ? args[0].toLocaleLowerCase() : null;
        return filter ? value.filter((notification: Notification) =>
            notification.TieuDe.toLocaleLowerCase().indexOf(filter) !== -1) : value;
    }
}
