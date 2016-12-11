import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//popup
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

//model
import { Tag } from '../Shared/Tag.model';

//service
import { TagService } from '../Shared/Tag.service';

export class TagModalContext extends BSModalContext {
    public AccountID: string;
}

@Component({
    selector: 'modal-content',
    templateUrl: 'Contacts/Tag-create/Tag-create.component.html',
    providers: [TagService]
})


export class ModalTagCreate implements CloseGuard, ModalComponent<TagModalContext> {
    context: TagModalContext;
    public wrongAnswer: boolean;
    TagDisplayName: string = "";
    IsDefault: boolean = false;

    ngOnInit() {

    }

    constructor(public dialog: DialogRef<TagModalContext>, private tagService: TagService, private _router: Router) {
        this.context = dialog.context;
        this.wrongAnswer = true;
        dialog.setCloseGuard(this);
    }

    Save() {
        if(this.TagDisplayName.trim() == ""){
            return;
        }
        console.log("TagDisplayName: " + this.TagDisplayName + " - IsDefault: " + this.IsDefault);
        this.tagService.CreateTag(this.TagDisplayName, this.dialog.context.AccountID,this.IsDefault)
            .then((result) => {
                this.wrongAnswer = false;
                this.dialog.close("ok");
            })
            .catch((err) => {
                alert(err);
            })
    }

    onClose() {
        this.wrongAnswer = false;
        this.dialog.close();
    }

    onKeyUp(value) {
        this.wrongAnswer = value != 5;
        this.dialog.close();
    }

    beforeDismiss(): boolean {
        return true;
    }

    beforeClose(): boolean {
        return this.wrongAnswer;
    }

}