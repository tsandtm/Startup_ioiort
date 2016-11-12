import { Component } from '@angular/core';
import { Setting } from '../shared/setting.model';
import { Location } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { SettingService } from '../shared/setting.service';

@Component({
    templateUrl:'/setting/setting-edit/setting-edit.component.html'
})
export class SettingEditComponent {
    pageTitle: string = 'Setting Edit';
    servername: string;
    apikey: string;
    trangthai: boolean;
    setting: Setting;
    constructor(
        private settingservice:SettingService,
        private _router: Router,
        private _route: ActivatedRoute) {
            console.log(this._route.snapshot.params['id']);
    }
    Edit(): void{
        // if(this.trangthai==undefined)
        //     this.trangthai=false;
        // this.setting={
        //     servername: this.servername,
        //     apikey: this.apikey,
        //     trangthai: this.trangthai
        // }
        this.settingservice.Create(this.setting).then(result=>this._router.navigate(['setting-list']));
    }
    Back(): void {
        this._router.navigate(['setting-list']);
    }
}