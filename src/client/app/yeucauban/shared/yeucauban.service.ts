import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Yeucauban ,LoaiDichVu,KhachHang} from '../shared/yeucauban.model';

@Injectable()
export class YeucaubanService {
    

    constructor(private _http: Http) { }
    getLoaiDV():Promise<LoaiDichVu[]>{
        return this._http.get('/api/loaidichvu')
          
            .toPromise()
            .then(response => response.json() as LoaiDichVu[])
            .catch(this.handleError);
    }
    getList():Promise<Yeucauban[]>{
        return this._http.get('/api/yeucauban')
          
            .toPromise()
            .then(response => response.json() as Yeucauban[])
            .catch(this.handleError);
    }
    public createYeucauban(yeucauban: Yeucauban): Promise<Yeucauban>{
        return this._http.post('/api/yeucauban',yeucauban)
            .toPromise()
            .then(respose => yeucauban)
            .catch(error => {
                console.error('Error createYeucauban',error);
                return null;
            })
    }
     deletetin(id:number): Promise<Yeucauban>{
        return this._http.delete('/api/yeucauban?id='+id)
        .toPromise()
        .then(response => response.json() as Yeucauban)
        .catch(this.handleError);
    }

    private handleError(error: Error): Promise<any> {
        console.error(error);
        return Promise.reject(error.message || error);
        

    }    
}