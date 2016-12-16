import { Component } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Setting } from '../shared/setting.model';
import { SettingService } from '../shared/setting.service';

@Component({
    templateUrl: '/setting/setting-list/setting-list.component.html'
})
export class SettingListComponent {
    pageTitle: string = 'Setting List';
    listFilter: string;
    pager: any = {};
    itempages: Setting[];
    id:number;
    // paged items
    constructor(
        // private $confirm: AngularConfirm.IConfirmModalFactory,
        private _route: ActivatedRoute, private _router: Router,
        private _SettingService: SettingService) {

    }

    ngOnInit(): void { 
        this._SettingService.getCount(null).then(result=>this.id=result)
        .then(result=>this.setPage(null,1));
    }
    setPage(find:string,page: number): void {
        if(this.id!=undefined)
        {
        console.log("abeeee"+this.id);
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this._SettingService.getPager(this.id, page)
        // get current page of items
       
        this._SettingService.getAllSettingPT(this.pager.startIndex,find).then(itempages => this.itempages = itempages);        
        //.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }

    }
    find():void{
        //console.log(this.listFilter+" aaabbb");
        this.id=undefined;
        console.log(this.listFilter);
        this.itempages=undefined;
        this._SettingService.getCount(this.listFilter).then(result=>
        {
            this.id=result;
            this.pager = this._SettingService.getPager(this.id, 1);
            this._SettingService.getAllSettingPT(this.pager.startIndex,this.listFilter).then(itempages => this.itempages = itempages);        
            
        });
    }
    // launchConfirm = (tgtName:string = 'selected Object'): ng.IPromise<any> => {

    //         var titleText: string = 'Delete '+tgtName+' ?';

    //         return this.$confirm(
    //             <AngularConfirm.IConfirmModalData>{
    //                 text: 'Are you sure you want to delete this thing here?',
    //                 title: titleText,
    //                 ok: 'Yes',
    //                 cancel: 'No'
    //             });
    //     }
}