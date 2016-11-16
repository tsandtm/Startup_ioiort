import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Yeucauban } from '../shared/yeucauban.model';

@Injectable()
export class YeucaubanService {
    

    constructor(private _http: Http) { }
    getList():Promise<Yeucauban[]>{
        return this._http.get('/api/yeucauban')
            .toPromise()
            .then(response => response.json() as Yeucauban[])
            .catch(this.handleError);
    }

    // getNotifications(id: number): Promise<Yeucauban> {
    //     return this.getList()
    //         .then(notifications => notifications.find(p => p.id === id))
    //         .catch(this.handleError);
    // }
    // createNotifi(id:number):Promise<Yeucauban>{
    //     return this.getList()
    //             .then(notifications => notifications.find(p => p.id === id))
    //             .catch(this.handleError);
    // }

    private handleError(error: Error): Promise<any> {
        console.error(error);
        return Promise.reject(error.message || error);
        

    }    
}