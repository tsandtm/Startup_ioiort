import { Component } from '@angular/core';
import { Setting } from '../shared/setting.model';
import { Location } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { SettingService } from '../shared/setting.service';

@Component({
    templateUrl:'/setting/setting-create/setting-create.component.html',
    styleUrls: ['/setting/setting-create/setting-create.component.css']
})
export class SettingCreateComponent {
    pageTitle: string = 'Setting Create';
    appname: string;
    apikey: string;
    trangthai: boolean;
    setting: Setting;
    ngaytao: string;
    appid:number
    constructor(
        private settingservice:SettingService,
        private _router: Router,
        private _route: ActivatedRoute) {

    }
    Create(): void{
        if(this.trangthai==undefined)
            this.trangthai=false;
        this.ngaytao = new Date().toLocaleDateString();
        this.setting={
            appid: this.appid,
            apikey: this.apikey,
            trangthai: this.trangthai,
            ngaytao:this.ngaytao,
            appname: this.appname,
        }
        this.settingservice.Create(this.setting).then(result=>this._router.navigate(['setting-list']));
    }
    Back(): void {
        this._router.navigate(['setting-list']);
    }
    
}