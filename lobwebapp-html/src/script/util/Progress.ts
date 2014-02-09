///<reference path="../reference.d.ts"/>
///<amd-dependency path="jquery"/>

import NProgress = require("NProgress");

export module util{
    export class Progress implements d.service.contract.Progress {

        static firstStart: boolean = true;
        static alreadyStarted: any = false;
        static callDone: any = false;

        static delayedProgress(){
            if(Progress.firstStart) { 
                NProgress.start(); 
                Progress.firstStart = false;
            }
            else if(Progress.alreadyStarted && ((new Date().getTime() - Progress.alreadyStarted) > 300)) {
                NProgress.start();
                
                if(Progress.callDone){
                    Progress.callDone = false;
                    NProgress.done();
                    return;
                }
            }

            setTimeout(() => {
                Progress.delayedProgress();
            }, 100);
        }

            
        static start(){
            if(!Progress.alreadyStarted){
                Progress.alreadyStarted = new Date().getTime();
                Progress.delayedProgress();
            }
        }

        static set(percent: number){
            NProgress.set(percent);
        }

        static done(){
            Progress.callDone = true;
        }
    }
}