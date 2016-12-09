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
    getAllSettingPT(req): Promise<Setting[]> {
        return this._http.get('/api/settingPT?so='+req)
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
    
    getOne(id,id2): Promise<Setting> {
        return this.getAllSettingPT(id2)
            .then(setting => setting.find(p => p.AppID === id))
            .catch(this.handleError);
    }
    getCount(): Promise<number> {
        return this._http.get('/api/settingcount')
            .toPromise()
            .then(response => response.json() as number)
            .catch(this.handleError);
    }
    getAppName(req,req2):Promise<Setting>{
        return this._http.get('/api/settingAppName?so='+req+'&id='+req2)
            .toPromise()
            .then(response => response.json() as Setting)
            .catch(this.handleError);
    }
    getAPI(req,req2):Promise<Setting>{
        return this._http.get('/api/settingAPI?so='+req+'&id='+req2)
            .toPromise()
            .then(response => response.json() as Setting)
            .catch(this.handleError);
    }
    getAppID():Promise<number>{
        return this._http.get('/api/settingAppID')
            .toPromise()
            .then(response => response.json() as number)
            .catch(this.handleError);
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
    private handleError(error: Error): Promise<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Promise.reject(error.message || error);
        // return Observable.throw(error.json().error || 'Server error');

    }
}