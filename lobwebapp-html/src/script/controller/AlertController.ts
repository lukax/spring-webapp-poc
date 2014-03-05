/**
 * Created by lucas on 10/26/13.
 */
///<reference path="../reference.d.ts"/>

export module controller{
    export class AlertController {
        static $inject = ["$scope", "AlertService"];
        constructor(public $scope, public AlertService: d.service.contract.AlertService) {
            
            //Simplify this controller
            $scope.vm = this;

            $scope.$on("ALERTS_CHANGED", (event, data: domain.util.Alert[])=> {
            	$scope.alerts = data;
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