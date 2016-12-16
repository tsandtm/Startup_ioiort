import { Component } from '@angular/core';
import { Setting } from '../shared/setting.model';
import { Location } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { SettingService } from '../shared/setting.service';

@Component({
    templateUrl:'/setting/setting-delete/setting-delete.component.html'
})
export class SettingDeleteComponent {
    pageTitle: string = 'Setting Delete';
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
            let id2= +params["id2"]-1;
            this.getSetting(id,id2);
        })
    }
    getSetting(id: number,id2:number) {
        this.settingservice.getOne(id,id2)
            .then(setting => this.setting = setting)
        
    }
    Delete(): void{
        this.settingservice.Delete(this.setting).then(result=>this._router.navigate(['setting-list']));
    }
    Back(): void {
        this._router.navigate(['setting-list']);
    }
    
}