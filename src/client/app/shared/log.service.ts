import { Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import * as path from 'path';
let api = require(path.join('src','config','api.json'));

@Injectable()
export class LogService {

    constructor(private http: Http) {

    }

    /**
     * log error den csdl
     */
    public logError(error: Error, platform: string, ungdung: string) {
        let body = new URLSearchParams();
        body.set("TextLog", JSON.stringify(error || error.message));
        body.set('Platform', platform);
        body.set('TieuDeLog', 'Error');
        body.set('UngDung', ungdung);
        this.http.post(api.logging,body)
            .toPromise()
            .then(result => {
                console.log('log thanh cong')
            })
            .catch(error => {
                console.log('loi khi log');
                console.log(error)
            })
    }
}