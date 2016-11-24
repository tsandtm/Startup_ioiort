import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LoaiTinDang } from '../shared/loaitindang.model';
import { LoaiTinDangService } from '../shared/loaitindang.service';

@Component({
    templateUrl: '/loaitindangs/loaitindang-detail/loaitindang-detail.component.html'
})
export class LoaiTinDangDetailComponent implements OnInit {
    pageTitle: string = 'Loai Tin Dang Detail';
    @Input() loaitindang: LoaiTinDang;
    errorMessage: string;

    constructor(private _loaitindangService: LoaiTinDangService,
        private _router: Router,
        private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route.params.forEach((params: Params) => {
            console.log(params["id"])
            let id = +params["id"];
            this.getLoaiTinDang(id);
        })
    }

    getLoaiTinDang(id: number) {
             this._loaitindangService.getLoaiTinDang(id)
            .then(loaitindang => {
            console.log(loaitindang);
            this.loaitindang = loaitindang;
            })
    }

    onBack(): void {
        this._router.navigate(['loaitindangs']);
    }

}
