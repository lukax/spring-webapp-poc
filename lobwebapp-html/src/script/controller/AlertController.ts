/**
 * Created by lucas on 10/26/13.
 */
///<reference path="./../reference.d.ts"/>

export module controller{
    export class AlertController {
        static $inject = ['$scope', 'AlertService'];
        constructor($scope, AlertService: any) {
            $scope.alerts = AlertService.list();
        }
    }
}