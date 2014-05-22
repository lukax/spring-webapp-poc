///<reference path="../../reference.d.ts"/>

import _ = require("underscore");
import enums = require("./../../util/EnumUtil");

export module service.mock {
    export class AlertServiceMock implements d.service.contract.AlertService {
        private alerts: domain.util.Alert[] = [];
        private lifeSecs: number = 10;
        
        static $inject = ["$rootScope", "$interval"];
        constructor(public $rootScope: ng.IRootScopeService, public $interval: any) {
            this.removeExpiredAlertsOnInterval();
        }

        add(alert: domain.util.Alert) {
            if (!alert.date) alert.date = new Date();
            if (!alert.type) alert.type = enums.AlertType.OK;
            var alerts = this.list();
            alerts.push(alert);
            this.setAlerts(alerts);
            return alert;
        }

        addMessageResponse(messageResponse: domain.util.MessageResponse, title: string) {
            var alert: domain.util.Alert = { content: messageResponse.message, title: title, type: enums.AlertType.DANGER, date: new Date() }
            if((<domain.util.ValidationMessageResponse>messageResponse).validations)
            (<domain.util.ValidationMessageResponse>messageResponse).validations.forEach((x) => {
                alert.content += ", " + x.message.toLowerCase();
                });
            var alerts = this.list();
            alerts.push(alert);
            this.setAlerts(alerts);
            return alert;
        }

        remove(alert: domain.util.Alert) {
            var alerts = this.list();
            alerts.some((x, index) => {
                if(alert.content == x.content && alert.title == x.title) {
                    alerts.splice(index, 1);
                    return true;
                }
                return false;
                });
            this.setAlerts(alerts);
        }

        removeAll(){
            this.setAlerts([]);
        }

        list() {
            return <domain.util.Alert[]> angular.copy(this.alerts);
        }

        private setAlerts(alerts: domain.util.Alert[]){
            if(!_.isEqual(this.alerts, alerts)){
                this.alerts = alerts;
                this.$rootScope.$broadcast("ALERTS_CHANGED", this.list());
            }
        }

        private removeExpiredAlertsOnInterval() {
            this.$interval(() => {
                var alerts = this.list();
                if (alerts.length >= 3) {
                    //Remove first alert to keep list from getting big
                    alerts = _.rest(this.list());
                }
                alerts.forEach((x, index) => {
                    var differenceInSecs = Math.abs((new Date().getTime() - x.date.getTime()) / 1000);
                    if (differenceInSecs > this.lifeSecs) {
                        if(x.type != enums.AlertType.DANGER)
                            alerts.splice(index, 1);
                    }
                    });
                this.setAlerts(alerts);
                }, 1000);
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("AlertService", service.mock.AlertServiceMock);
};