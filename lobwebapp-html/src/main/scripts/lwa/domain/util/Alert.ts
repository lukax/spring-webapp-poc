///<reference path='../../../../../../ts-definitions/moment/moment.d.ts'/>

import moment = require('moment');

export class Alert {
    public type: string;
    public time: string;
    constructor(type: AlertType, public title: string, public content: string) {
        this.type = AlertType[type];
        this.time = moment().format('h:mm:ss a');
    }
}

export enum AlertType {
    success,
    info,
    warning,
    danger
}