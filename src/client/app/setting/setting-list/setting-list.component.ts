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
    setting: Setting[];
    pager: any = {};
    itempages: Setting[];

    // paged items
    constructor(
        // private $confirm: AngularConfirm.IConfirmModalFactory,
        private _route: ActivatedRoute, private _router: Router,
        private _SettingService: SettingService) {

    }

    ngOnInit(): void {
        this._SettingService.getAllSetting().then(setting => this.setting = setting)
            .then(result => this.setPage(1));
    }
    setPage(page: number): void {
        if (this.setting != undefined) {
            if (page < 1 || page > this.pager.totalPages) {
                return;
            }
            this.pager = this._SettingService.getPager(this.setting.length, page);
            // get current page of items
            this.itempages = this.setting.slice(this.pager.startIndex, this.pager.endIndex + 1);
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