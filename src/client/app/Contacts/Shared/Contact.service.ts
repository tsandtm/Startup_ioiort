import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Contact } from './Contact.model';

@Injectable()
export class ContactService {
    private _productUrl = 'api/products/products.json';
    constructor(private _http: Http) { }


    getContacts(PageNum: number): Promise<Contact[]> {
        return this._http.get('/api/Contact?PageNum=' + PageNum)
            .toPromise()
            .then(response => response.json() as Contact[])
            .catch(this.handleError);
    }

    getOneContact(ContactID: number): Promise<Contact> {
        return this._http.get('/api/Contact/GetOne?ContactID=' + ContactID)
            .toPromise()
            .then(response => response.json() as Contact)
            .catch(this.handleError);
    }

    updateContact(valueID: number, valueTagID: number[], valueTagName: string[]): Promise<any> {
        let params = JSON.stringify({ ContactID: valueID, Contact_TagID: valueTagID, Contact_TagName: valueTagName });
        let headers = new Headers();
        console.log('params: ' + params);
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/Contact/Update', params, {
            headers: headers,
            body: params
        })
            .toPromise()
            .then((response) => {
                return response;
            })
            .catch(this.handleError);
    }

    SearchByTag(Contact_TagName: string, PageNum: number): Promise<Contact[]> {
        return this._http.get('/api/Contact/SearchByTag?Contact_TagName=' + Contact_TagName + '&PageNum=' + PageNum)
            .toPromise()
            .then(response => response.json() as Contact[])
            .catch(this.handleError);
    }

    SearchByAccount(Account: string, PageNum: number): Promise<Contact[]> {
        return this._http.get('/api/Contact/SearchByAccount?Account=' + Account + '&PageNum=' + PageNum)
            .toPromise()
            .then(response => response.json() as Contact[])
            .catch(this.handleError);
    }

    GetPager(totalItems, currentPage, pageSize = 25) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

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
        for (var n: number = startPage; n < (endPage + 1); n++) {
            if (pages == undefined)
                pages = [1];
            else
                pages.push(n);
            // console.log(totalPages + n);
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
        console.error(error);
        return Promise.reject(error.message || error);
    }
}
