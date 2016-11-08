import { Component, OnInit } from '@angular/core';
import { Notification } from '../Shared/Notification.model';
import { NotificationService } from '../Shared/Notification.service';
import { NotificationFilterPipe } from '../Notification-filter/Notification-filter.pipe';

@Component({
    selector: 'Notification-list',
    templateUrl: '/Notifications/Notification-list/Notification-list.component.html',
    styleUrls: ['/assets/shop-homepage.css'],
    providers: [NotificationService]
})
export class NotificationListComponent implements OnInit {
    Notifications: Notification[];
    listFilter: string = '';
    constructor(private notificationService: NotificationService) {

    }

    loadGetAll() {
        this.notificationService.getProducts().then( (result) => this.Notifications = result);
    }

    ngOnInit(): void {
        this.loadGetAll();
    }
}