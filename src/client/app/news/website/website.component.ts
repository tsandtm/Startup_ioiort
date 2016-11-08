import {Component, OnInit,  ViewContainerRef, ViewEncapsulation } from '@angular/core';

import {WebsService} from '../shared/website.service';
import {IWeb} from  '../shared/website.model'

import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AddContent, AddModal } from '../website-add/website-add.component';

import path = require('path');

@Component({
    selector: 'web-list',
    templateUrl:'/news/website/website.component.html',
    styleUrls: ['news/website/website.component.css'],
    providers: [Modal]
})
export class WebsListComponent implements OnInit{
    imageWidth: number = 24;
    imageHeight: number = 24;
    errorMessage: string;
    webs: IWeb[];
    webs1: IWeb[];

    constructor(private _webService: WebsService, public modal : Modal) {

    }

    ngOnInit(): void {
           this._webService.getListWebs() //lấy danh sách web dùng duyệt tin
                .then(web => this.webs = web)
                .catch(errorMessage => {
                    console.error(errorMessage.message)
                });
            this._webService.getWebs() //lấy danh sách web ko dùng duyệt tin
                .then(web => this.webs1 = web)
                .catch(errorMessage => {
                    console.error(errorMessage.message)
                });

    }

     openCustom() {
        return this.modal.open(AddModal, 
        overlayConfigFactory({ webs: this.webs, webs1 : this.webs1 },BSModalContext));
    }


}