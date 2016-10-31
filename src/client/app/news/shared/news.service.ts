import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { INews } from './news.model';

@Injectable()
export class NewsService {
    private _newsUrl = 'api/json/news.json';

    constructor(private _http: Http) { }

    getNews(): Promise<INews[]> {
        // return this._http.get(this._newsUrl)
        //     .map((response: Response) => <INews[]> response.json())
        //     .do(data => console.log('All: ' +  JSON.stringify(data)))
        //     .catch(this.handleError);
         return this._http.get('/api/news')
            .toPromise()
            .then(response => response.json() as INews[])
            .catch(this.handleError);
    }

    // getNewsSearch(mes: string ): Observable<INews[]> {
    //     return this._http.get(this._newsUrl)
    //         .map((response: Response) => <INews[]> response.json().find())
            
    //         .do(data => console.log('All: ' +  JSON.stringify(data)))
    //         .catch(this.handleError);
    // }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
