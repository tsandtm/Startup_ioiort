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
    SendTag:number[];
    DeniedUser:number[];
    DeniedTag:number[];
}
export class SLSend{
    NotifiID:number;
    count:number;
}
