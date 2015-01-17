///<reference path="../../reference.d.ts"/>

export interface IAlertController extends controller.base.IController{
    alerts: domain.util.Alert[];
}

export class AlertController implements IAlertController {
    alerts: domain.util.Alert[];

    static $inject = ["$scope", "AlertService"];
    constructor(public $scope: controller.base.IAppScope,
                public AlertService: service.contract.AlertService) {
        $scope.vm = this;

        $scope.$on("ALERTS_CHANGED", (event, data: domain.util.Alert[])=> {
            this.alerts = data;
            });
        //Remove alerts after location change
        $scope.$on("$locationChangeSuccess", () => {
            this.AlertService.removeAll();
            });
    }

    remove(alert: domain.util.Alert){
        this.AlertService.remove(alert);
    }
}
