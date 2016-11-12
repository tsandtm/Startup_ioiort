import { Component,OnInit,Input } from '@angular/core';
import { Tag } from '../shared/tag.model';
import { Location } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { TagService } from '../shared/tag.service';

@Component({
    templateUrl:'/tag/tag-edit/tag-edit.component.html'
})
export class TagEditComponent {
    pageTitle: string = 'Tag Create';
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
    Edit(): void{
        if(this.tag.isdefault==undefined)
            this.tag.isdefault=false;
        
        this.tagservice.Edit(this.tag).then(result=>this._router.navigate(['tag-list']));
    }
    Back(): void {
        this._router.navigate(['tag-list']);
    }
    
}