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
    listNameTag=[];
    Tag:Tag[];
    //Contact    
    ACContact = [];
    ACContactItem = [];
    listIDContact=[];
    listNameContact=[];
    Contact:Contact[];
    //TagDenied
    ACTagDenied = [];
    ACTagDeniedItem = [];
    listIDTagDenied=[];
    listNameTagDenied=[];
    //ContactDenied
    ACContactDenied = [];
    ACContactDeniedItem = [];
    listIDContactDenied=[];
    listNameContactDenied=[];
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
    today:Date;
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
        var name=item.slice(pos+1,item.length);
        this.listIDTag.push(parseInt(num));
        this.listNameTag.push(name);
    }
    public TagRemoved(item:string) {
        var pos=item.indexOf('.');
        var num=item.slice(0,pos);
        var name=item.slice(pos+1,item.length);
        this.delPos(this.listIDTag,parseInt(num));
        this.delPosstring(this.listNameTag,name);
    }
    public ContactAdded(item:string) {
        var pos=item.indexOf('.');
        var num=item.slice(0,pos);
        var name=item.slice(pos+1,item.length);
        this.listIDContact.push(parseInt(num));
        this.listNameContact.push(name);
    }
    public ContactRemoved(item:string) {
        var pos=item.indexOf('.');
        var num=item.slice(0,pos);
        var name=item.slice(pos+1,item.length);
        this.delPos(this.listIDContact,parseInt(num));
        this.delPosstring(this.listNameContact,name);
    }
    public TagDeniedAdded(item:string) {
        var pos=item.indexOf('.');
        var num=item.slice(0,pos);
        var name=item.slice(pos+1,item.length);
        this.listIDTagDenied.push(parseInt(num));
        this.listNameTagDenied.push(name);
    }
    public TagDeniedRemoved(item:string) {
        var pos=item.indexOf('.');
        var num=item.slice(0,pos);
        var name=item.slice(pos+1,item.length);
        this.delPos(this.listIDTagDenied,parseInt(num));
        this.delPosstring(this.listNameTagDenied,name);
    }
    public ContactDeniedAdded(item:string) {
        var pos=item.indexOf('.');
        var num=item.slice(0,pos);
        var name=item.slice(pos+1,item.length);
        this.listIDContactDenied.push(parseInt(num));
        this.listNameContactDenied.push(name);
    }
    public ContactDeniedRemoved(item:string) {
        var pos=item.indexOf('.');
        var num=item.slice(0,pos);
        var name=item.slice(pos+1,item.length);
        this.delPos(this.listIDContactDenied,parseInt(num));
        this.delPosstring(this.listNameContactDenied,name);
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
    delPosstring(ar:Array<string>,key:string){
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
        if(this.tieude == undefined || this.Noidung == undefined)
        {
            console.log(false);
            return false;
        }
        else{
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
                    SendTagName:this.listNameTag,
                    SendUser:this.listIDContact,
                    SendUserName:this.listNameContact,
                    DeniedTag:this.listIDTagDenied,
                    DeniedTagName:this.listNameTagDenied,
                    DeniedUser:this.listIDContactDenied,
                    DeniedUserName:this.listNameContactDenied};
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
                    Soluong:result,
                    Thoigiangui:this.Thoigiangui,
                    ThoiHan:this.ThoiHan,
                    SendTag:this.listIDTag,
                    SendTagName:this.listNameTag,
                    SendUser:this.listIDContact,
                    SendUserName:this.listNameContact,
                    DeniedTag:this.listIDTagDenied,
                    DeniedTagName:this.listNameTagDenied,
                    DeniedUser:this.listIDContactDenied,
                    DeniedUserName:this.listNameContactDenied};
                    this.notifiservice.Create(this.notifi).then(result=>this._router.navigate(['confirm',this.notifi.NotifiID]));
                })
            }
        }
        // this.notifi={AppID:this.AppID,
        // NotifiID:this.notifiID,
        // TieuDe:this.tieude,
        // Noidung:this.Noidung,
        // DoUuTien:this.doUuTien,
        // Trangthai:this.Trangthai,
        // Soluong:this.Soluong,
        // Thoigiangui:this.Thoigiangui,
        // ThoiHan:this.ThoiHan,
        // SendTag:this.listIDTag,
        // SendUser:this.listIDContact,
        // DeniedTag:this.listIDTagDenied,
        // DeniedUser:this.listIDContactDenied};
        // this.notifiservice.Create(this.notifi).then(result=>this._router.navigate(['confirm',this.notifi.NotifiID]));
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
        this.today=new Date();
        this.loophour=this.loop(1,24);
        this.loopminute=this.loop(0,60);
        this.loophourTH=this.loop(5,24);
        this.loopminuteTH=this.loop(5,60);
        this.loopdayTH=this.loop(5,28);
    }
}
