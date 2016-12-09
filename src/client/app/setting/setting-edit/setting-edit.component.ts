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
    setting: Setting;
    alertname:string;
    alertapi:string;
    setting1:Setting;
    i:number;
    t:number;
    constructor(
        private settingservice:SettingService,
        private _router: Router,
        private _route: ActivatedRoute) {
            console.log(this._route.snapshot.params['id']);
    }
    ngOnInit():void{
        this._route.params.forEach((params: Params) => {
            console.log(params["id"]+'aaaa');
            let id = +params["id"];
            let id2= +params["id2"]-1;
            this.getSetting(id,id2);
        })
    }
    getSetting(id: number,id2:number) {
        this.settingservice.getOne(id,id2)
            .then(setting => this.setting = setting)
        
    }
    Edit(): void{
        console.log('1   '+this.setting.AppID+' '+this.setting.AppName+' '+this.setting.APIKey);
        
        this.settingservice.getAPI(this.setting.APIKey,this.setting.AppID).then(result=>{
            this.setting1=undefined;
            this.setting1=result;
            console.log('2 '+this.setting.AppID);
            this.i=0;
        })
        .then(result=>this.setAPI()).then(result=>this.setAPINull())
        .then(result=>{
        this.settingservice.getAppName(this.setting.AppName,this.setting.AppID).then(result=>{
            this.setting1=undefined;
            this.setting1=result;
            this.t=0;
        }) 
        .then(result=>this.setAppName()).then(result=>this.setAppNameNull())       
        .then(result=>{
            if(this.i==0&&this.t==0)
            {
                if(this.setting.IsActive==undefined)
                this.setting.IsActive=false;        
            this.settingservice.Edit(this.setting).then(result=>this._router.navigate(['setting-list']));
            }
        });
        });       
        
    }
    setAppNameNull(){
        if(this.setting.AppName==undefined||this.setting.AppName=="")
        {
            this.alertname="Chưa nhập AppName!!!!!";
            this.t=1;
        }
    }
    setAPINull(){
        if(this.setting.APIKey==undefined||this.setting.APIKey=="")
        {
            this.alertapi="Chưa nhập API Key!!!!!";
            this.i=1;
        }          
 
    }
    setAPI(){
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
    setAppName(){
        if(this.setting1!=undefined)
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
    Back(): void {
        this._router.navigate(['setting-list']);
    }
}