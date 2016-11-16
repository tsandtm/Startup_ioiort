import { Injectable } from '@angular/core';
import { Http, Response,Request  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Tag } from '../../tag/shared/tag.model';
import { Contact } from './Contact.model';

@Injectable()
export class ContactService{
    
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
    getAllContact(): Promise<Contact[]> {
        // return this._http.get('/api/book')
        //     .map((response: Response) => <Product[]>response.json())
        //     .do(data => console.log('All: ' + JSON.stringify(data)))
        //     .catch(this.handleError);
        return this._http.get('/api/contact')
            .toPromise()
            .then(response => response.json() as Contact[])
            .catch(this.handleError);
            
    }
    
    Create(req): Promise<Contact[]> {
        return this._http.post('/api/contact',req)
            .toPromise()
            .then(response => response.json() as Contact[])
            .catch(this.handleError);
    }
    Delete(req): Promise<Contact[]> {
        return this._http.post('/api/contactdelete',req)
            .toPromise()
            .then(response => response.json() as Contact[])
            .catch(this.handleError);
    }
    Edit(req): Promise<Contact[]> {
        return this._http.post('/api/contactedit',req)
            .toPromise()
            .then(response => response.json() as Contact[])
            .catch(this.handleError);
    }
    getOne(id): Promise<Contact> {
        return this.getAllContact()
            .then(contact => contact.find(p => p.ContactID === id))
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