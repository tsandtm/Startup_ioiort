import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Notifications } from '../shared/notifications.model';

@Injectable()
export class NotificationsService {
    

    constructor(private _http: Http) { }
    getList():Promise<Notifications[]>{
        return this._http.get('/api/notification')
            .toPromise()
            .then(response => response.json() as Notifications[])
            .catch(this.handleError);
    }

    getNotifications(id: number): Promise<Notifications> {
        return this.getList()
            .then(notifications => notifications.find(p => p.id === id))
            .catch(this.handleError);
    }

    private handleError(error: Error): Promise<any> {
        console.error(error);
        return Promise.reject(error.message || error);
        

    }    
}