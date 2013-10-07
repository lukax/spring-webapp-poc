///<reference path="./../../../reference.d.ts"/>

export module service.impl.util{
    export class DefaultAlertService implements d.service.contract.util.AlertService {
        private alerts: domain.util.Alert[];

        static $inject = ['$timeout'];
        constructor(public $timeout: ng.ITimeoutService) {
            this.alerts = [];
            this.removeOld();
        }

        add(message: string, title?: string, type?: d.service.contract.util.AlertType) {
            if (this.alerts.length >= 2) {
                this.alerts.splice(0, 1);
            }
            var alert: domain.util.Alert = {
                type: type ? String(type) : 'success',
                title: title,
                content: message,
                time: new Date()
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
                    var diffInSecs = ((new Date().getTime() - currAlert.time.getTime()) / 1000);
                    if (diffInSecs > 10) {
                        this.alerts.splice(index, 1);
                    }
                });
                this.removeOld();
            }, 2000);
        }

    }
}