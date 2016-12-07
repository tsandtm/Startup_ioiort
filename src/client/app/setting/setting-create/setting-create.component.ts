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
<<<<<<< HEAD
    n:number = 1;
    i:number;
    t:number;
=======
    n:number;
>>>>>>> 42cf0e3a30a038d1a26a10d04630b8666c908461
    constructor(
        private settingservice:SettingService,
        private _router: Router,
        private _route: ActivatedRoute) {

    }
    ngOnInit(): void { 
        this.settingservice.getAppID().then(result=>this.n=result);
    }
    Create(){
<<<<<<< HEAD
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
=======
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
>>>>>>> 42cf0e3a30a038d1a26a10d04630b8666c908461
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
<<<<<<< HEAD
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
=======
>>>>>>> 42cf0e3a30a038d1a26a10d04630b8666c908461
    }

    Back() {
        this._router.navigate(['setting-list']);
    }
    
}