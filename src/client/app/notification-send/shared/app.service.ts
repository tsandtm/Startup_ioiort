import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Appkey } from './app.model';

@Injectable()
export class AppService {
    private _productUrl = 'api/products/products.json';

    constructor(private _http: Http) { }

    getApp(): Promise<Appkey[]> {
        // return this._http.get('/api/book')
        //     .map((response: Response) => <Product[]>response.json())
        //     .do(data => console.log('All: ' + JSON.stringify(data)))
        //     .catch(this.handleError);
        return this._http.get('/api/app')
            .toPromise()
            .then(response => response.json() as Appkey[])
            .catch(this.handleError);
    }
    getAppkey(id): Promise<Appkey> {
        return this.getApp()
            .then(slsend => slsend.find(p => p.AppID === id))
            .catch(this.handleError);
    }

    // getProduct(id: number): Promise<Product> {
    //     return this.getProducts()
    //         .then(products => products.find(p => p.productId === id))
    //         .catch(this.handleError);
    // }

    private handleError(error: Error): Promise<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Promise.reject(error.message || error);
        // return Observable.throw(error.json().error || 'Server error');

    }
}
