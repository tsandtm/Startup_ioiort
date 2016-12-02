

export class Notifications{
    id:number;
    AppID:number;
    TieuDe: string;
    NoiDung: string;
    ThoiGianGui:string;
    ThoiHanToiDa:Date;
    DoUuTien: number;
    TrangThaiGoi: number;
    SoLuong: number;
    Send_TagName:string[];
    Send_UserName:string[];
    Send_UserDenieName:string[];
    Send_TagDenieName:string[];
    Send_TagID:number[];
    Send_UserID:number[];
    Send_UserDenieID:number[];
    Send_TagDenieID:number[];
}
export class SentContact {
    ContactID:number;
    NotifiID:number;
    TrangThai:number;
    ThoiGianCanGoi:Date;
    LogLoi:string;
    SoLanGoi:number;
    ThoiGianDaGoi:Date;
}