import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class PushService {
  private url = 'http://localhost:8000';  
  private socket;
  
  constructor() { this.socket=io.connect(this.url)}
  sendMessage(serverkey,token,title,message){
    this.socket.emit('tokenpost', {serverkey:serverkey,token:token,title:title,body:message});    
  }
}