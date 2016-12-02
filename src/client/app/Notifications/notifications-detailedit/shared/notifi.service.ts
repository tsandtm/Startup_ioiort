import { Injectable } from '@angular/core';
import { Http, Response,Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Notifi,SLSend,SentUser,UpdateData,InsertUser } from './notifi.model';

@Injectable()
export class NotifiService {
    private _productUrl = 'api/products/products.json';

    constructor(private _http: Http) { }

    Create(req): Promise<Notifi[]> {
        return this._http.post('/api/notifi',req)
            .toPromise()
            .then(response => response.json() as Notifi[])
            .catch(this.handleError);
    }
    Update(req):Promise<UpdateData>{
        return this._http.post('/api/notifigetone',req)
            .toPromise()
            .then(response => response.json() as UpdateData)
            .catch(this.handleError);
    }
    Insert(req): Promise<InsertUser> {
        return this._http.post('/api/sentuser',req)
            .toPromise()
            .then(response => response.json() as InsertUser)
            .catch(this.handleError);
    }

    getslsend(req): Promise<number> {
        return this._http.post('/api/sl',req)
            .toPromise()
            .then(response => response.json() as number)
            .catch(this.handleError);
    }
    getsldenied(req): Promise<number> {
        return this._http.post('/api/sldenied',req)
            .toPromise()
            .then(response => response.json() as number)
            .catch(this.handleError);
    }
    getLastNotifi(): Promise<Notifi> {
        return this._http.get('/api/notifi')
            .toPromise()
            .then(response => response.json() as Notifi)
            .catch(this.handleError);
    }
    getAllNoti(): Promise<Notifi[]> {
        return this._http.get('/api/notifigetone')
            .toPromise()
            .then(response => response.json() as Notifi[])
            .catch(this.handleError);
    }

    getOne(id): Promise<Notifi> {
        return this.getAllNoti()
            .then(products => products.find(p => p.NotifiID === id))
            .catch(this.handleError);
    }
    getAllSL():Promise<SLSend[]>{
        return this._http.get('/api/sl')
            .toPromise()
            .then(response => response.json() as SLSend[])
            .catch(this.handleError);
    }
    getSL(id): Promise<SLSend> {
        return this.getAllSL()
            .then(slsend => slsend.find(p => p.NotifiID === id))
            .catch(this.handleError);
    }
    getSend():Promise<SentUser[]>{
        return this._http.get('/api/sentuser')
            .toPromise()
            .then(response => response.json() as SentUser[])
            .catch(this.handleError);
    }
    getSendUser(id):Promise<SentUser[]>{
        return this.getSend()
            .then(slsend => slsend.filter(p => p.NotifiID === id))
            .catch(this.handleError);
    }
    private handleError(error: Error): Promise<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Promise.reject(error.message || error);
        // return Observable.throw(error.json().error || 'Server error');

    }
}
