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
<<<<<<< HEAD
    Create(){
        
        
        this.settingservice.getAPI(this.apikey).then(result=>{
=======
    Create(){  
        this.settingservice.getAPI(this.apikey,null).then(result=>{
>>>>>>> 712b384bbbf0fe0be44b2cec73809af5953b5e32
            this.setting=undefined;
            this.setting=result;
            this.i=0;
        })
        .then(result=>this.setAPI()).then(result=>this.setAPINull())
        .then(result=>{
<<<<<<< HEAD
        this.settingservice.getAppName(this.appname).then(result=>{
=======
        this.settingservice.getAppName(this.appname,null).then(result=>{
>>>>>>> 712b384bbbf0fe0be44b2cec73809af5953b5e32
            this.setting=undefined;
            this.setting=result;
            this.t=0;
        }) 
        .then(result=>this.setAppName()).then(result=>this.setAppNameNull())       
        .then(result=>{
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
            this.settingservice.Create(this.setting).then(result=>this._router.navigate(['setting-list']));
            }
        });
        });
    }
    setAppNameNull(){
        if(this.appname==undefined||this.appname=="")
        {
            this.alertname="Chưa nhập AppName!!!!!";
            this.t=1;
        }
    }
    setAPINull(){
        if(this.apikey==undefined||this.apikey=="")
        {
            this.alertapi="Chưa nhập API Key!!!!!";
            this.i=1;
        }          
 
    }
    setAPI(){
        if(this.setting!=undefined)
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
    setAppName(){
        if(this.setting!=undefined)
        {
            this.alertname="AppName đã được sử dụng!!!!";
            this.t=1;
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