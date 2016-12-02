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
    appid:number;
    alert:string;
    setting1: Setting[];
    constructor(
        private settingservice:SettingService,
        private _router: Router,
        private _route: ActivatedRoute) {

    }
    ngOnInit(): void {
        this.settingservice.getAllSetting().then(setting1 => this.setting1 = setting1);
    }
    Create(){
        
        this.getSetting(this.appid);
        var i = 0;
        for(let s of this.setting1)
        {
            if(s.AppID==this.appid)
            {
                i=1;
                break;
            }            
        }
        if(i==0)
        {
            this.alert='';
            if(this.trangthai==undefined)
            this.trangthai=false;        
            this.ngaytao = new Date().toLocaleDateString()+'';
            this.setting={
                AppID: this.appid,
                APIKey: this.apikey,
                IsActive: this.trangthai,
                NgayTao: this.ngaytao,
                AppName: this.appname,
            }
            this.settingservice.Create(this.setting).then(result=>this._router.navigate(['setting-list']));
        }
        else
        {
            this.alert='AppID đã được sử dụng!!!!';
        }
    }
    getSetting(id: number) {
        this.settingservice.getOne(id)
            .then(setting => this.setting = setting)
        
    }
    Back() {
        this._router.navigate(['setting-list']);
    }
    
}