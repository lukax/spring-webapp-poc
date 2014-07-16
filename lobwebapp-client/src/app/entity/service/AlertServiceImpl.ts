///<reference path="../../reference.ts"/>

module entity {
  export class AlertServiceImpl implements AlertService {
    private alerts:Alert[] = [];
    private lifeSecs:number = 10;

    static $inject = ["$rootScope", "$interval"];
    constructor(public $rootScope:ng.IRootScopeService, public $interval:any) {
      this.removeExpiredAlertsOnInterval();
    }

    add(alert:Alert) {
      if (alert == null) {
        console.log("[WARN]: Null alert");
        return;
      }

      if (!alert.date) alert.date = new Date();
      if (!alert.type) alert.type = AlertType.OK;
      var alerts = this.list();
      alerts.push(alert);
      this.setAlerts(alerts);
      return alert;
    }

    addMessageResponse(messageResponse:MessageResponse, title:string) {
      if (messageResponse == null) {
        console.log("[WARN]: Null message response");
        return;
      }

      var alert:Alert = { content: messageResponse.message, title: title, type: AlertType.DANGER, date: new Date() }
      if ((<ValidationMessageResponse>messageResponse).validations)
        (<ValidationMessageResponse>messageResponse).validations.forEach((x) => {
          alert.content += ", " + x.message.toLowerCase();
        });
      var alerts = this.list();
      alerts.push(alert);
      this.setAlerts(alerts);
      return alert;
    }

    remove(alert:Alert) {
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
      return <Alert[]> angular.copy(this.alerts);
    }

    private setAlerts(alerts:Alert[]) {
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
            if (x.type != AlertType.DANGER)
              alerts.splice(index, 1);
          }
        });
        this.setAlerts(alerts);
      }, 1000);
    }

  }
}

angular.module("lwa.entity").service("AlertService", entity.AlertServiceImpl);
