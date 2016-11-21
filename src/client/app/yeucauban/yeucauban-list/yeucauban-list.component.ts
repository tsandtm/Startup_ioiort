import { Component,OnInit}  from '@angular/core';

import { Yeucauban } from '../shared/yeucauban.model';
import { YeucaubanService } from '../shared/yeucauban.service';


@Component({
    templateUrl: '/yeucauban/yeucauban-list/yeucauban-list.component.html',
    //styleUrls: ['yeucauban/yeucauban-list/yeucauban-list.component.css']
})
export class YeucaubanListComponent implements OnInit {
    pageTitle: string = ''; 
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;
    yeucauban:Yeucauban[];
    constructor(private _yeucaubanService: YeucaubanService) {

    }
     toggleImage(): void {
        this.showImage = !this.showImage;
     }
    ngOnInit(): void {
        this._yeucaubanService.getList()
                .then(yeucauban => this.yeucauban = yeucauban)
    }
    btnDelete(id:number,index){
        this._yeucaubanService.deletetin(id)
        .then(t => {
            if(t){
                    
                    console.log("Đã xóa");
                    this.yeucauban.splice(index,1)
                }  
        })    
        .catch(errorMessage => {
            console.error(errorMessage.message)
        });
    }
}