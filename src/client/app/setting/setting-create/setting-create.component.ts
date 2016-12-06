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
    alertname:string;
    alertapi:string;
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
        var i = 0;
        var n = 1;
        var t = 0;
        for(let s of this.setting1)
        {        
            if(this.apikey==s.APIKey&&i==0)
            {
                 this.alertapi="API Key đã được sử dụng!!!!";
                 i++;
            }
            if(this.appname==s.AppName&&t==0)
            {
                this.alertname="AppName đã được sử dụng!!!!";
                t++;
            }
            n=s.AppID+1;
        }
        if(i==0)
        {
            this.alertapi="";
        }
        if(t==0)
        {
            this.alertname="";  
        }
        console.log(this.apikey+''+this.appname+''+n);
        if(this.appname==undefined||this.appname=="")
        {
            this.alertname="Chưa nhập AppName!!!!!";
            i++;
        }
        if(this.apikey==undefined||this.apikey=="")
        {
            this.alertapi="Chưa nhập API Key!!!!!";
            t++;
        }          
        if(i==0)
        {
            this.alertapi="";
        }
        if(t==0)
        {
            this.alertname="";  
        }      
        if(i==0&&t==0)
        {
            if(this.trangthai==undefined)
            this.trangthai=false;        
            this.ngaytao = new Date().toLocaleDateString("en-US")+'';
            this.setting={
                AppID: n,
                APIKey: this.apikey,
                IsActive: this.trangthai,
                NgayTao: this.ngaytao,
                AppName: this.appname,
            }
            this.alertapi="";
            this.alertname="";
            this.settingservice.Create(this.setting).then(result=>this._router.navigate(['setting-list']));

        }
    }

    Back() {
        this._router.navigate(['setting-list']);
    }
    
}