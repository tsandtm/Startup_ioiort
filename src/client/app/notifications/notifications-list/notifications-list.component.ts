import { Component,OnInit}  from '@angular/core';

import { Notifications } from '../shared/notifications.model';
import { NotificationsService } from '../shared/notifications.service';
import { NotificationFilterPipe } from '../notifications-filter/notifications-filter.pipe';


@Component({
    templateUrl: '/notifications/notifications-list/notifications-list.component.html'
    //styleUrls: ['/menu/menu-list/menu-list.component.css']
})
export class NotificationsListComponent {
    pageTitle: string = 'Notifications List'; 
    notifications:Notifications[];
    listFilter: string = '';
    listFilter1: string ='';
    constructor(private _notificationsService: NotificationsService) {

    }

    ngOnInit(): void {
        this._notificationsService.getList()
                .then(notifications => this.notifications = notifications)
    }
}