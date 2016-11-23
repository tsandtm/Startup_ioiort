import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { IWeb } from './website.model';

@Injectable()
export class WebsService {
    // private _newsUrl = 'api/json/news.json';

    constructor(private _http: Http) { }

    getWebs(): Promise<IWeb[]> {
         return this._http.get('/api/website')
            .toPromise()
            .then(response => response.json() as IWeb[])
            .catch(this.handleError);
    }

    getListWebs(): Promise<IWeb[]> {
         return this._http.get('/api/website')
            .toPromise()
            .then(response => response.json() as IWeb[])
            .catch(this.handleError);
    }

     getWeb(id: number): Promise<IWeb> {
        return this.getWebs()
            .then(inew => inew.find(p => p.IDDanhMucSite === id))
            .catch(this.handleError);
    }

    //Them website duyet tin
    updateShow_add(id:number): Promise<IWeb>{
        return this._http.put('/api/website?id=' + id,{show: true})
        .toPromise()
        .then(response => response.json() as IWeb)
         .catch(this.handleError);
    }
    //Xoa website duyet tin
    updateShow_delete(id:number): Promise<IWeb>{
        return this._http.put('/api/website?id=' + id,{show: false})
        .toPromise()
        .then(response => response.json() as IWeb)
         .catch(this.handleError);
    }

    private handleError(error: Error): Promise<any> {
        console.error(error);
        return Promise.reject(error.message || error);
    }
}
