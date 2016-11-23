"use strict";
var io = require('socket.io-client');
var PushService = (function () {
    function PushService() {
        this.url = 'http://localhost:8000';
        this.socket = io.connect(this.url);
    }
    PushService.prototype.sendMessage = function (serverkey, token, title, message) {
        this.socket.emit('tokenpost', { serverkey: serverkey, token: token, title: title, body: message });
    };
    return PushService;
}());
exports.PushService = PushService;
