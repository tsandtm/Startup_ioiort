import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Notifications } from '../shared/notifications.model';
import { NotificationsService } from '../shared/notifications.service';


@Component({
    templateUrl: '/notifications/notifications-detail/notifications-detail.component.html'
})
export class NotificationstDetailComponent implements OnInit {
    pageTitle: string = '';
    @Input() notifications: Notifications;
    errorMessage: string;

    constructor(private _notificationsService: NotificationsService,
        private _router: Router,
        private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route.params.forEach((params: Params) => {
            console.log(params["id"])
            let id = +params["id"];
            this.getNotifications(id);
        })
    }

    getNotifications(id: number) {
        
        this._notificationsService.getNotifications(id)
            .then(notifications => this.notifications = notifications)
    }

    onBack(): void {
        this._router.navigate(['notification']);
    }

}
