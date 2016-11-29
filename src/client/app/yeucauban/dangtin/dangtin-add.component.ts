import { Component,OnInit}  from '@angular/core';
import { Router } from '@angular/router';
import { Yeucauban } from '../shared/yeucauban.model';
import { YeucaubanService } from '../shared/yeucauban.service';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
@Component({
    templateUrl: '/yeucauban/dangtin/dangtin-add.component.html',
   // styleUrls: ['/yeucauban/dangtin/dangtin-add.component.css']
   
})
export class DangTinComponent {
    pageTitle: string = ''; 
    errorMessage: string;
    yeucauban:Yeucauban[];
    LoaiDichVuID:number;
    KhachHangID:number;
   // NgayDangTin:Date;
    TieuDeTin: string;
    MatTienM2:number;
    DuongVaoM2:number;
    HuongNha: string;
    HuongBanCong: string;
    SoTang:number;
    SoPhongNgu:number;
    SoToilet:number;
    NoiThat: string;
    ArraryLinkHinh: string;
    TinhThanh: string;
    QuanHuyen: string;
    PhuongXa: string;
    DuongPho: string;
    DiaChi: string;
    Gia: number;
    DonViTinh: string;
  //  Map_Lat: string;
  //  Map_Long: string;
    MoTa: string;
   // ArraryDichVu:string;  
    constructor(private _yeucaubanService: YeucaubanService,private _router: Router ) { }

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
   

public createYeucauban(){
         let yeucauban = new Yeucauban();
               yeucauban.LoaiDichVuID = this.LoaiDichVuID;
               yeucauban.KhachHangID = this.KhachHangID;
               // yeucauban.NgayDangTin = this.NgayDangTin;
                yeucauban.TieuDeTin = this.TieuDeTin;
                yeucauban.MatTienM2 = this.MatTienM2;
                yeucauban.DuongVaoM2 = this.DuongVaoM2;
                yeucauban.HuongNha = this.HuongNha;
                yeucauban.HuongBanCong = this.HuongBanCong;
                yeucauban.SoTang = this.SoTang;
                yeucauban.SoPhongNgu = this.SoPhongNgu;
                yeucauban.SoToilet = this.SoToilet;
                yeucauban.NoiThat = this.NoiThat;
                yeucauban.ArraryLinkHinh = this.ArraryLinkHinh;
                yeucauban.TinhThanh = this.TinhThanh;
                yeucauban.QuanHuyen = this.QuanHuyen;
                yeucauban.PhuongXa = this.PhuongXa;
                yeucauban.DuongPho = this.DuongPho;
                yeucauban.DiaChi = this.DiaChi;
                yeucauban.Gia = this.Gia;
                yeucauban.DonViTinh = this.DonViTinh;
              //  yeucauban.Map_Lat = this.Map_Lat;
              //  yeucauban.Map_Long = this.Map_Long;
                yeucauban.MoTa = this.MoTa;
               // yeucauban.ArraryDichVu = this.ArraryDichVu;

                console.log('Dang tin component: ' + JSON.stringify(yeucauban))
        this._yeucaubanService.createYeucauban(yeucauban)
                    .then(result => {
                        if(result){
                            alert('thêm thành công');
                        }else{
                            alert('thêm không thành công');
                        }
                    })
                    .catch(error => console.error('Error ', error));
    }
    ngOnInit(): void {
        this._yeucaubanService.getList()
                .then(yeucauban => this.yeucauban = yeucauban)
    }
}