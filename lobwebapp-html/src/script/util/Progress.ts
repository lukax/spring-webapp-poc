///<reference path="../reference.d.ts"/>
///<amd-dependency path="jquery"/>

import NProgress = require("NProgress");

export module util{
    export class Progress implements d.service.contract.Progress {
        static dontStart: boolean;

        constructor(){
            NProgress.configure({ trickleRate: 0.01, trickleSpeed: 500 });
            NProgress.configure({ showSpinner: false });
        }
 
        start(){
            Progress.dontStart = false; //start fresh
            setTimeout(() => { //if nothing impedes .5s from now start the progress
                if(!Progress.dontStart)
                    NProgress.start();
            }, 300);
        }

        set(percent: number){
            NProgress.set(percent);
        }

        done(){
            Progress.dontStart = true; //finished before time, impede the start of a already running progress
            NProgress.done();
        }

    }
}