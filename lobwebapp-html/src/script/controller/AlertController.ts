/**
 * Created by lucas on 10/26/13.
 */
///<reference path="../reference.d.ts"/>

export module controller{
    export interface IAlertController extends d.controller.base.IController{
        alerts: domain.util.Alert[];
    }
    
    export class AlertController implements IAlertController {
        alerts: domain.util.Alert[];
        
        static $inject = ["$scope", "AlertService"];
        constructor(public $scope: d.controller.base.IAppScope, 
                    public AlertService: d.service.contract.AlertService) {
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
}