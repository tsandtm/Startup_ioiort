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
        this._SettingService.getCount().then(result=>this.id=result)
        .then(result=>this.setPage(1));
        
        

    }
    setPage(page: number): void {
        if(this.id!=undefined)
        {
        console.log("abeeee"+this.id);
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this._SettingService.getPager(this.id, page);
        // get current page of items
        this._SettingService.getAllSettingPT(this.pager.startIndex).then(itempages => this.itempages = itempages);
        //.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }

    }
    Delete(s: Setting): void {
        // console.log(s.servername);
        this._SettingService.Delete(s).then(result => this._router.navigate(['setting-list']));
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