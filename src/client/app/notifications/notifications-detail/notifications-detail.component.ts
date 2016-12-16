import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Notifi,SentUser,UpdateData,InsertUser } from '../../notification-send/shared/notifi.model';
import { Notifications,SentContact } from '../shared/notifications.model';
import { NotificationsService } from '../shared/notifications.service';


@Component({
    templateUrl: '/notifications/notifications-detail/notifications-detail.component.html'
})
export class NotificationstDetailComponent implements OnInit {
    pageTitle: string = '';
    @Input() notifications: Notifications;
    @Input() sentUser: SentContact[];
    errorMessage: string;

    constructor(private _notificationsService: NotificationsService,
        private _router: Router,
        private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route.params.forEach((params: Params) => {
            console.log(params["id"])
            let id = +params["id"];
             console.log(params["id2"])
            let id2 = +params["id2"]-1;
            this.getNotifications(id,id2);
            this.getAllSentUser(id);
        })
    }

    getNotifications(id: number,id2: number) {
        
        this._notificationsService.getNotifications(id,id2)
            .then(notifications =>{
                this.notifications = notifications;
                console.log(notifications);
            })
    }

    getAllSentUser(id: number) {
        
        this._notificationsService.getSendUser(id)
            .then(sent => this.sentUser = sent)
    }

    onBack(): void {
        this._router.navigate(['notification']);
    }

}
