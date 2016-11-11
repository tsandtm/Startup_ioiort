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

    // ngOnInit(): void {
    //     this.loadGetContact();
    // }

    constructor(public dialog: DialogRef<ContactModalContext>, private contactService: ContactService, private tagService: TagService, private _router: Router) {
        this.context = dialog.context;
        this.loadGetContact();
        this.getTag();
        this.wrongAnswer = true;
        dialog.setCloseGuard(this);
    }

    loadGetContact() {
        this.getContact(this.dialog.context.ContactID)
            .then((result) => {
                console.log('contact:' + this.contact);
            });
    }

    getTag() {
        this.tagService.getTags()
            .then((response) => {
                this.Tags = response;
            })
            .catch((error) => {
                console.log(error)
            });
    }

    ischecked(contag: number): boolean {
        for (let i = 0; i < this.contact.Contact_Tag.length; i++) {
            if(this.contact.Contact_Tag[i] == contag) {
                return true;
            }
        }
        return false;
    }

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

    changeValueTag(valueID, valueTag) {
        this.contactService.updateContact(valueID, parseInt(valueTag, 10))
            .subscribe(
            data => this.postData = JSON.stringify(data),
            error => alert(error),
            () => console.log('finish'));
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