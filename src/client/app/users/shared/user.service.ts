import { Injectable } from '@angular/core';
import { Http, Response,Request  } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from './user.model';

@Injectable()
export class UsersService{

    constructor(private _http: Http) { }

    getAllUsers(): Promise<User[]> {
        // return this._http.get('/api/book')
        //     .map((response: Response) => <Product[]>response.json())
        //     .do(data => console.log('All: ' + JSON.stringify(data)))
        //     .catch(this.handleError);
        return this._http.get('/api/users')
            .toPromise()
            .then(response => response.json() as User[])
            .catch(this.handleError);
            
    }

    getUser(id: number): Promise<User> {
        // return this._http.get('/api/book')
        //     .map((response: Response) => <Product[]>response.json())
        //     .do(data => console.log('All: ' + JSON.stringify(data)))
        //     .catch(this.handleError);
        return this.getAllUsers()
            .then(n => n.find(p => p.IDUser === id))
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