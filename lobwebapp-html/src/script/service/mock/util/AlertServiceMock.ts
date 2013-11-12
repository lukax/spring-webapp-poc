///<reference path="./../../../reference.d.ts"/>

export module service.mock.util{
    export class AlertServiceMock implements d.service.contract.util.AlertService {
        private alerts: domain.util.Alert[];

        static $inject = ['$timeout'];
        constructor(public $timeout: ng.ITimeoutService) {
            this.alerts = [];
            this.removeOld();
        }

        add(message: string, title?: string, type?: string, time?: Date) {
            if (this.alerts.length >= 3) {
                this.alerts.splice(0, 1);
            }
            var alert: domain.util.Alert = {
                type: type ? String(type) : 'success',
                title: title,
                content: message,
                time: time || new Date()
            };
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

        removeAll() {
            this.alerts = [];
        }

        list() {
            return this.alerts;
        }

        private removeOld() {
            this.$timeout(() => {
                this.alerts.forEach((currAlert, index) => {
                    var diffInSecs = Math.abs((new Date().getTime() - currAlert.time.getTime()) / 1000);
                    if (diffInSecs > 10) {
                        this.alerts.splice(index, 1);
                    }
                });
                this.removeOld();
            }, 1000);
        }

    }
}