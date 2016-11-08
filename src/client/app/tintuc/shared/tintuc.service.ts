import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { TinTuc } from './tintuc.model';

@Injectable()
export class TinTucService {
    constructor(private _http: Http) { }

    getTinTucs(): Promise<TinTuc[]> {
        // return this._http.get('/api/book')
        //     .map((response: Response) => <Product[]>response.json())
        //     .do(data => console.log('All: ' + JSON.stringify(data)))
        //     .catch(this.handleError);
        return this._http.get('/api/tintuc')
            .toPromise()
            .then(response => response.json() as TinTuc[])
            .catch(this.handleError);
    }

    getTinTuc(id: number): Promise<TinTuc> {
        // return this.getProducts()
        //     .map((products: Product[]) => products.find(p => p.productId === id))
        //     .catch(this.handleError);
        return this.getTinTucs()
            .then(tintuc => {
                let tin = tintuc.find(t => +t.id === id);
                console.log(tin);
                return tin;
            })
            .catch(this.handleError);
    }
    private handleError(error: Error): Promise<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Promise.reject(error.message || error);
        // return Observable.throw(error.json().error || 'Server error');

    }

    xoaTinTuc(id: number): Promise<TinTuc>{
        return this._http.delete('/api/tintuc/' + id)
                .toPromise()
                .then(res => res.json() as TinTuc)
                .catch(error => {
                    console.error('Error: ', error)
                    return null;
                })
    }
}
