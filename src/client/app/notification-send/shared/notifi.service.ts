import { Injectable } from '@angular/core';
import { Http, Response,Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Notifi,SentUser,UpdateData,InsertUser } from './notifi.model';

@Injectable()
export class NotifiService {
    private _productUrl = 'api/products/products.json';

    constructor(private _http: Http) { }

    Create(req): Promise<Notifi[]> {
        return this._http.post('/api/notifi',req)
            .toPromise()
            .then(response => response.json() as Notifi[])
            .catch(this.handleError);
    }
    Update(req):Promise<UpdateData>{
        return this._http.post('/api/notifigetone',req)
            .toPromise()
            .then(response => response.json() as UpdateData)
            .catch(this.handleError);
    }
    Insert(req): Promise<InsertUser> {
        return this._http.post('/api/sentuser',req)
            .toPromise()
            .then(response => response.json() as InsertUser)
            .catch(this.handleError);
    }

    getslsend(req): Promise<number> {
        return this._http.post('/api/sl',req)
            .toPromise()
            .then(response => response.json() as number)
            .catch(this.handleError);
    }

    getLastNotifi(): Promise<Notifi> {
        return this._http.get('/api/notifi')
            .toPromise()
            .then(response => response.json() as Notifi)
            .catch(this.handleError);
    }
    getAllNoti(): Promise<Notifi[]> {
        return this._http.get('/api/notifigetone')
            .toPromise()
            .then(response => response.json() as Notifi[])
            .catch(this.handleError);
    }

    getOne(id): Promise<Notifi> {
        return this.getAllNoti()
            .then(products => products.find(p => p.NotifiID === id))
            .catch(this.handleError);
    }

    getSL(req,req2):Promise<number>{
        return this._http.get('/api/sl?id='+req+'&tk='+req2)
            .toPromise()
            .then(response => response.json() as number)
            .catch(this.handleError);
    }

    getSendUser(req,req2,req3):Promise<SentUser[]>{
        return this._http.get('/api/sentuser?id='+req+'&so='+req2+'&tk='+req3)
            .toPromise()
            .then(response => response.json() as SentUser[])
            .catch(this.handleError);
    }
    private handleError(error: Error): Promise<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Promise.reject(error.message || error);
        // return Observable.throw(error.json().error || 'Server error');

    }
    getPager(totalItems: number, currentPage: number, pageSize: number = 15) {
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
        if(currentPage<=3)
        {
            if(totalPages<5)
            {
                for(var n:number=1;n<=totalPages;n++)
                {
                    if(pages==undefined)
                        pages=[n];
                    else
                        pages.push(n);
                    
                };
            }
            else
            {
                for(var n:number=1;n<=5;n++)
                {
                    if(pages==undefined)
                        pages=[n];
                    else
                        pages.push(n);
                    
                };
            }
        }
        else if(currentPage>=(totalPages-2))
        {
            for(var n:number=(totalPages-4);n<=totalPages;n++)
            {
                if(pages==undefined)
                    pages=[n];
                else
                    pages.push(n);
                
            };
        }
        else
        {
            for(var n:number=currentPage-2;n<(currentPage+3);n++)
            {
                if(pages==undefined)
                    pages=[n];
                else
                    pages.push(n);
                
            };
        }
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
}
