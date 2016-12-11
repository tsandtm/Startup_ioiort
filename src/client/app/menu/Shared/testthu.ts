import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

    constructor(private _http: Http) { }

    login(): Promise<any> {
        return this._http.get('http://localhost:3000/api')
            .toPromise()
            .then((response) => {
                return response;
            })
            .catch(this.handleError);
    }

    private handleError(error: Error): Promise<any> {
        console.error(error);
        return Promise.reject(error.message || error);


    }
}