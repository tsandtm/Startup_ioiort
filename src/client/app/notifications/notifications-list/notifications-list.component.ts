import { Component,OnInit}  from '@angular/core';

import { Notifications } from '../shared/notifications.model';
import { NotificationsService } from '../shared/notifications.service';


@Component({
    templateUrl: '/notifications/notifications-list/notifications-list.component.html'
    //styleUrls: ['/menu/menu-list/menu-list.component.css']
})
export class NotificationsListComponent {
    pageTitle: string = 'Notifications List'; 
    notifications:Notifications[];
    constructor(private _notificationsService: NotificationsService) {

    }

    ngOnInit(): void {
        this._notificationsService.getList()
                .then(notifications => this.notifications = notifications)
    }
}