import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DanhMuc } from './danhmuc.model';

@Injectable()
export class DanhMucService {
    constructor(private _http: Http) { }

    getDanhMucs(): Promise<DanhMuc[]> {
        // return this._http.get('/api/book')
        //     .map((response: Response) => <Product[]>response.json())
        //     .do(data => console.log('All: ' + JSON.stringify(data)))
        //     .catch(this.handleError);
        return this._http.get('/api/danhmuc')
            .toPromise()
            .then(response => response.json() as DanhMuc[])
            .catch(this.handleError);
    }

    getDanhMuc(id: number): Promise<DanhMuc> {
        // return this.getProducts()
        //     .map((products: Product[]) => products.find(p => p.productId === id))
        //     .catch(this.handleError);
        return this.getDanhMucs()
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

    xoaDanhMuc(id: number): Promise<DanhMuc>{
        return this._http.delete('/api/danhmuc/' + id)
                .toPromise()
                .then(res => res.json() as DanhMuc)
                .catch(error => {
                    console.error('Error: ', error)
                    return null;
                })
    }
    // create(){
    //     Observable.forkJoin(
    //         this._http.get('/api/tintuc').toPromise()
    //         .then(response => response.json() as TinTuc[])
    //         .catch(this.handleError)
    //     )
    // }
    // editTinTuc(id:number):Promise<TinTuc>{
    //         this._http.put('/api/tintuc',JSON.stringify(id)).toPromise()
    //         .then(response=>response.json() as TinTuc[])
            
    // }
}