import { Component,OnInit}  from '@angular/core';

import { Notifications } from '../shared/notifications.model';
import { NotificationsService } from '../shared/notifications.service';
import { NotificationFilterPipe } from '../notifications-filter/notifications-filter.pipe';


@Component({
    templateUrl: '/notifications/notifications-list/notifications-list.component.html',
    
})
export class NotificationsListComponent {
    pageTitle: string = 'Notifications List'; 
    notifications:Notifications[];
    TieuDeFilter = "";
    listFilter1: string ='';
    itempages: Notifications[];
    id:number;
    pager:any={};
    Total: number = 0;
    constructor(private _notificationsService: NotificationsService) {

    }

    ngOnInit(): void {
        this._notificationsService.getCount(null).then(result=>this.id=result)
        .then(result=>{
        this._notificationsService.getAllSettingPT(0,null)
            .then((result) => {
                this.notifications = result;
                this.Total = this.notifications[0].Total;
                return this.notifications;
            })
            .then((result) => {
                this.setPage(null,1);
            })
        });
    }
    setPage(find:string,page: number): void {
    if(this.id!=undefined)
    {
        console.log("abeeee"+this.id);
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this._notificationsService.getPager(this.id, page);

        // get current page of items
        this._notificationsService.getAllSettingPT(this.pager.startIndex,find).then(itempages => this.notifications = itempages);
        //.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }
    }
    find():void{
        //console.log(this.listFilter+" aaabbb");
        this.itempages=undefined;
        this._notificationsService.getCount(this.listFilter1).then(result=>
        {
            this.id=result;
            this.setPage(this.listFilter1,1);
            this._notificationsService.getAllSettingPT(this.pager.startIndex,this.listFilter1).then(itempages => this.notifications = itempages);        
            
        });
    }
}