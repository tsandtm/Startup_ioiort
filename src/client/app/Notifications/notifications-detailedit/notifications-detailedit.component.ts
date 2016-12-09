import { Component,OnInit,Input,AfterViewInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Appkey } from './shared/app.model';
import { Notifi } from './shared/notifi.model';
import { Tag } from './shared/tag.model';
import { Contact } from './shared/Contact.model';
import { AppService } from './shared/app.service';
import { NotifiService } from './shared/notifi.service';
import { ContactService } from './shared/contact.service';
import { TagService } from './shared/tag.service';
import { NotificationsService } from '../shared/notifications.service';
import { Notifications } from '../shared/notifications.model';
@Component({
    templateUrl: 'notifications/notifications-detailedit/notifications-detailedit.component.html',
    providers: [AppService,NotifiService,ContactService,TagService]
})
export class NotificationstDetailEditComponent implements OnInit{
    @Input() notifications: Notifications;
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
    listIDTag=[];
    listNameTag=[];
    Tag:Tag[];
    //Contact    
    ACContact = [];
    listIDContact=[];
    listNameContact=[];
    Contact:Contact[];
    //TagDenied
    ACTagDenied = [];
    listIDTagDenied=[];
    listNameTagDenied=[];
    //ContactDenied
    ACContactDenied = [];
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
    date:Date;
    hour:number=12;
    minute:number=0;
    loophour:number[];
    loopminute:number[];
    loopdayTH:number[];
    loophourTH:number[];
    loopminuteTH:number[];
    public pageTitle: string = 'Notification';
    
    constructor(
    private _notificationsService: NotificationsService,
    private appService: AppService,
    private notifiservice:NotifiService,
    private tagservice:TagService,
    private contactservice:ContactService,
    private _router: Router,
    private _route: ActivatedRoute) {

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
    
    sendnowclick(): void {
        this.sendnow = true;
        this.sendlater=false;
    }
    sendlaterclick(): void {
        this.sendnow = false;
        this.sendlater=true;
    }
   


    loadGetAll() {
        this.appService.getApp().then( (result) => this.Apps = result);
    }
    ngOnInit(): void {
        this.loadGetAll();
        this.getNotifi();
        this.loophour=this.loop(1,24);
        this.loopminute=this.loop(0,60);
        this.loophourTH=this.loop(5,24);
        this.loopminuteTH=this.loop(5,60);
        this.loopdayTH=this.loop(5,28);
        this._route.params.forEach((params: Params) => {
            console.log(params["id"])
            let id = +params["id"];
            this.getNotifications(id);
        })
    }
    getNotifications(id: number) {
        
        this._notificationsService.getNotifications(id)
            .then(notifications => {
                this.notifications = notifications;
                
                this.listNameTag = notifications.Send_TagName,
                this.listNameContact = notifications.Send_UserName,
                this.listNameTagDenied = notifications.Send_TagDenieName
                this.listNameContactDenied = notifications.Send_UserDenieName,     
                this.listIDTag = notifications.Send_TagID;
                this.listIDContact = notifications.Send_UserID;
                this.listIDTagDenied = notifications.Send_TagDenieID;
                this.listIDContactDenied=notifications.Send_UserDenieID;          
                this.tieude = notifications.TieuDe;
                this.Noidung = notifications.NoiDung;
                for(var i=0;i<this.listIDTag.length;i++)
                {
                    this.ACTag.push(this.listIDTag[i]+'.'+this.listNameTag[i]);
                }
                  for(var i=0;i<this.listIDContact.length;i++)
                {
                    this.ACContact.push(this.listIDContact[i]+'.'+this.listNameContact[i]);
                }
                  for(var i=0;i<this.listIDTagDenied.length;i++)
                {
                    this.ACTagDenied.push(this.listIDTagDenied[i]+'.'+this.listNameTagDenied[i]);
                }
                  for(var i=0;i<this.listIDContactDenied.length;i++)
                {
                    this.ACContactDenied.push(this.listIDContactDenied[i]+'.'+this.listNameContactDenied[i]);
                }

                console.log(this.ACTag)
                console.log(this.ACContact)
                console.log(this.ACTagDenied)
                console.log(this.ACContactDenied)

               

            })
    }
     getslsend(req):Promise<number>{
        return this.notifiservice.getslsend(req).then(result=>this.Soluong=result);
    }
    getslsenddenied(req):Promise<number>{
        return this.notifiservice.getsldenied(req).then(result=>this.Soluong=result);
    }
    Edit(): void{     
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
        if(this.sendlater){
            this.ThoiHan=this.date.toLocaleDateString('en-US')+' '+this.hour+":"+this.minute+":00";
        }
        else{
            this.ThoiHan=this.date.toLocaleDateString('en-US')+' '+this.date.toLocaleTimeString(); 
        } 
        if(this.listIDTag.length==0 && this.listIDContact.length==0)
        {

        }
        else
        {
            
        this.getslsend({contact:this.listIDContact,tag:this.listIDTag,contactdenied:this.listIDContactDenied,tagdenied:this.listIDTagDenied}).then(result=>{
        this.notifications.AppID = this.AppID;
        this.notifications.TieuDe = this.tieude;
        this.notifications.NoiDung = this.Noidung;
        this.notifications.DoUuTien = this.doUuTien;
        this.notifications.ThoiHanToiDa = this.ThoiHan;
        this.notifications.ThoiGianGui=this.Thoigiangui;
        this.notifications.SoLuong=result;
        this.notifications.Send_TagName =this.listNameTag;
        this.notifications.Send_TagID=this.listIDTag;
        this.notifications.Send_UserName=this.listNameContact;
        this.notifications.Send_UserID=this.listIDContact;
        this.notifications.Send_TagDenieName=this.listNameTagDenied;
        this.notifications.Send_TagDenieID=this.listIDTagDenied;
        this.notifications.Send_UserDenieName=this.listNameContactDenied;
        this.notifications.Send_UserDenieID=this.listIDContactDenied;
        this._notificationsService.Edit(this.notifications).then(result=>this._router.navigate(['confirm',this.notifications.id]));
            })
    }}
    ngAfterViewInit()
    {		
        // this._route.queryParams.forEach((params: Params) => {
        //     let id = +params["id"];
        //     this.getCountContact(id).then(result=>{console.log(this.countContact)});
        // })
        // var count=this.countContact;
        jQuery(".js-data-example-ajaxTag").select2({
            placeholder:"Tag muốn gửi",
                multiple: true,
                allowClear: true, 
                tokenSeparators: [","],
                ajax: {
                    url: "/api/Tag",
                    dataType: 'json',
                    delay: 500,
                    data: function (params) {
                        return {
                            id: params.term, // search term
                            page: params.page,
                            };
                        },
                    processResults: function (data, params) {
                        // parse the results into the format expected by Select2
                        // since we are using custom formatting functions we do not need to
                        // alter the remote JSON data, except to indicate that infinite
                        // scrolling can be used
                        var i=1;
                            params.page = params.page || 0;
                            return {
                                results:
                                $.map(data, function(obj) {
                                    i+=10;
                                    return { id: obj.TagID, text: obj.TagNameDisplay };
                                }),
                                pagination: {
                                more: (params.page * 10) < i
                                }
                            };
                        },
                        cache: true
                    },
                    
                    minimumInputLength: 1,
                    escapeMarkup: function (markup) { return markup; }, 
            });
        jQuery(".js-data-example-ajaxTagDenied").select2({
            placeholder:"Tag không muốn gửi",
                multiple: true,
                allowClear: true, 
                tokenSeparators: [","],
                ajax: {
                    url: "/api/Tag",
                    dataType: 'json',
                    delay: 500,
                    data: function (params) {
                        return {
                            id: params.term, // search term
                            page: params.page,
                            };
                        },
                        processResults: function (data, params) {
                        var i=1;
                            params.page = params.page || 0;
                            return {
                                results:
                                $.map(data, function(obj) {
                                    i+=10;
                                    return { id: obj.TagID, text: obj.TagNameDisplay };
                                }),
                                pagination: {
                                more: (params.page * 10) < i
                                }
                            };
                        },
                        cache: true
                    },
                    
                    minimumInputLength: 1,
                    escapeMarkup: function (markup) { return markup; }, 
            });
            jQuery(".js-data-example-ajaxContact").select2({
            placeholder:"User muốn gửi",
                multiple: true,
                allowClear: true, 
                tokenSeparators: [","],
                ajax: {
                    url: "/api/Contactnotifi",
                    dataType: 'json',
                    delay: 500,
                    data: function (params) {
                        return {
                            id: params.term, // search term
                            page: params.page,
                            };
                        },
                        processResults: function (data, params) {
                        var i=1;
                            params.page = params.page || 0;
                            return {
                                results:
                                $.map(data, function(obj) {
                                    i+=10;
                                    return { id: obj.ContactID, text: obj.ContactID+'.'+obj.TaiKhoan };
                                }),
                                pagination: {
                                more: (params.page * 10) < i
                                }
                            };
                        },
                        cache: true
                    },
                    
                    minimumInputLength: 1,
                    escapeMarkup: function (markup) { return markup; }, 
            });
            jQuery(".js-data-example-ajaxContactDenied").select2({
            placeholder:"User không muốn gửi",
                multiple: true,
                allowClear: true, 
                tokenSeparators: [","],
                ajax: {
                    url: "/api/Contactnotifi",
                    dataType: 'json',
                    delay: 500,
                    data: function (params) {
                        return {
                            id: params.term, // search term
                            page: params.page,
                            };
                        },
                        processResults: function (data, params) {
                        var i=1;
                            params.page = params.page || 0;
                            return {
                                results:
                                $.map(data, function(obj) {
                                    i+=10;
                                    return { id: obj.ContactID, text: obj.ContactID+'.'+obj.TaiKhoan };
                                }),
                                pagination: {
                                more: (params.page * 10) < i
                                }
                            };
                        },
                        cache: true
                    },
                    
                    minimumInputLength: 1,
                    escapeMarkup: function (markup) { return markup; }, 
            });
    }
}
