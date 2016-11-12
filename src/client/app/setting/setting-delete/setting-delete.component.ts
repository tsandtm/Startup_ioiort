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
    constructor(
        private settingservice:SettingService,
        private _router: Router,
        private _route: ActivatedRoute) {
            console.log(this._route.snapshot.params['id']);
    }
    
}