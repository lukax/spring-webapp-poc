module domain.util{
    export class Alert{
        public type: string;
        constructor(type: domain.util.AlertType, public title: string, public content: string){
            this.type = AlertType[type];
        }
    }

    export enum AlertType{
        success,
        info,
        warning,
        danger
    }
}