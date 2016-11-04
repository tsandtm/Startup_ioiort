import { Component, Input, OnDestroy } from '@angular/core';

@Component({
    selector: 'my-spinner',
    templateUrl: '/shared/spinner/spinner.component.html',
    styleUrls: ['shared/spinner/spinner.component.css']
})
export class SpinnerComponent implements OnDestroy {
    private _currentTimeOut: NodeJS.Timer;
    private _isDelayedRunning: boolean = true;

    @Input()
    public delay: number = 300;


    @Input()
    public set IsRunning(value: boolean){
        if(!value){
            this.cancelTimeout();
            this._isDelayedRunning = false;
            return;
        }

        if(this._currentTimeOut){
            return;
        }

        this._currentTimeOut = setTimeout(() => {
            this._isDelayedRunning = true;
            this.cancelTimeout();
        },this.delay);
    }

    private cancelTimeout(){
        clearTimeout(this._currentTimeOut);
        this._currentTimeOut = undefined;
    }

    ngOnDestroy(): any {
        this.cancelTimeout();
    }
}