import {ModelBase} from './model.base';

export class LoaiDichVu extends ModelBase {
    KyHieu:string;
    TenGoi:string;
    HinhThuc:string
}
export class  KhachHang extends ModelBase{
    HoTen:string;
    Email:string;
    DiaChi:string;
    DienThoai:number;
    LienHe:string;
    DiDong:string;
}
export class Yeucauban extends ModelBase {
    LoaiDichVuID:number;
    KhachHangID:number;
    NgayDangTin:Date;
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
    Map_Lat: string;
    Map_Long: string;
    MoTa: string;
    ArraryDichVu:string;    
}
