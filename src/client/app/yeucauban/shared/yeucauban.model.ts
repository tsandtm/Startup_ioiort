export class LoaiDichVu  {
    id:number;
    KyHieu:string;
    TenGoi:string;
    HinhThuc:string
}
export class  KhachHang {
    id:number;
    HoTen:string;
    Email:string;
    DiaChi:string;
    DienThoai:number;
    LienHe:string;
    DiDong:string;
}
export class Yeucauban{
    id: number;
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