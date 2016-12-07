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
    n:number = 1;
    i:number;
    t:number;
    constructor(
        private settingservice:SettingService,
        private _router: Router,
        private _route: ActivatedRoute) {

    }
    ngOnInit(): void { 
        this.settingservice.getAppID().then(result=>this.n=result);
    }
    Create(){
        this.settingservice.getAPI(this.apikey).then(result=>this.setting1=result)
        .then(result=>this.setAppName());
        this.setting=new Setting();
        this.settingservice.getAppName(this.appname).then(result=>this.setting1=result) 
        .then(result=>this.setAPI());
        console.log(this.apikey+''+this.appname+''+this.n);
        if(this.appname==undefined||this.appname=="")
        {
            this.alertname="Chưa nhập AppName!!!!!";
            this.i++;
        }
        if(this.apikey==undefined||this.apikey=="")
        {
            this.alertapi="Chưa nhập API Key!!!!!";
            this.t++;
        }          
        if(this.i==0)
        {
            this.alertapi="";
        }
        if(this.t==0)
        {
            this.alertname="";  
        }  
        if(this.i==0&&this.t==0)
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

    setAppName(){
        if(this.setting1!=undefined)
        {
            this.alertapi="API Key đã được sử dụng!!!!";
            this.i=1;
        } 
        else
        {
            this.alertapi="";
            this.i=0;
        }
    }
    setAPI(){
        if(this.setting1!=undefined)
        {
            this.alertname="AppName đã được sử dụng!!!!";
            this.t++;
        }
        else
        {
            this.alertname="";
            this.t=0;
        }
    }
    Back() {
        this._router.navigate(['setting-list']);
    }
    
}