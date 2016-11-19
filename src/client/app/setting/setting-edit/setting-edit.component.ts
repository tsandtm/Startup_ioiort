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
            this.getSetting(id);
        })
    }
    getSetting(id: number) {
        this.settingservice.getOne(id)
            .then(setting => this.setting = setting)
        
    }
    Edit(): void{
        if(this.setting.trangthai==undefined)
            this.setting.trangthai=false;        
        this.settingservice.Edit(this.setting).then(result=>this._router.navigate(['setting-list']));
    }
    Back(): void {
        this._router.navigate(['setting-list']);
    }
}