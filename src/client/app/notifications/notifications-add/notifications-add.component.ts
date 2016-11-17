import { Component,OnInit}  from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular-modal';
import { BSModalContext } from 'angular-modal/plugins/bootstrap';

import { Notifications } from '../shared/notifications.model';
import { NotificationsService } from '../shared/notifications.service';

@Component({

     templateUrl: '/notifications/notifications-add/notifications-add.component.html'
})

export class NotificationsAddComponent {
    pageTitle: string = 'Notifications Create'; 
    notifications:Notifications[];
    constructor(private _notificationsService: NotificationsService) {

    }
    ngOnInit(): void {
        this._notificationsService.getList()
                .then(notifications => this.notifications = notifications)
    }
}