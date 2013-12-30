///<reference path="./../reference.d.ts"/>
///<amd-dependency path="jquery"/>

import NProgress = require("NProgress");

export module util{
    export class Progress implements d.service.contract.Progress {
        static cfg: boolean = false;

        public static start(){
            NProgress.start();
        }

        public static set(percent: number){
            NProgress.set(percent);
        }

        public static done(){
            NProgress.done();
        }
    }
}