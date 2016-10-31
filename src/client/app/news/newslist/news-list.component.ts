import {Component, OnInit} from '@angular/core';
import {NewsService} from '../shared/news.service';
import {INews} from  '../shared/news.model'
import {NewsFilter} from './news-list.filter';


import path = require('path');

@Component({
    selector: 'newslist',
    templateUrl: '/news/newslist/news-list.component.html',
    styleUrls: ['/news/newslist/news-list.component.css'],
})
export class NewsListComponent implements OnInit{
    pageTitle: string = 'News List';
    imageWidth: number = 230;
    imageHeight: number = 100;
    errorMessage: string;
    listFilter: string  = '';
    news: INews[];

    constructor(private _newsService: NewsService) {

    }

    ngOnInit(): void {
        //    this._newsService.getNews()
        //              .subscribe(
        //                news => this.news = news,
        //                error =>  this.errorMessage = <any>error);
           this._newsService.getNews()
                .then(nw => {
                    this.news = nw;
                    console.log(this.news)
                })
                .catch(err => {
                    console.error(err.message)
                })
    }
  
    btnSave():void{
        alert("Đã lưu");
    }

    btnDelete(): void{
        alert("Đã xóa");
    }

}