import { Component,OnInit,Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Appkey } from './shared/app.model';
import { Notifi } from './shared/notifi.model';
import { Tag } from './shared/tag.model';
import { Contact } from './shared/Contact.model';
import { AppService } from './shared/app.service';
import { NotifiService } from './shared/notifi.service';
import { ContactNotifiService } from './shared/contact.service';
import { TagService } from './shared/tag.service';
@Component({
    templateUrl: '/notification-send/notification.component.html',
    providers: [AppService,NotifiService,ContactNotifiService,TagService]
})
export class NotifiSendComponent implements OnInit{
    optionsTag = {
        placeholder: "+ Tag",
        secondaryPlaceholder: "Tag",
    }
    optionsContact = {
        placeholder: "+ Contact",
        secondaryPlaceholder: "Contact",
    }
    optionsTagDenied = {
        placeholder: "+ Tag Denied",
        secondaryPlaceholder: "Tag Denied",
    }
    optionsContactDenied = {
        placeholder: "+ Contact Denied",
        secondaryPlaceholder: "Contact Denied",
    }
    //Tag
    ACTag = [];
    ACTagItem = [];
    listIDTag=[];
    Tag:Tag[];
    //Contact    
    ACContact = [];
    ACContactItem = [];
    listIDContact=[];
    Contact:Contact[];
    //TagDenied
    ACTagDenied = [];
    ACTagDeniedItem = [];
    listIDTagDenied=[];
    //ContactDenied
    ACContactDenied = [];
    ACContactDeniedItem = [];
    listIDContactDenied=[];
    //----//
    sendnow: boolean = true;
    sendlater: boolean = false;
    Apps: Appkey[];
    AppID:number=1;
    notifi:Notifi;
    notifiID:number;
    tieude:string;
    Noidung:string;
    Thoigiangui:string;
    thoiHanDV:string="Week";
    thoiHannum:number=1;
    ThoiHan:string;
    doUuTien:number=1;
    Trangthai:number=2;
            //0=Waiting
            //1=Complete
            //2=Draft
    Soluong:number;
    date:Date;
    hour:number=12;
    minute:number=0;
    loophour:number[];
    loopminute:number[];
    loopdayTH:number[];
    loophourTH:number[];
    loopminuteTH:number[];
    public pageTitle: string = 'Notification';
    constructor(private appService: AppService,
    private notifiservice:NotifiService,
    private tagservice:TagService,
    private contactservice:ContactNotifiService,
    private _router: Router,
    private _route: ActivatedRoute) {

    }
    public TagAdded(item:string) {
        var pos=item.indexOf('.');
        var num=item.slice(0,pos);
        this.listIDTag.push(parseInt(num));
    }
    public TagRemoved(item:string) {
        var pos=item.indexOf('.');
        var num=item.slice(0,pos);
        this.delPos(this.listIDTag,parseInt(num));
    }
    public ContactAdded(item:string) {
        var pos=item.indexOf('.');
        var num=item.slice(0,pos);
        this.listIDContact.push(parseInt(num));
    }
    public ContactRemoved(item:string) {
        var pos=item.indexOf('.');
        var num=item.slice(0,pos);
        this.delPos(this.listIDContact,parseInt(num));
    }
    public TagDeniedAdded(item:string) {
        var pos=item.indexOf('.');
        var num=item.slice(0,pos);
        this.listIDTagDenied.push(parseInt(num));
    }
    public TagDeniedRemoved(item:string) {
        var pos=item.indexOf('.');
        var num=item.slice(0,pos);
        this.delPos(this.listIDTagDenied,parseInt(num));
    }
    public ContactDeniedAdded(item:string) {
        var pos=item.indexOf('.');
        var num=item.slice(0,pos);
        this.listIDContactDenied.push(parseInt(num));
    }
    public ContactDeniedRemoved(item:string) {
        var pos=item.indexOf('.');
        var num=item.slice(0,pos);
        this.delPos(this.listIDContactDenied,parseInt(num));
    }
    // public TagDeniedAdded(item:string) {
    //     var pos=item.indexOf('.');
    //     var num=item.slice(0,pos);
    //     this.listIDTag.push(parseInt(num));
    // }
    // public TagDeniedRemoved(item:string) {
    //     var pos=item.indexOf('.');
    //     var num=item.slice(0,pos);
    //     this.delPos(this.listIDTag,parseInt(num));
    // }
    // public ContactDeniedAdded(item:string) {
    //     var pos=item.indexOf('.');
    //     var num=item.slice(0,pos);
    //     this.listIDContact.push(parseInt(num));
    //     console.log(this.listIDContact.toString());
    // }
    // public ContactDeniedRemoved(item:string) {
    //     var pos=item.indexOf('.');
    //     var num=item.slice(0,pos);
    //     this.delPos(this.listIDContact,parseInt(num));
    //     console.log(this.listIDContact.toString());
    // }
    delPos(ar:Array<number>,key:number){
        for(var i=0;i<=ar.length;i++){
            if(ar[i]==key){
                ar.splice(i,1);
            }
        }
    }
    loop(min,max){
        var input=[];
        for(var i=min;i<max;i++){
            input.push(i);
        }
        return input;
    }
    getNotifi() {
        this.notifiservice.getLastNotifi()
            .then(notifi => this.notifi = notifi)
    }
    getTag(){
        this.tagservice.getAllTag().then(tag=>{
            this.Tag=tag;
            this.Tag.forEach(element => {
            this.ACTagItem.push(element.TagID+'.'+element.TagNameDisplay)
        });
    });
    }
    getContact(){
        this.contactservice.getAllContact().then(contact=>{
            this.Contact=contact;
            this.Contact.forEach(element=>{
                this.ACContactItem.push(element.ContactID+'.'+element.TaiKhoan)
            });
        });
    }
    
    sendnowclick(): void {
        this.sendnow = true;
        this.sendlater=false;
    }
    sendlaterclick(): void {
        this.sendnow = false;
        this.sendlater=true;
    }
    Create(){
        this.date=new Date(this.date);
        if(this.sendnow){
            this.date=new Date();
            this.Thoigiangui=this.date.toLocaleDateString('en-US')+' '+this.date.toLocaleTimeString();      
        }
        else if(this.sendlater){
            this.Thoigiangui=this.date.toLocaleDateString('en-US')+' '+this.hour+":"+this.minute+":00";
        }
        if(this.thoiHanDV=="Week"){
            this.date.setDate(this.date.getDate()+(7*this.thoiHannum));
        }
        if(this.thoiHanDV=="Day"){
            this.date.setDate(this.date.getDate()+parseInt(this.thoiHannum.toString()));
        }
        if(this.thoiHanDV=="Hour"){
            this.date.setDate(this.date.getDate());
            this.date.setHours(this.date.getHours()+parseInt(this.thoiHannum.toString()));
        }
        if(this.thoiHanDV=="Minute"){
            this.date.setDate(this.date.getDate());
            this.date.setMinutes(this.date.getMinutes()+parseInt(this.thoiHannum.toString()));
        }
        if(this.notifi==null){
            this.notifiID=1;
        }
        else{
            this.notifiID=this.notifi.NotifiID+1;
        }
        if(this.sendlater){
            this.ThoiHan=this.date.toLocaleDateString('en-US')+' '+this.hour+":"+this.minute+":00";
        }
        else{
            this.ThoiHan=this.date.toLocaleDateString('en-US')+' '+this.date.toLocaleTimeString(); 
        }
        if(this.listIDTag.length==0 && this.listIDContact.length==0)
        {
            this.getslsenddenied({contactdenied:this.listIDContactDenied,tagdenied:this.listIDTagDenied}).then(result=>{
                this.notifi={AppID:this.AppID,
                NotifiID:this.notifiID,
                TieuDe:this.tieude,
                Noidung:this.Noidung,
                DoUuTien:this.doUuTien,
                Trangthai:this.Trangthai,
                Soluong:result,
                Thoigiangui:this.Thoigiangui,
                ThoiHan:this.ThoiHan,
                SendTag:this.listIDTag,
                SendUser:this.listIDContact,
                DeniedTag:this.listIDTagDenied,
                DeniedUser:this.listIDContactDenied};
                this.notifiservice.Create(this.notifi).then(result=>this._router.navigate(['confirm',this.notifi.NotifiID]));
            })
        }
        else{
            this.getslsend({contact:this.listIDContact,tag:this.listIDTag,contactdenied:this.listIDContactDenied,tagdenied:this.listIDTagDenied}).then(result=>{
                this.notifi={AppID:this.AppID,
                NotifiID:this.notifiID,
                TieuDe:this.tieude,
                Noidung:this.Noidung,
                DoUuTien:this.doUuTien,
                Trangthai:this.Trangthai,
                Soluong:this.Soluong,
                Thoigiangui:this.Thoigiangui,
                ThoiHan:this.ThoiHan,
                SendTag:this.listIDTag,
                SendUser:this.listIDContact,
                DeniedTag:this.listIDTagDenied,
                DeniedUser:this.listIDContactDenied};
                this.notifiservice.Create(this.notifi).then(result=>this._router.navigate(['confirm',this.notifi.NotifiID]));
            })
        }
        this.notifi={AppID:this.AppID,
        NotifiID:this.notifiID,
        TieuDe:this.tieude,
        Noidung:this.Noidung,
        DoUuTien:this.doUuTien,
        Trangthai:this.Trangthai,
        Soluong:1,
        Thoigiangui:this.Thoigiangui,
        ThoiHan:this.ThoiHan,
        SendTag:this.listIDTag,
        SendUser:this.listIDContact,
        DeniedTag:this.listIDTagDenied,
        DeniedUser:this.listIDContactDenied};
        this.notifiservice.Create(this.notifi).then(result=>this._router.navigate(['confirm',this.notifi.NotifiID]));
    }


    loadGetAll() {
        this.appService.getApp().then( (result) => this.Apps = result);
    }
    getslsend(req):Promise<number>{
        return this.notifiservice.getslsend(req).then(result=>this.Soluong=result);
    }
    getslsenddenied(req):Promise<number>{
        return this.notifiservice.getsldenied(req).then(result=>this.Soluong=result);
    }
    ngOnInit(): void {
        this.loadGetAll();
        this.getNotifi();
        this.getTag();
        this.getContact();
        this.loophour=this.loop(1,24);
        this.loopminute=this.loop(0,60);
        this.loophourTH=this.loop(5,24);
        this.loopminuteTH=this.loop(5,60);
        this.loopdayTH=this.loop(5,28);
    }
}
