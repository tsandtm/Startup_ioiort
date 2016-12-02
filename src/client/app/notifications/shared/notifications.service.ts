import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Notifications,SentContact } from '../shared/notifications.model';

@Injectable()
export class NotificationsService {
    

    constructor(private _http: Http) { }
    getList():Promise<Notifications[]>{
        return this._http.get('/api/notification')
            .toPromise()
            .then(response => response.json() as Notifications[])
            .catch(this.handleError);
    }
    getAllNotifications(): Promise<Notifications[]> {
        // return this._http.get('/api/book')
        //     .map((response: Response) => <Product[]>response.json())
        //     .do(data => console.log('All: ' + JSON.stringify(data)))
        //     .catch(this.handleError);
        return this._http.get('/api/notification')
            .toPromise()
            .then(response => response.json() as Notifications[])
            .catch(this.handleError);
            
    }
    getAllSendUser():Promise<SentContact[]>{
        return this._http.get('/api/getlistsenduser')
            .toPromise()
            .then(response => response.json() as SentContact[])
            .catch(this.handleError);
    }
    getSendUser(id:number):Promise<SentContact[]>{
        return this.getAllSendUser()
            .then(slsend => slsend.filter(p => p.NotifiID === id))
            .catch(this.handleError);
    }

    getNotifications(id: number): Promise<Notifications> {
        return this.getList()
            .then(notifications => notifications.find(p => p.id === id))
            .catch(this.handleError);
    }
    createNotifi(id:number):Promise<Notifications>{
        return this.getList()
                .then(notifications => notifications.find(p => p.id === id))
                .catch(this.handleError);
    }

    private handleError(error: Error): Promise<any> {
        console.error(error);
        return Promise.reject(error.message || error);
        

    }
      getOne(id): Promise<Notifications> {
        return this.getAllNotifications()
            .then(products => products.find(p => p.id === id))
            .catch(this.handleError);
      }
      Edit(req): Promise<Notifications> {
        return this._http.post('/api/notificationedit',req)
            .toPromise()
            .then(response => response.json() as Notifications)
            .catch(this.handleError);
    }
}   