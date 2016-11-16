import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Contacts } from './contacts.model';

@Injectable()
export class ContactsService {
    

    constructor(private _http: Http) { }
    getList():Promise<Contacts[]>{
        return this._http.get('/api/contact')
            .toPromise()
            .then(response => response.json() as Contacts[])
            .catch(this.handleError);
    }

    private handleError(error: Error): Promise<any> {
        console.error(error);
        return Promise.reject(error.message || error);
        

    }
    // getContact(id: number): Promise<Contacts> {      
    //     return this.getList()
    //         .then(contact=>{
    //             let con =contact.find(t=>+t.id===id);
    //             console.log(con);
    //             return con;
    //         })
    //         .catch(this.handleError);
            
    
}