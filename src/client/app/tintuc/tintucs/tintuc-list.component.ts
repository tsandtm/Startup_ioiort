import { Component, OnInit } from '@angular/core';
import { TinTuc } from '../shared/tintuc.model';
import { TinTucService } from '../shared/tintuc.service';

@Component({
    templateUrl: '/tintuc/tintucs/tintuc-list.component.html',
     styleUrls: ['/tintuc/tintucs/tintuc-list.component.css']
})
export class TinTucListComponent implements OnInit {
    pageTitle: string = 'Tin Tuc';
    tintucs: TinTuc[];

    constructor(private _tintucService: TinTucService) {

    }
    ngOnInit(): void {
        this._tintucService.getTinTucs()
            .then(tintucs => {
                this.tintucs = tintucs;
                console.log(JSON.stringify(tintucs))
            })
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