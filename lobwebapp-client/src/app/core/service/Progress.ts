///<reference path="../../reference.ts"/>

declare var NProgress:any;

module core {
  export class Progress {
    static dontStart:boolean;

    constructor() {
      NProgress.configure({ trickleRate: 0.01, trickleSpeed: 500 });
      NProgress.configure({ showSpinner: false });
    }

    start() {
      Progress.dontStart = false; //start fresh
      setTimeout(() => { //if nothing impedes .5s from now start the progress
        if (!Progress.dontStart)
          NProgress.start();
      }, 300);
    }

    set(percent:number) {
      NProgress.set(percent);
    }

    done() {
      Progress.dontStart = true; //finished before time, impede the start of a already running progress
      NProgress.done();
    }

  }
}

core.module.service("Progress", core.Progress);
