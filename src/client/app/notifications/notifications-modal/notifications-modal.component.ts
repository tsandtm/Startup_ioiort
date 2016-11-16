import {Component} from '@angular/core';

import {DialogRef,ModalComponent,CloseGuard} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';

export class NotificationsModalContext extends BSModalContext{
    public num1:number;
    public num2:number;
}

@Component({
    selector: 'modal-content',
   // styleUrls: ['/notifications/notifications-modal/themodal.css'],
    templateUrl: '/notifications/notifications-modal/themodal.html'
})
export class CustomModal implements CloseGuard, ModalComponent<NotificationsModalContext>{
    context: NotificationsModalContext;

    public wrongAnswer: boolean;

    constructor(public dialog: DialogRef<NotificationsModalContext>){
        this.context = dialog.context;
        this.wrongAnswer = true;
        dialog.setCloseGuard(this);
    }

    onKeyUp(value){
        this.wrongAnswer = value != 5;
        this.dialog.close();
    }

    beforeDismiss(): boolean{
        return true;
    }

    beforeClose(): boolean{
        return this.wrongAnswer;
    }
}