/* Defines the product entity */
export class Notifi {
    NotifiID:number;
    AppID: number;
    TieuDe:string;
    Noidung:string
    Thoigiangui:string;
    ThoiHan:string;
    DoUuTien:number;
    Trangthai:number;
    Soluong:number;
    SendUser:number[];
    SendUserName:string;
    SendTag:number[];
    SendTagName:string;
    DeniedUser:number[];
    DeniedUserName:number[];
    DeniedTag:number[];
    DeniedTagName:number[];
}
export class SLSend{
    NotifiID:number;
    count:number;
}
export class SentUser{
    NotifiID:number;
    ContactID: number;
    TaiKhoan: string;
    Device: string;
    Email: string;
    FaceBook: string;
    ContactTagName:string;
}
export class UpdateData{
    NotifiID:number;
    Trangthai:number;
}
export class InsertUser{
    NotifiID:number;
    ContactID: number;
    TrangThai:number;
    ThoiGianCanGoi:string;
    LogLoi:string;
    SoLanGoi:number;
    ThoiGianDaGoi:string;
}