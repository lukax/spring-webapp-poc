///<reference path="./../../reference.d.ts"/>

export module directive.util {
    export class AlertsDirective implements ng.IDirective {

        public restrict = 'E';
        public replace = true;
        public scope = true;
        public template = '<alert ng-repeat="alert in alerts" type="alert.type" close="alerts.splice($index, 1)">' +
                            '<strong>{{alert.title}}</strong> {{alert.content}} <div class="pull-right">{{alert.time | date:\'HH:mm:ss\' }}</div>' +
                            '</alert>'
        public controller = AlertDirectiveController;
        
    }

    export class AlertDirectiveController {
        static $inject = ['$scope', 'AlertService'];
        constructor($scope, AlertService: any) {
            $scope.alerts = AlertService.list();
        }
    }
}