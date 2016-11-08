import {Component, OnInit,  ViewContainerRef, ViewEncapsulation } from '@angular/core';
import {NewsService} from '../shared/news.service';
import {INews} from  '../shared/news.model'
import {NewsFilter} from './news-list-filter.pipe';

import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { NewsDetailContent, CustomModal } from '../news-detail/news-detail.component';

import {WebsListComponent} from '../website/website.component'

import path = require('path');

@Component({
    selector: 'newslist',
    templateUrl:'/news/newslist/news-list.component.html',
    styleUrls: ['news/newslist/news-list.component.css'],
    providers: [Modal]
})
export class NewsListComponent implements OnInit{
    pageTitle: string = 'News List';
    imageWidth: number = 230;
    imageHeight: number = 100;
    errorMessage: string;
    listFilter: string = '';
    news: INews[];

    constructor(private _newsService: NewsService, public modal : Modal) {

    }

    ngOnInit(): void {
        //    this._newsService.getNews()
        //              .subscribe(
        //                news => this.news = news,
        //                error =>  this.errorMessage = <any>error);
           this._newsService.getNews()
                .then(nw => this.news = nw)
                .catch(errorMessage => {
                    console.error(errorMessage.message)
                })
    }
  
    btnSave():void{
        alert("Đã lưu");
    }

    btnDelete(): void{
        alert("Đã xóa");
    }

     openCustom(news) {
        return this.modal.open(CustomModal, overlayConfigFactory({ news: news },BSModalContext));
    }
  

}