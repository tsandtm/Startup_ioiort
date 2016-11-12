import { Injectable } from '@angular/core';
import { Http, Response,Request  } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Setting } from './setting.model';

@Injectable()
export class SettingService{

    constructor(private _http: Http) { }

    getAllSetting(): Promise<Setting[]> {
        // return this._http.get('/api/book')
        //     .map((response: Response) => <Product[]>response.json())
        //     .do(data => console.log('All: ' + JSON.stringify(data)))
        //     .catch(this.handleError);
        return this._http.get('/api/setting')
            .toPromise()
            .then(response => response.json() as Setting[])
            .catch(this.handleError);
            
    }
    
    Create(req): Promise<Setting[]> {
        return this._http.post('/api/setting',req)
            .toPromise()
            .then(response => response.json() as Setting[])
            .catch(this.handleError);
    }
    Delete(req): Promise<Setting[]> {
        return this._http.post('/api/settingdelete',req)
            .toPromise()
            .then(response => response.json() as Setting[])
            .catch(this.handleError);
    }
    Detail(req): Promise<Setting> {
       return this._http.post('/api/settingdetail',req)
            .toPromise()
            .then(response => response.json() as Setting)
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