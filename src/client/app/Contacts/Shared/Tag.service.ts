import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Tag } from './Tag.model';

@Injectable()
export class TagService {

    constructor(private _http: Http) { }

    getTags(AccountID: string): Promise<Tag[]> {
        console.log("gettags: "+AccountID);
        return this._http.get('/api/Tag?AccountID=' +AccountID)
            .toPromise()
            .then(response => response.json() as Tag[])
            .catch(this.handleError);
    }

    CreateTag(valueTagNameDisplay: string, valueAccountID: string, valueIsDefault: boolean): Promise<any> {
        let params = JSON.stringify({ TagNameDisplay: valueTagNameDisplay, AccountID: valueAccountID, IsDefault: valueIsDefault });
        let headers = new Headers();
        console.log('params: ' + params);
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/Tag/CreateTag', params, {
            headers: headers,
            body: params
        })
            .toPromise()
            .then((response) => {
                return response;
            })
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
