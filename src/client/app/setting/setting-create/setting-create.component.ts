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
    setting1: Setting;
    n:number;
    constructor(
        private settingservice:SettingService,
        private _router: Router,
        private _route: ActivatedRoute) {

    }
    ngOnInit(): void { 
        this.settingservice.getAppID().then(result=>this.n=result);
    }
    Create(){
        var i = 0;
        var t = 0;
        this.settingservice.getAPI(this.apikey).then(result=>this.setting1=result);
        if(this.setting1!=undefined)
        {
            this.alertapi="API Key đã được sử dụng!!!!";
            i++;
        } 
        this.setting=new Setting();
        this.settingservice.getAppName(this.appname).then(result=>this.setting1=result);
        if(this.setting1!=undefined)
        {
            this.alertname="AppName đã được sử dụng!!!!";
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
        console.log(this.apikey+''+this.appname+''+this.n);
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
        if(i==0&&t==0&&this.n!=undefined)
        {
            if(this.trangthai==undefined)
            this.trangthai=false;        
            this.ngaytao = new Date().toLocaleDateString("en-US")+'';
            this.setting={
                AppID: this.n,
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