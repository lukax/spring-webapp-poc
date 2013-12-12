///<reference path="./../../reference.d.ts"/>

export module service.mock {
    export class AlertServiceMock implements d.service.contract.AlertService {
        private alerts: domain.util.Alert[];

        static $inject = ['$timeout'];
        constructor(public $timeout: ng.ITimeoutService) {
            this.alerts = [];
            this.removeOld();
        }

        add(alert: domain.util.Alert) {
            if (this.alerts.length >= 3) {
                this.alerts.splice(0, 1);
            }
            if (!alert.date) alert.date = new Date();
            if (!alert.type) alert.type = "success";
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

        list() {
            return this.alerts;
        }

        private removeOld() {
            this.$timeout(() => {
                this.alerts.forEach((currAlert, index) => {
                    var diffInSecs = Math.abs((new Date().getTime() - currAlert.date.getTime()) / 1000);
                    if (diffInSecs > 10) {
                        this.alerts.splice(index, 1);
                    }
                });
                this.removeOld();
            }, 1000);
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("AlertService", service.mock.AlertServiceMock);
};