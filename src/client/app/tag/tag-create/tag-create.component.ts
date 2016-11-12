import { Component } from '@angular/core';
import { Tag } from '../shared/tag.model';
import { Location } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { TagService } from '../shared/tag.service';

@Component({
    templateUrl:'/tag/tag-create/tag-create.component.html'
})
export class TagCreateComponent {
    pageTitle: string = 'Tag Create';
    tagid: number;
	tagnamedisplay: string;
    tagnamekey: string;
	accountid: string;
    isdefault: boolean;
    tag: Tag;
    constructor(
        private tagservice:TagService,
        private _router: Router,
        private _route: ActivatedRoute) {

    }
    Create(): void{
        if(this.isdefault==undefined)
            this.isdefault=false;
        this.tag={
            tagid: this.tagid,
            tagnamedisplay: this.tagnamedisplay,
            tagnamekey: this.tagnamekey,
            accountid: this.accountid,
            isdefault: this.isdefault
        }
        this.tagservice.Create(this.tag).then(result=>this._router.navigate(['tag-list']));
    }
    Back(): void {
        this._router.navigate(['tag-list']);
    }
    
}