///<reference path="../reference.d.ts"/>
///<amd-dependency path="jquery"/>

import NProgress = require("NProgress");

export module util{
    export class Progress implements d.service.contract.Progress {

        static start(){
            NProgress.start();
        }

        static set(percent: number){
            NProgress.set(percent);
        }

        static done(){
            NProgress.done();
        }
    }
}