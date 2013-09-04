///<reference path='../../../../ts-definitions/DefinitelyTyped/moment/moment.d.ts'/>

module domain.util{
    export class Alert{
        public type: string;
        public time: string;
        constructor(type: domain.util.AlertType, public title: string, public content: string){
            this.type = AlertType[type];
            this.time = moment().format('h:mm:ss a')    
       }
    }

    export enum AlertType{
        success,
        info,
        warning,
        danger
    }
}