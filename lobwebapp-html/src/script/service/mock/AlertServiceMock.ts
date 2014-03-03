///<reference path="../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");

export module service.mock {
    export class AlertServiceMock implements d.service.contract.AlertService {
        private alerts: domain.util.Alert[];

        static $inject = ['$timeout'];
        constructor(public $timeout: ng.ITimeoutService) {
            this.alerts = [];
            this.continuouslyRemoveOld();
        }

        add(alert: domain.util.Alert) {
            if (!alert.date) alert.date = new Date();
            if (!alert.type) alert.type = enums.AlertType.OK;
            this.alerts.push(alert);
            return alert;
        }

        addMessageResponse(messageResponse: domain.util.MessageResponse, title: string) {
            var alert: domain.util.Alert = { content: messageResponse.message, title: title, type: enums.AlertType.DANGER, date: new Date() }
            if((<domain.util.ValidationMessageResponse>messageResponse).validations)
                (<domain.util.ValidationMessageResponse>messageResponse).validations.forEach((x) => {
                    alert.content += ", " + x.message;
                    });
            this.alerts.push(alert);
            return alert;
        }

        remove(alert: domain.util.Alert) {
            this.alerts.some((currAlert, index) => {
                if (alert === currAlert) {
                    this.alerts.splice(index, 1);
                    return true;
                }
                return false;
                });
        }

        removeFirst(){
            this.alerts.splice(0, 1);
        }

        list() {
            return this.alerts;
        }

        private continuouslyRemoveOld() {
            this.$timeout(() => {
                if (this.alerts.length >= 3) {
                    this.removeFirst();
                }
                this.alerts.forEach((currAlert, index) => {
                    var diffInSecs = Math.abs((new Date().getTime() - currAlert.date.getTime()) / 1000);
                    if (diffInSecs > 10) {
                        if(currAlert.type != enums.AlertType.DANGER)
                            this.alerts.splice(index, 1);
                    }
                    });
                this.continuouslyRemoveOld();
                }, 500);
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("AlertService", service.mock.AlertServiceMock);
};