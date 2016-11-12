import { Injectable } from '@angular/core';
import { Http, Response,Request  } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Tag } from './tag.model';

@Injectable()
export class TagService{

    constructor(private _http: Http) { }

    getAllTag(): Promise<Tag[]> {
        // return this._http.get('/api/book')
        //     .map((response: Response) => <Product[]>response.json())
        //     .do(data => console.log('All: ' + JSON.stringify(data)))
        //     .catch(this.handleError);
        return this._http.get('/api/tag')
            .toPromise()
            .then(response => response.json() as Tag[])
            .catch(this.handleError);
            
    }
    
    Create(req): Promise<Tag[]> {
        return this._http.post('/api/tag',req)
            .toPromise()
            .then(response => response.json() as Tag[])
            .catch(this.handleError);
    }
    Delete(req): Promise<Tag[]> {
        return this._http.post('/api/tagdelete',req)
            .toPromise()
            .then(response => response.json() as Tag[])
            .catch(this.handleError);
    }
    Edit(req): Promise<Tag[]> {
        return this._http.post('/api/tagedit',req)
            .toPromise()
            .then(response => response.json() as Tag[])
            .catch(this.handleError);
    }
    getOne(id): Promise<Tag> {
        return this.getAllTag()
            .then(products => products.find(p => p.tagid === id))
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