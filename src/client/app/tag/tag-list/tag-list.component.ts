import { Component } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Tag } from '../shared/tag.model';
import { TagService } from '../shared/tag.service';

@Component({
    templateUrl:'/tag/tag-list/tag-list.component.html'
})
export class TagListComponent {
    pageTitle: string = 'Setting List';
    
    tags: Tag[];
     static $inject = [
            '$confirm'
        ];
    constructor(
        // private $confirm: AngularConfirm.IConfirmModalFactory,
        private _route: ActivatedRoute,private _router: Router,
        private _TagService: TagService) {

    }

    ngOnInit(): void {
        this._TagService.getAllTag()
                .then(tags => this.tags = tags)
    }
    
    // launchConfirm = (tgtName:string = 'selected Object'): ng.IPromise<any> => {
 
    //         var titleText: string = 'Delete '+tgtName+' ?';
 
    //         return this.$confirm(
    //             <AngularConfirm.IConfirmModalData>{
    //                 text: 'Are you sure you want to delete this thing here?',
    //                 title: titleText,
    //                 ok: 'Yes',
    //                 cancel: 'No'
    //             });
    //     }
    Edit(s:Tag):void{
        //console.log(s.tagid);
        this._router.navigate(['tag-edit',s.tagid]);
    }
    Detail(s:Tag):void{
        //console.log(s.tagid);
        this._router.navigate(['tag-detail',s.tagid]);
    }
    Detele(s:Tag):void{
        //console.log(s.tagid);
        this._router.navigate(['tag-delete',s.tagid]);
    }
}