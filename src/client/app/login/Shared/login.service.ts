import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

    constructor(private _http: Http) { }

    login(username: string, password: string): Promise<any> {
        // let params = JSON.stringify({ UserName: username, PassHash: password });
        // let headers = new Headers();
        //application/x-www-form-urlencoded
        let body = new URLSearchParams();
        body.set("UserName", username)
        body.set("PassHash", password)
        // headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post('http://localhost:3000/api/login/checklogin', body)
            .toPromise()
            .then((response) => {
                return response;
            })
            .catch(this.handleError);
    }

    GetSession(): Promise<any> {
        return this._http.get('/api/login/GetSession')
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