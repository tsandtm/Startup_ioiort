import { Component,OnInit}  from '@angular/core';

import { Yeucauban } from '../shared/yeucauban.model';
import { YeucaubanService } from '../shared/yeucauban.service';


@Component({
    templateUrl: '/yeucauban/yeucauban-list/yeucauban-list.component.html',
    styleUrls: ['yeucauban/yeucauban-list/yeucauban-list.component.css']
})
export class YeucaubanListComponent {
    pageTitle: string = ''; 
    imageWidth: number = 230;
    imageHeight: number = 150;
    errorMessage: string;
    yeucauban:Yeucauban[];
    constructor(private _yeucaubanService: YeucaubanService) {

    }

    ngOnInit(): void {
        this._yeucaubanService.getList()
                .then(yeucauban => this.yeucauban = yeucauban)
    }
}