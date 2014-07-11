///<reference path="../../reference.ts"/>

module service.impl {
  export class AlertServiceImpl implements contract.AlertService {
    private alerts:domain.util.Alert[] = [];
    private lifeSecs:number = 10;

    static $inject = ["$rootScope", "$interval"];
    constructor(public $rootScope:ng.IRootScopeService, public $interval:any) {
      this.removeExpiredAlertsOnInterval();
    }

    add(alert:domain.util.Alert) {
      if (alert == null) {
        console.log("[WARN]: Null alert");
        return;
      }

      if (!alert.date) alert.date = new Date();
      if (!alert.type) alert.type = util.AlertType.OK;
      var alerts = this.list();
      alerts.push(alert);
      this.setAlerts(alerts);
      return alert;
    }

    addMessageResponse(messageResponse:domain.util.MessageResponse, title:string) {
      if (messageResponse == null) {
        console.log("[WARN]: Null message response");
        return;
      }

      var alert:domain.util.Alert = { content: messageResponse.message, title: title, type: util.AlertType.DANGER, date: new Date() }
      if ((<domain.util.ValidationMessageResponse>messageResponse).validations)
        (<domain.util.ValidationMessageResponse>messageResponse).validations.forEach((x) => {
          alert.content += ", " + x.message.toLowerCase();
        });
      var alerts = this.list();
      alerts.push(alert);
      this.setAlerts(alerts);
      return alert;
    }

    remove(alert:domain.util.Alert) {
      var alerts = this.list();
      alerts.some((x, index) => {
        if (alert.content == x.content && alert.title == x.title) {
          alerts.splice(index, 1);
          return true;
        }
        return false;
      });
      this.setAlerts(alerts);
    }

    removeAll() {
      this.setAlerts([]);
    }

    list() {
      return <domain.util.Alert[]> angular.copy(this.alerts);
    }

    private setAlerts(alerts:domain.util.Alert[]) {
      if (!angular.equals(this.alerts, alerts)) {
        this.alerts = alerts;
        this.$rootScope.$broadcast("ALERTS_CHANGED", this.list());
      }
    }

    private removeExpiredAlertsOnInterval() {
      this.$interval(() => {
        var alerts = this.list();
        if (alerts.length >= 3) {
          //Remove first alert to keep list from getting big
          alerts.splice(0, 1);
        }
        alerts.forEach((x, index) => {
          var differenceInSecs = Math.abs((new Date().getTime() - x.date.getTime()) / 1000);
          if (differenceInSecs > this.lifeSecs) {
            if (x.type != util.AlertType.DANGER)
              alerts.splice(index, 1);
          }
        });
        this.setAlerts(alerts);
      }, 1000);
    }

  }
}
