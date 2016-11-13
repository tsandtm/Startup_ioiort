import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Tag } from '../shared/tag.model';
import { TagService } from '../shared/tag.service';

@Component({
    templateUrl:'/tag/tag-detail/tag-detail.component.html'
})
export class TagDetailComponent {
    pageTitle: string = 'Tag Detail';
    @Input() tag: Tag;
    constructor(
        private tagservice:TagService,
        private _router: Router,
        private _route: ActivatedRoute) {

    }
  
    ngOnInit() {
        this._route.params.forEach((params: Params) => {
            console.log(params["id"]+'aaaa');
            let id = +params["id"];
            this.getTag(id);
        })
    }

    getTag(id: number) {
        this.tagservice.getOne(id)
            .then(tag => this.tag = tag)
        
    }
    Back(): void {
        this._router.navigate(['tag-list']);
    }
}