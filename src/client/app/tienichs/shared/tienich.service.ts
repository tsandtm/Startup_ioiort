import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs/Observable';

import {TienIch} from './tienich.model'

@Injectable()
export class TienIchService {
    // private _productUrl = 'api/products/products.json';
    private actionUrl: string;
    private headers: Headers;
    constructor(private _http: Http) { }

    getTienIchs(): Promise<TienIch[]> {
        // return this._http.get('/api/book')
        //     .map((response: Response) => <Product[]>response.json())
        //     .do(data => console.log('All: ' + JSON.stringify(data)))
        //     .catch(this.handleError);
        return this._http.get('/api/tienich')
            .toPromise()
            .then(response => response.json() as TienIch[])
            .catch(this.handleError);
    }

    getTienIch(id: number): Promise<TienIch> {
        // return this.getProducts()
        //     .map((products: Product[]) => products.find(p => p.productId === id))
        //     .catch(this.handleError);
        return this.getTienIchs()
            .then(tienichs => tienichs.find(p => p.TienIchID === id))
            .catch(this.handleError);
    }
    private handleError(error: Error): Promise<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Promise.reject(error.message || error);
        // return Observable.throw(error.json().error || 'Server error');

    }

    public themTienIch(tienich: TienIch): Promise<TienIch>{
        return this._http.post('/api/tienich',tienich)
            .toPromise()
            .then(respose => tienich)
            .catch(error => {
                console.error('Error themtienich',error);
                return null;
            })
    }
    
    // public Add = (TienIchID: number, KyHieu: string, TenGoi:string, BieuTuong: string): Observable<TienIch> => {
    //     let toAdd = JSON.stringify({ Ma: TienIchID,
    //                                  KyHieu: KyHieu,
    //                                  TenGoi: TenGoi,
    //                                  BieuTuong: BieuTuong});
 
    //     return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
    //         .map((response: Response) => <TienIch>response.json())
    //         .catch(this.handleError);
    // }
 
    // public Update = (id: number, itemToUpdate: TienIch): Observable<TienIch> => {
    //     return this._http.put(this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: this.headers })
    //         .map((response: Response) => <TienIch>response.json())
    //         .catch(this.handleError);
    // }
 
    // public Delete = (id: number): Observable<Response> => {
    //     return this._http.delete(this.actionUrl + id)
    //         .catch(this.handleError);
    // }
}
