import { Component } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Tag } from '../../tag/shared/tag.model';
import { TagService } from '../../tag/shared/tag.service';
import { Contact } from '../shared/Contact.model';

@Component({
    templateUrl:'/contacts/contacts-list/contacts-list.component.html'
})
export class ContactsListComponent {
    pageTitle: string = 'Contacts List';
    listFilter: string;
    tags: Tag[];
    all: boolean;
    contacts: Contact[];
    tagid: number;
    tagupdate: number;
    alert: string;
	tagnamedisplay: string;
    tagnamekey: string;
	accountid: string;
    isdefault: boolean;
    constructor(
        // private $confirm: AngularConfirm.IConfirmModalFactory,
        private _route: ActivatedRoute,private _router: Router,
        private _TagService: TagService) {

    }
    toggle(): void {
        console.log('n');
        for(let contact of this.contacts)
        {
            if(this.all==undefined)
                contact.isactive=true;
            if(this.all==false)
                contact.isactive=true;
            if(this.all==true)
                contact.isactive=false;
            console.log(contact.isactive);
        }    
    }
    ngOnInit(): void {
        this._TagService.getAllTag()
                .then(tags => this.tags = tags)
        this._TagService.getAllContact()
            .then(contacts=>this.contacts=contacts)
        this.tagid = undefined;
	    this.tagnamedisplay = undefined;
        this.tagnamekey = undefined;
	    this.accountid = undefined;
        this.isdefault = undefined;
        this.all=false;
    }
    Create(): void{
        var i=0;
        for(let contact of this.contacts)
        {
            i=0;
            if(contact.isactive==true)
            {   
                if(i!=1)
                {
                    this.alert='';
                    if(this.isdefault==undefined)
                        this.isdefault=false;
                    let tag= new Tag()
                        tag.tagid = this.tagid;
                        tag.tagnamedisplay = this.tagnamedisplay;
                        tag.tagnamekey = this.tagnamekey;
                        tag.accountid = this.accountid;
                        tag.isdefault = this.isdefault;       
                    this._TagService.Create(tag);
                            
                }
                var o = 0;
                for(let a of contact.Contact_Tag)
                {
                    if(a==this.tagid)
                        o = 1;
                }
                if(o==0)
                {
                    contact.Contact_Tag.push(this.tagid)
                    this._TagService.Update(contact).then(result=>this.ngOnInit());
                }                
                i=1;
            }            
        }
        this.ngOnInit();
        if(i==0)
            this.alert='Không có User nào được chọn!!';
        this.ngOnInit();
    }
    Update(): void{
        var i=0;
        for(let contact of this.contacts)
        {
            i=0;
            if(contact.isactive==true)
            {   
                var o = 0;
                for(let a of contact.Contact_Tag)
                {
                    if(a==this.tagupdate)
                        o = 1;
                }
                if(o==0)
                {
                    this.alert='';
                    console.log(this.tagupdate);
                    contact.Contact_Tag.push(this.tagupdate)
                    this._TagService.Update(contact).then(result=>this.ngOnInit());
                }                
                i=1;
            }            
        }
        this.ngOnInit();
        if(i==0)
            this.alert='Không có User nào được chọn!!';
        this.ngOnInit();
    }
    Delete(): void{
        var t=0;
        for(let contact of this.contacts)
        {
            t=0;
            if(contact.isactive==true)
            {   
                var i = contact.Contact_Tag.indexOf(this.tagupdate);
                contact.Contact_Tag.splice(i, 1);
                this.alert='';
                console.log(contact.Contact_Tag);
                this._TagService.Update(contact).then(result=>this.ngOnInit());
                t=1;
                break;                 
            }            
        }
        this.ngOnInit();
        if(t==0)
            this.alert='Không có User nào được chọn!!';
        this.ngOnInit();
    }
    Back(): void {
        this._router.navigate(['tag-list']);
    }
}