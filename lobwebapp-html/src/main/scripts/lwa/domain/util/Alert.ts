///<reference path='./../../../../../../ts-definitions/moment/moment.d.ts'/>


module domain.util {

    export interface AlertBlueprint {
        type: string;
        title: string;
        content: string;
        time: Date;
    }

    export class Alert {
        public type: string;
        private _time: Date;

        constructor(type: AlertType, public title: string, public content: string) {
            this.type = AlertType[type];
        }

        get time() {
            return this._time ? this._time : (new Date());
        }
    }

    export enum AlertType {
        success,
        info,
        warning,
        danger
    }

}