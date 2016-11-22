import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Tag } from './tag.model';

@Injectable()
export class TagService {
    private _productUrl = 'api/products/products.json';

    constructor(private _http: Http) { }

    getAllTag(): Promise<Tag[]> {
        return this._http.get('/api/Tag')
            .toPromise()
            .then(response => response.json() as Tag[])
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
