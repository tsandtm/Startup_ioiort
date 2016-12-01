import { Component, OnInit } from '@angular/core';
import { DanhMuc } from '../shared/danhmuc.model';
import { DanhMucService } from '../shared/danhmuc.service';

@Component({
    templateUrl: '/danhmuc/danhmuc-list/danhmuc-list.component.html',
   //  styleUrls: ['/tintuc/tintucs/tintuc-list.component.css']
})
export class DanhMucListComponent implements OnInit {
    pageTitle: string = 'Tin Tuc';
    danhmuc: DanhMuc[];

    constructor(private _danhmucService: DanhMucService) {

    }
    ngOnInit(): void {
        this._danhmucService.getDanhMucs()
            .then(tintucs => {
                this.danhmuc = tintucs;
                console.log(JSON.stringify(tintucs))
            })
    }
    create(){
        this._danhmucService.getDanhMucs()
    }
//   public selectedtintuc = {name: ""};

//    onItemClicked(listItem){
//       this.selectedtintuc=listItem;
//    }

//    onAddItem(listItem){
//       this.tintucs.push({name:listItem.value});
//    }

//    onDeleteItem(){
//       this.tin.splice(this.listItems.indexOf(this.selectedItem),1);
//    }
}