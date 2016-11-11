import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//popup
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

//model
import { Contact } from '../Shared/Contact.model';
import { Tag } from '../Shared/Tag.model';

//service
import { ContactService } from '../Shared/Contact.service';
import { TagService } from '../Shared/Tag.service';


// import { Tag } from 'C:/Nodejs/notifi/Startup_ioiort/src/client/app/Tags/Shared/Tag.model';
// import { TagService } from 'C:/Nodejs/notifi/Startup_ioiort/src/client/app/Tags/Shared/Tag.service';

export class ContactModalContext extends BSModalContext {
    public ContactID: number;
}


///Contacts/Contact-list/Contact-list.component.html
@Component({
    selector: 'modal-content',
    templateUrl: 'Contacts/Contact-update/Contact-update.component.html',
    providers: [ContactService, TagService]
})


export class ModalContactUpdate implements CloseGuard, ModalComponent<ContactModalContext> {
    context: ContactModalContext;
    public wrongAnswer: boolean;
    public contact: Contact;
    public postData: string;
    public Tags: Tag[];
    public fills;

    ngOnInit() {
        this.loadGetContact();
        this.getTag().then(() => {
            for (let i = 0; i < this.Tags.length; i++) {
                for (let j = 0; j < this.contact.Contact_Tag.length; j++) {
                    if (this.Tags[i].TagID == this.contact.Contact_Tag[j]) {
                        this.Tags[i].checked = true;
                        break;
                    }
                }
            }
        });
    }

    constructor(public dialog: DialogRef<ContactModalContext>, private contactService: ContactService, private tagService: TagService, private _router: Router) {
        this.context = dialog.context;


        this.wrongAnswer = true;
        dialog.setCloseGuard(this);
    }

    loadGetContact() {
        this.getContact(this.dialog.context.ContactID)
            .then((result) => {});
    }

    getTag(): Promise<Tag[]> {
        return this.tagService.getTags()
            .then((response) => {
                this.Tags = response;
                return this.Tags;
            })
            .catch((error) => {
                console.log(error)
                return error;
            });
    }

    // ischecked(contag: number): boolean {

    //     for (let i = 0; i < this.contact.Contact_Tag.length; i++) {
    //         if (this.contact.Contact_Tag[i] == contag) {
    //             console.log(this.Tags);
    //             return true;
    //         }
    //     }
    //     console.log(this.Tags);
    //     return false;
    // }

    getContact(ContactID: number): Promise<Contact> {
        return this.contactService.getContact(ContactID)
            .then((response) => {
                this.contact = response;
                return this.contact;
            })
            .catch((error) => {
                console.log(error)
                return error;
            });
    }

    changeValueTag(valueID: number) {
        let valueTags = new Array();

        for (let i = 0; i < this.Tags.length; i++) {
            if (this.Tags[i].checked) {
                console.log(this.Tags[i].TagID);
                valueTags.push(this.Tags[i].TagID);
            }
        }

        console.log('valueTags: ' + valueTags);

        this.contactService.updateContact(valueID, valueTags)
            .subscribe(
            data => this.postData = JSON.stringify(data),
            error => alert(error),
            () => console.log('finish'));

        console.log(this.Tags);
        this.wrongAnswer = false;
        this.dialog.close();

    }

    onClose() {
        this.wrongAnswer = false;
        this.dialog.close();
        this._router.navigate(['Contacts',]);
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