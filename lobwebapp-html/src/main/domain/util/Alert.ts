module domain.util{
    export class Alert{
        public type: string;
        public time: string;
        constructor(type: domain.util.AlertType, public title: string, public content: string){
            this.type = AlertType[type];
            var time = new Date();
            this.time = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
        }
    }

    export enum AlertType{
        success,
        info,
        warning,
        danger
    }
}