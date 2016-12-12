import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Notifications,SentContact } from '../shared/notifications.model';

@Injectable()
export class NotificationsService {
    

    constructor(private _http: Http) { }
    getList():Promise<Notifications[]>{
        return this._http.get('/api/notification')
            .toPromise()
            .then(response => response.json() as Notifications[])
            .catch(this.handleError);
    }
    getAllNotifications(): Promise<Notifications[]> {
        // return this._http.get('/api/book')
        //     .map((response: Response) => <Product[]>response.json())
        //     .do(data => console.log('All: ' + JSON.stringify(data)))
        //     .catch(this.handleError);
        return this._http.get('/api/notification')
            .toPromise()
            .then(response => response.json() as Notifications[])
            .catch(this.handleError);
            
    }
    getAllSendUser():Promise<SentContact[]>{
        return this._http.get('/api/getlistsenduser')
            .toPromise()
            .then(response => response.json() as SentContact[])
            .catch(this.handleError);
    }
    getSendUser(id:number):Promise<SentContact[]>{
        return this.getAllSendUser()
            .then(slsend => slsend.filter(p => p.NotifiID === id))
            .catch(this.handleError);
    }

    getNotifications(id: number,id2?:number): Promise<Notifications> {
        return this. getAllSettingPT(id2,null)
            .then(notifications => notifications.find(p => p.id === id))
            .catch(this.handleError);
    }
    createNotifi(id:number):Promise<Notifications>{
        return this.getList()
                .then(notifications => notifications.find(p => p.id === id))
                .catch(this.handleError);
    }

    private handleError(error: Error): Promise<any> {
        console.error(error);
        return Promise.reject(error.message || error);
        

    }
      getOne(id): Promise<Notifications> {
        return this.getAllNotifications()
            .then(products => products.find(p => p.id === id))
            .catch(this.handleError);
      }
      Edit(req): Promise<Notifications> {
        return this._http.post('/api/notificationedit',req)
            .toPromise()
            .then(response => response.json() as Notifications)
            .catch(this.handleError);
    }
    getCount(req): Promise<number> {
        return this._http.get('/api/notificationcount?so='+req)
            .toPromise()
            .then(response => response.json() as number)
            .catch(this.handleError);
    }
    getPager(totalItems: number, currentPage: number, pageSize: number = 25) {
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
                    console.log(n);
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
    
     getAllSettingPT(req,req2): Promise<Notifications[]> {
         
        return this._http.get('/api/notificationPT?so='+req+'&id='+req2)
            .toPromise()
            .then(response => response.json() as Notifications[])
            .catch(this.handleError); 
    }
    SearchByTD(TieuDe: string, PageNum: number): Promise<Notifications[]> {
        return this._http.get('/api/SearchByTD?TieuDe=' + TieuDe + '&PageNum=' + PageNum)
            .toPromise()
            .then(response => response.json() as Notifications[])
            .catch(this.handleError);
    }
    
}   