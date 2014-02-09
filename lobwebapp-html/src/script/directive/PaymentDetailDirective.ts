///<reference path="../reference.d.ts"/>

export module directive {
    export class PaymentDetailDirective implements ng.IDirective {

        restrict = 'E';
        replace = true;
        scope = {
            ref: '='
        };
        templateUrl = "template/directive/PaymentDetailTemplate.html";
        link = (scope: any, element: any, attrs: ng.IAttributes) => {
            scope.$watch("ref.status", (newValue, oldValue) => {
                var labelClass;
                switch (newValue) {
                    case "OK":
                        labelClass = "label-default";
                        break;
                    case "PENDING":
                        labelClass = "label-info";
                        break;
                    case "CANCELLED":
                        labelClass = "label-warning";
                        break;
                }
                scope.labelClass = labelClass;
            });

        }
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.directive("paymentDetail", [() => new directive.PaymentDetailDirective()]);
};