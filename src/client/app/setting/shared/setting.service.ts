import { Injectable } from '@angular/core';
import { Http, Response,Request  } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Setting } from './setting.model';

@Injectable()
export class SettingService{

    constructor(private _http: Http) { }

    getAllSetting(): Promise<Setting[]> {
        // return this._http.get('/api/book')
        //     .map((response: Response) => <Product[]>response.json())
        //     .do(data => console.log('All: ' + JSON.stringify(data)))
        //     .catch(this.handleError);
        return this._http.get('/api/setting')
            .toPromise()
            .then(response => response.json() as Setting[])
            .catch(this.handleError);
            
    }
    
    Create(req): Promise<Setting[]> {
        return this._http.post('/api/setting',req)
            .toPromise()
            .then(response => response.json() as Setting[])
            .catch(this.handleError);
    }
    Edit(req): Promise<Setting[]> {
        return this._http.post('/api/settingedit',req)
            .toPromise()
            .then(response => response.json() as Setting[])
            .catch(this.handleError);
    }
    Delete(req): Promise<Setting[]> {
        return this._http.post('/api/settingdelete',req)
            .toPromise()
            .then(response => response.json() as Setting[])
            .catch(this.handleError);
    }
    
    getOne(id): Promise<Setting> {
        return this.getAllSetting()
            .then(products => products.find(p => p.appid === id))
            .catch(this.handleError);
    }

    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages: number[];
        for(var n:number=1;n<(totalPages+1);n++)
        {
            if(pages==undefined)
                pages=[1];
            else
                pages.push(n);
            console.log(totalPages+n);
        };
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
    private handleError(error: Error): Promise<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Promise.reject(error.message || error);
        // return Observable.throw(error.json().error || 'Server error');

    }
}