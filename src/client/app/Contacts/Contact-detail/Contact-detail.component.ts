import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { Contact } from '../shared/Contact.model';
import { ContactService } from '../shared/Contact.service';
 
@Component({
    templateUrl: '/Contacts/Contact-detail/Contact-detail.component.html',
    providers: [ContactService]
})

export class ContactDetailComponent implements OnInit {
    pageTitle: string = 'Contact detailt';
    @Input() contact: Contact;
    errorMessage: string;

    constructor(private _contactService: ContactService, private _router: Router, private _route: ActivatedRoute) {

    }

    ngOnInit() {
        this._route.params.forEach((value: Params) => {
            console.log(value["ContactID"]);
            let ContactID = value["ContactID"];
            this.getContact(ContactID); 
            console.log(Contact.length);
        })
    }

    getContact(ContactID: number) {
        this._contactService.getContact(ContactID)
            .then(response => this.contact = response);
    }

    onBack() {
        this._router.navigate(['Contacts']);
    }
}
