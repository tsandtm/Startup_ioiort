import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs/Observable';

import {LoaiTinDang} from './loaitindang.model'

@Injectable()
export class LoaiTinDangService {
    private actionUrl: string;
    private headers: Headers;
    constructor(private _http: Http) { }

    getLoaiTinDangs(): Promise<LoaiTinDang[]> {
        return this._http.get('/api/loaitindang')
            .toPromise()
            .then(response => response.json() as LoaiTinDang[])
            .catch(this.handleError);
    }

    getLoaiTinDang(id: number): Promise<LoaiTinDang> {

        return this.getLoaiTinDangs()
            .then(loaitindangs => loaitindangs.find(p => p.id === id))
            .catch(this.handleError);
    }


    public themLoaiTinDang(loaitindang: LoaiTinDang): Promise<LoaiTinDang>{
        return this._http.post('/api/loaitindang',loaitindang)
            .toPromise()
            .then(respose => loaitindang)
            .catch(error => {
                console.error('Error them ',error);
                return null;
            })
    }
    public suaLoaiTinDang(loaitindang:LoaiTinDang): Promise<LoaiTinDang>{
        return this._http.put('/api/loaitindang',loaitindang)
            .toPromise()
            .then(respose => loaitindang)
              .catch(error => {
                console.error('Error sua khong thanh cong',error);
                return null;
            })
    }
    
     xoaLoaiTinDang(id:number): Promise<LoaiTinDang>{
         return this._http.delete('/api/loaitindang?id='+id)
            .toPromise()
            .then(response => response.json() as LoaiTinDang)
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
