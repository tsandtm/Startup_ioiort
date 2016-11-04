import {Component, Input} from '@angular/core'

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

import {INews} from  '../shared/news.model'
import {NewsService} from '../shared/news.service';


export class NewsDetailContent extends BSModalContext {
    news : INews;
}


@Component({
      selector: 'modal-content',
      styleUrls: ['news/news-detail/news-detail.component.css'],
    templateUrl:'/news/news-detail/news-detail.component.html',
       
})
export class CustomModal implements ModalComponent<NewsDetailContent> {
    context: NewsDetailContent;

    constructor(public dialog: DialogRef<NewsDetailContent>, private _newsService: NewsService) {
      this.context = dialog.context;
    }
  
    

    Close():void {
      this.dialog.close();
    }
  
  }
