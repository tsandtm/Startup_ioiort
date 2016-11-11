import { Component, Input } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { IWeb } from '../shared/website.model';
import { WebsService } from '../shared/website.service';
import { WebsFilter } from './website-add-filter.pipe';

export class AddContent extends BSModalContext {
  webs: IWeb[]; //lấy danh sách web dùng duyệt tin
  webs1: IWeb[]; //lấy danh sách web ko dùng duyệt tin
}


@Component({
  selector: 'modal-content',
  styleUrls: ['news/website-add/website-add.component.css'],
  templateUrl: '/news/website-add/website-add.component.html',

})
export class AddModal implements ModalComponent<AddContent> {
  context: AddContent;
  imageWidth: number = 24;
  imageHeight: number = 24;
  listFilter: string = '';


  constructor(public dialog: DialogRef<AddContent>, private _websService: WebsService ) {
    this.context = dialog.context;
  }

  addWeb(id: number, index) {
    this._websService.updateShow_add(id)
      .then(t => {
        if (t) {
          this.context.webs.push(this.context.webs1[index]);
          this.context.webs1.splice(index,1);
        }
      })
      .catch(errorMessage => {
        console.error(errorMessage.message)
      });
  }

  deleteWeb(id: number, index){
    this._websService.updateShow_delete(id)
      .then(t => {
        if (t) {
          this.context.webs1.push(this.context.webs[index]);
          this.context.webs.splice(index,1);
        }
      })
      .catch(errorMessage => {
        console.error(errorMessage.message)
      });
  }

  Close(): void {
    this.dialog.close();
  }

}
